/* eslint-disable @typescript-eslint/no-explicit-any */
import {db} from "@/db/index"
import * as tables from "@/db/schema/tables"
// Extract model types from the database schema
export type ModelTypes = {
  [K in keyof typeof db.query]: Parameters<(typeof db.query)[K]["findFirst"]>[0];
};


// Correctly extract insert types from your tables
export type CreateInputTypes = {
  [K in keyof typeof tables]: typeof tables[K] extends { $inferInsert: infer T } ? T : never;
};



// Extract query parameter types for each operation
export type QueryParams = {
  [K in keyof typeof db.query]: {
    findMany?: Parameters<(typeof db.query)[K]["findMany"]>[0];
    findFirst?: Parameters<(typeof db.query)[K]["findFirst"]>[0];
    // findUnique: Parameters<(typeof db.query)[K]["findUnique"]>[0];
  };
};

// Helper utility type to check if a specific property exists and is a function

// Helper utility type to safely extract method return types
type SafeReturnType<T, M extends string> = 
  M extends keyof T 
    ? T[M] extends (...args: any[]) => any 
      ? ReturnType<T[M] & ((...args: any[]) => any)> 
      : never 
    : never;

// Define return types for each server operation
export type ServerGetter = {
  [K in keyof typeof db.query]: {
    findMany?: ReturnType<(typeof db.query)[K]["findMany"]>;
    findFirst?: ReturnType<(typeof db.query)[K]["findFirst"]>;
    // findUnique?: SafeReturnType<(typeof db.query)[K], "findUnique">;
    create: ReturnType<(typeof db.query)[K]["create"]>;
    update: ReturnType<(typeof db.query)[K]["update"]>;
    delete: ReturnType<(typeof db.query)[K]["delete"]>;
  };
};

export type ServerGetterKeys = keyof ServerGetter;
export type SchemaTables = { [K in ServerGetterKeys]: ServerGetter[K] };

// Helper type to extract the resolved value of a Promise
type Promisify<T> = T extends Promise<infer U> ? U : T;

// Helper type for pagination results
export type PaginatedResult<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

// Handler types for server operations with proper typing
type FindManyHandler<T> = (params?: QueryParams[keyof QueryParams]["findMany"]) => Promise<T>;
type FindFirstHandler<T> = (params?: QueryParams[keyof QueryParams]["findFirst"]) => Promise<T>;
// type FindUniqueHandler<T> = (params: QueryParams[keyof QueryParams]["findUnique"]) => Promise<T>;
type CreateHandler<T> = (data: CreateInputTypes[keyof CreateInputTypes]) => Promise<T>;
type UpdateHandler<T> = (id: string | number, data: CreateInputTypes[keyof CreateInputTypes]) => Promise<T>;
type DeleteHandler<T> = (filter: Partial<T>) => Promise<T>;

// Server implementation with properly typed handlers
export type Server = {
  [K in keyof ServerGetter]: {
    findMany?: FindManyHandler<Promisify<NonNullable<ServerGetter[K]["findMany"]>>>;
    findFirst?: FindFirstHandler<Promisify<NonNullable<ServerGetter[K]["findFirst"]>>>;
    // findUnique?: FindUniqueHandler<Promisify<NonNullable<ServerGetter[K]["findUnique"]>>>;
    create?: CreateHandler<Promisify<NonNullable<ServerGetter[K]["findMany"]>>>;
    update?: UpdateHandler<Promisify<NonNullable<ServerGetter[K]["findMany"]>>>;
    delete?: DeleteHandler<Promisify<NonNullable<ServerGetter[K]["findMany"]>>>;
  };
};

// Type for route generation functions
export type RouteGenerators = {
  fetchMany: (params?: any) => string;
  fetchById: (id: string | number) => string;
  create: () => string;
  update: (id: string | number) => string;
  updateMany: <K extends keyof CreateInputTypes>(filter: Partial<CreateInputTypes[K]>) => string;
  delete: (id: string | number) => string;
  deleteMany: <K extends keyof CreateInputTypes>(filter: Partial<CreateInputTypes[K]>) => string;
};

// Config type for API service initialization
export type ApiServiceConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
};

// Enhanced API service with route generation, error handling, and pagination
export type ApiService = {
  [K in keyof Server]: {
    // Route configuration
    baseRoute: string;
    routes: RouteGenerators;
    
    // Standard CRUD operations
    findMany: (params?: Partial<CreateInputTypes[K]>) => Server[K]["findMany"];
    findFirst: (params: Partial<CreateInputTypes[K]>) => Promise<Promisify<NonNullable<Server[K]["findFirst"]>>>;
    // findUnique: (params: Partial<CreateInputTypes[K]>) => Promise<Promisify<NonNullable<Server[K]["findUnique"]>>>;
    create: (data: Partial<CreateInputTypes[K]>) => Promise<Promisify<ReturnType<NonNullable<Server[K]["findMany"]>>>>;
    update: (id: string | number, data: Partial<Partial<CreateInputTypes[K]>>) => Promise<Promisify<ReturnType<NonNullable<Server[K]["findMany"]>>>>;
    delete: (id: string | number) => Promise<Promisify<boolean>>;
    
    // Advanced operations
    findManyPaginated: (page?: number, pageSize?: number, params?: Omit<QueryParams[K]["findMany"], "take" | "skip">) => 
      Promise<PaginatedResult<Promisify<NonNullable<ServerGetter[K]["findMany"]>> extends Promise<Array<infer U>> ? U : never>>;
    count: (params?: Omit<Partial<CreateInputTypes[K]>, "take" | "skip" | "select">) => Promise<number>;
    
    // Batch operations
    createMany: (data: Partial<CreateInputTypes[K]>[]) => Promise<Array<Promisify<ReturnType<NonNullable<Server[K]["create"]>>>>>;
    updateMany: (filter: Partial<CreateInputTypes[K]>, data: Partial<Partial<CreateInputTypes[K]>>) => 
      Promise<{ count: number }>;
    deleteMany: (filter: Partial<CreateInputTypes[K]>) => Promise<{ count: number }>;
  };
};

// Type for an API service factory
export type ApiServiceFactory = {
  create: (config: ApiServiceConfig) => ApiService;
  fromServer: (server: Server, config?: ApiServiceConfig) => ApiService;
};

// Type for API response handling
export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

// Type for API error handling
export type ApiError = {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  stack?: string;
};