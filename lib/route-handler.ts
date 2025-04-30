// src/lib/RouteHandler.ts
import { NextRequest, NextResponse } from "next/server";
import { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { z } from "zod";
import { Model, ModelData, InsertData, UpdateData, RelationsConfig } from "./model";

// Request validation schemas
const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

const relationsQuerySchema = z.object({
  with: z.string().optional(), // e.g., "class" or "class,teacher"
});

// Error response type
interface ErrorResponse {
  error: string;
  details?: any;
}

// Success response type
interface SuccessResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export class RouteHandler<T extends PgTableWithColumns<any>> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // GET /api/resources
  public async getAll(req: NextRequest): Promise<NextResponse> {
    try {
      const url = new URL(req.url);
      const query = Object.fromEntries(url.searchParams);
      const { page, limit } = paginationQuerySchema.parse(query);
      const { with: relationsStr } = relationsQuerySchema.parse(query);

      const offset = (page - 1) * limit;
      const relations = this.parseRelations(relationsStr);

      // Fetch data with optional relations
      const data = relations
        ? await this.model.findAllWithRelations(relations)
        : await this.model.findAll();

      // Mock total count (replace with actual count query if needed)
      const total = data.length; // TODO: Implement count query

      return NextResponse.json(
        {
          data,
          meta: { page, limit, total },
        } as SuccessResponse<ModelData<T>[]>,
        { status: 200 }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  // GET /api/resources/:id
  public async getById(req: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const { id } = idParamSchema.parse(params);
      const url = new URL(req.url);
      const query = Object.fromEntries(url.searchParams);
      const { with: relationsStr } = relationsQuerySchema.parse(query);

      const relations = this.parseRelations(relationsStr);

      // Fetch data with optional relations
      const data = relations
        ? await this.model.findWithRelations(id, relations)
        : await this.model.find(id);

      if (!data) {
        return NextResponse.json(
          { error: "Resource not found" } as ErrorResponse,
          { status: 404 }
        );
      }

      return NextResponse.json(
        { data } as SuccessResponse<ModelData<T>>,
        { status: 200 }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST /api/resources
  public async create(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const data = this.model.validateCreate(body);
      const result = await this.model.create(data);

      return NextResponse.json(
        { data: result } as SuccessResponse<ModelData<T>>,
        { status: 201 }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT /api/resources/:id
  public async update(req: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const { id } = idParamSchema.parse(params);
      const body = await req.json();
      const data = this.model.validateUpdate(body);
      const result = await this.model.update(id, data);

      return NextResponse.json(
        { data: result } as SuccessResponse<ModelData<T>>,
        { status: 200 }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE /api/resources/:id
  public async delete(req: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const { id } = idParamSchema.parse(params);
      const result = await this.model.delete(id);

      return NextResponse.json(
        { data: result } as SuccessResponse<ModelData<T>>,
        { status: 200 }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Parse relations from query string (e.g., "class,teacher" -> { class: true, teacher: true })
  private parseRelations(relationsStr?: string): RelationsConfig<T> | undefined {
    if (!relationsStr) return undefined;

    const relations: RelationsConfig<T> = {};
    relationsStr.split(",").forEach((rel) => {
      relations[rel.trim() as keyof RelationsConfig<T>] = true;
    });

    return relations;
  }

  // Handle errors and return appropriate response
  private handleError(error: unknown): NextResponse {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: fromZodError(error).details,
        } as ErrorResponse,
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" } as ErrorResponse,
      { status: 500 }
    );
  }
}
function fromZodError(error: z.ZodError<any>) {
    return {
        details: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
        })),
    };
}
