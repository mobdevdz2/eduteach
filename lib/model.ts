// src/lib/Model.ts
import { PgTable, PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { eq, inArray, and, SQL } from "drizzle-orm";
import { db as  DB } from "@/db";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/db/schema";

// Type definitions for model data
export type ModelData<T extends PgTableWithColumns<TableConfig>> = z.infer<ReturnType<typeof createSelectSchema<T>>>;
export type InsertData<T extends PgTableWithColumns<TableConfig>> = z.infer<ReturnType<typeof createInsertSchema<T>>>;
export type UpdateData<T extends PgTableWithColumns<TableConfig>> = Partial<InsertData<T>>;

// Type-safe conditions for queries
type ConditionBuilder<T extends PgTable> = SQL<unknown> | ((table: T) => SQL<unknown>);

// Utility to infer column types from the table
export type TableColumns<T extends PgTable> = T["_"]["columns"];

// Type for relations configuration
export type RelationsConfig<T extends PgTable> = {
  [K in keyof any]?: RelationsConfig<any> | boolean;
};

// Infer relational query result type
export type WithRelations<T extends PgTable, R extends RelationsConfig<T>> = ModelData<T> & {
  [K in keyof R]: R[K] extends RelationsConfig<infer U>
    ? WithRelations<U, R[K]>[]
    : R[K] extends true
    ? ModelData<any>
    : never;
};

export class Model<T extends PgTableWithColumns<any>> {
  private readonly table: T;
  private readonly db: typeof DB;
  private readonly insertSchema: z.ZodObject<T["insert"]["columns"]>;
  private readonly selectSchema: z.ZodObject<T["select"]["columns"]>;

  constructor(table: T) {
    this.table = table;
    this.db = DB;

    // Generate Zod schemas from Drizzle table
    this.insertSchema = createInsertSchema(this.table);
    this.selectSchema = createSelectSchema(this.table);
  }

  // CREATE Operations
  public async create(data: InsertData<T>): Promise<ModelData<T>>;
  public async create(data: InsertData<T>[]): Promise<ModelData<T>[]>;
  public async create(data: InsertData<T> | InsertData<T>[]): Promise<ModelData<T> | ModelData<T>[]> {
    if (Array.isArray(data)) {
      return this.createMany(data);
    }
    return this.createOne(data);
  }

  private async createOne(data: InsertData<T>): Promise<ModelData<T>> {
    const validatedData = this.insertSchema.parse(data);

    const [result] = await this.db
      .insert(this.table)
      .values(validatedData)
      .returning();

    return this.selectSchema.parse(result);
  }

  private async createMany(data: InsertData<T>[]): Promise<ModelData<T>[]> {
    if (data.length === 0) return [];

    const validatedData = z.array(this.insertSchema).parse(data);

    const results = await this.db
      .insert(this.table)
      .values(validatedData)
      .returning();

    return results.map((result) => this.selectSchema.parse(result));
  }

  // UPDATE Operations
  public async update(id: string, data: UpdateData<T>): Promise<ModelData<T>>;
  public async update(ids: string[], data: UpdateData<T>): Promise<ModelData<T>[]>;
  public async update(
    idOrIds: string | string[],
    data: UpdateData<T>
  ): Promise<ModelData<T> | ModelData<T>[]> {
    if (Array.isArray(idOrIds)) {
      return this.updateMany(idOrIds, data);
    }
    return this.updateOne(idOrIds, data);
  }

  private async updateOne(id: string, data: UpdateData<T>): Promise<ModelData<T>> {
    const updateSchema = this.insertSchema.partial();
    const validatedData = updateSchema.parse(data);

    const [result] = await this.db
      .update(this.table)
      .set(validatedData)
      .where(eq(this.table.id, id))
      .returning();

    return this.selectSchema.parse(result);
  }

  private async updateMany(ids: string[], data: UpdateData<T>): Promise<ModelData<T>[]> {
    if (ids.length === 0) return [];

    const updateSchema = this.insertSchema.partial();
    const validatedData = updateSchema.parse(data);

    const results = await this.db
      .update(this.table)
      .set(validatedData)
      .where(inArray(this.table.id, ids))
      .returning();

    return results.map((result) => this.selectSchema.parse(result));
  }

  // READ Operations
  public async find(id: string): Promise<ModelData<T> | null> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);

    return result[0] ? this.selectSchema.parse(result[0]) : null;
  }

  public async findAll(conditions?: ConditionBuilder<T>): Promise<ModelData<T>[]> {
    const query = this.db.select().from(this.table);

    if (conditions) {
      const condition = typeof conditions === "function" ? conditions(this.table) : conditions;
      query.where(condition);
    }

    const results = await query;
    return results.map((data) => this.selectSchema.parse(data));
  }

  public async findManyByIds(ids: string[]): Promise<ModelData<T>[]> {
    if (ids.length === 0) return [];

    const results = await this.db
      .select()
      .from(this.table)
      .where(inArray(this.table.id, ids));

    return results.map((data) => this.selectSchema.parse(data));
  }

  public async findManyByConditions(conditions: ConditionBuilder<T>): Promise<ModelData<T>[]> {
    const query = this.db.select().from(this.table);

    const condition = typeof conditions === "function" ? conditions(this.table) : conditions;
    query.where(condition);

    const results = await query;
    return results.map((data) => this.selectSchema.parse(data));
  }

  // READ Operations with Relations
  public async findWithRelations<R extends RelationsConfig<T>>(
    id: string,
    relations: R
  ): Promise<WithRelations<T, R> | null> {
    const query = (this.db.query as any)[this.table._.name].findFirst({
      where: eq(this.table.id, id),
      with: relations,
    });

    const result = await query;
    return result ? this.selectSchema.parse(result) : null;
  }

  public async findAllWithRelations<R extends RelationsConfig<T>>(
    relations: R,
    conditions?: ConditionBuilder<T>
  ): Promise<WithRelations<T, R>[]> {
    const query = (this.db.query as any)[this.table._.name].findMany({
      where: conditions
        ? typeof conditions === "function"
          ? conditions(this.table)
          : conditions
        : undefined,
      with: relations,
    });

    const results = await query;
    return results.map((data: WithRelations<T, R>) => this.selectSchema.parse(data));
  }

  // DELETE Operations
  public async delete(id: string): Promise<ModelData<T>>;
  public async delete(ids: string[]): Promise<ModelData<T>[]>;
  public async delete(idOrIds: string | string[]): Promise<ModelData<T> | ModelData<T>[]> {
    if (Array.isArray(idOrIds)) {
      return this.deleteMany(idOrIds);
    }
    return this.deleteOne(idOrIds);
  }

  private async deleteOne(id: string): Promise<ModelData<T>> {
    const [result] = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();

    return this.selectSchema.parse(result);
  }

  private async deleteMany(ids: string[]): Promise<ModelData<T>[]> {
    if (ids.length === 0) return [];

    const results = await this.db
      .delete(this.table)
      .where(inArray(this.table.id, ids))
      .returning();

    return results.map((result) => this.selectSchema.parse(result));
  }

  // Validation Helpers
  public validateCreate(data: unknown): InsertData<T> {
    return this.insertSchema.parse(data);
  }

  public validateCreateMany(data: unknown): InsertData<T>[] {
    return z.array(this.insertSchema).parse(data);
  }

  public validateUpdate(data: unknown): UpdateData<T> {
    return this.insertSchema.partial().parse(data);
  }
}


const userModel = new Model<typeof users>(users);


userModel.find("id")

