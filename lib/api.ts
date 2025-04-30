// src/lib/Api.ts
import { PgTableWithColumns,TableConfig } from "drizzle-orm/pg-core";
import { z } from "zod";
import { Model, ModelData, InsertData, UpdateData } from "./model";
import { createSelectSchema } from "drizzle-zod";

// API response types
interface SuccessResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

interface ErrorResponse {
  error: string;
  details?: any;
}

// Query parameters for list requests
interface ListQuery {
  page?: number;
  limit?: number;
  with?: string; // e.g., "class" or "class,teacher"
}

// API configuration
interface ApiConfig {
  baseUrl?: string; // e.g., "/api" or "https://api.example.com"
  headers?: Record<string, string>; // Custom headers (e.g., Authorization)
}

export class Api {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: ApiConfig = {}) {
    this.baseUrl = config.baseUrl || "/api";
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  // GET /resources (list)
  public async getList<T extends PgTableWithColumns<TableConfig>>(
    model: Model<T>,
    resource: string,
    query?: ListQuery
  ): Promise<SuccessResponse<ModelData<T>[]>> {
    const params = new URLSearchParams();
    if (query) {
      if (query.page) params.set("page", query.page.toString());
      if (query.limit) params.set("limit", query.limit.toString());
      if (query.with) params.set("with", query.with);
    }

    const url = `${this.baseUrl}/${resource}${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await this.fetch(url, { method: "GET" });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`Failed to fetch list: ${error.error || response.statusText}`, {
        cause: error,
      });
    }

    const data = await response.json();
    const schema = z.object({
      data: z.array(createSelectSchema(model.table)),
      meta: z
        .object({
          page: z.number().optional(),
          limit: z.number().optional(),
          total: z.number().optional(),
        })
        .optional(),
    });

    return schema.parse(data);
  }

  // GET /resources/:id (single)
  public async getById<T extends PgTableWithColumns<TableConfig>>(
    model: Model<T>,
    resource: string,
    id: string,
    relations?: string // e.g., "class" or "class,teacher"
  ): Promise<SuccessResponse<ModelData<T>>> {
    const params = new URLSearchParams();
    if (relations) {
      params.set("with", relations);
    }

    const url = `${this.baseUrl}/${resource}/${id}${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await this.fetch(url, { method: "GET" });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`Failed to fetch resource: ${error.error || response.statusText}`, {
        cause: error,
      });
    }

    const data = await response.json();
    const schema = z.object({
      data: createSelectSchema(model.table),
    });

    return schema.parse(data);
  }

  // POST /resources (create)
  public async create<T extends PgTableWithColumns<TableConfig>>(
    model: Model<T>,
    resource: string,
    data: InsertData<T>
  ): Promise<SuccessResponse<ModelData<T>>> {
    const validatedData = model.validateCreate(data);
    const response = await this.fetch(`${this.baseUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`Failed to create resource: ${error.error || response.statusText}`, {
        cause: error,
      });
    }

    const result = await response.json();
    const schema = z.object({
      data: createSelectSchema(model.table),
    });

    return schema.parse(result);
  }

  // PUT /resources/:id (update)
  public async update<T extends PgTableWithColumns<TableConfig>>(
    model: Model<T>,
    resource: string,
    id: string,
    data: UpdateData<T>
  ): Promise<SuccessResponse<ModelData<T>>> {
    const validatedData = model.validateUpdate(data);
    const response = await this.fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`Failed to update resource: ${error.error || response.statusText}`, {
        cause: error,
      });
    }

    const result = await response.json();
    const schema = z.object({
      data: createSelectSchema(model.table),
    });

    return schema.parse(result);
  }

  // DELETE /resources/:id
  public async delete<T extends PgTableWithColumns<TableConfig>>(
    model: Model<T>,
    resource: string,
    id: string
  ): Promise<SuccessResponse<ModelData<T>>> {
    const response = await this.fetch(`${this.baseUrl}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`Failed to delete resource: ${error.error || response.statusText}`, {
        cause: error,
      });
    }

    const result = await response.json();
    const schema = z.object({
      data: createSelectSchema(model.table),
    });

    return schema.parse(result);
  }

  // Helper method to perform fetch with error handling
  private async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      return await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      });
    } catch (error) {
      throw new Error(`Network error: ${error instanceof Error ? error.message : "Unknown"}`, {
        cause: error,
      });
    }
  }
}