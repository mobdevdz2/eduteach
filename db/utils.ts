/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SQL, eq, and, or, like, ilike, gt, gte, lt, lte, inArray, notInArray, isNull, isNotNull, DBQueryConfig, } from 'drizzle-orm';
import { PgTable, TableConfig,  } from 'drizzle-orm/pg-core';

import { db } from '@/db';

/**
 * Generates a configuration object for Drizzle ORM queries
 * Converts simple object filters into proper Drizzle query builder format
 * 
 * @param tableName - The name of the table in db.query
 * @param config - The configuration object with filters
 * @returns Properly formatted Drizzle query config
 */
const generateConfig = <K extends keyof typeof db.query>(
  tableName: K,
  config?: {
    where?: Record<string, any>;
    limit?: number;
    offset?: number;
    orderBy?: { field: string; direction: 'asc' | 'desc' };
    with?: Record<string, boolean | object>;
  }
): DBQueryConfig<'many', true> => {
  if (!config) return {};

  const result: any = {};

  // Handle limit and offset
  if (config.limit !== undefined) {
    result.limit = config.limit;
  }

  if (config.offset !== undefined) {
    result.offset = config.offset;
  }

  // Handle relations (with)
  if (config.with) {
    result.with = config.with;
  }

  // Handle where conditions
  if (config.where && Object.keys(config.where).length > 0) {
    result.where = (fields: any, operators: { eq: Function; and: Function }) => {
      const conditions: SQL[] = [];
      
      Object.entries(config.where || {}).forEach(([key, value]) => {
        if (fields[key] !== undefined) {
          conditions.push(operators.eq(fields[key], value));
        }
      });
      
      return conditions.length > 1 
        ? operators.and(...conditions) 
        : conditions[0];
    };
  }

  // Handle orderBy
  if (config.orderBy) {
    const { field, direction } = config.orderBy;
    result.orderBy = (fields: any) => 
      direction === 'asc' ? fields[field].asc() : fields[field].desc();
  }

  return result;
};

/**
 * Usage example:
 * 
 * const usersConfig = generateConfig('users', {
 *   where: { isActive: true, role: 'admin' },
 *   limit: 10,
 *   orderBy: { field: 'createdAt', direction: 'desc' },
 *   with: { posts: true }
 * });
 * 
 * const users = await db.query.users.findMany(usersConfig);
 */

  
  export type ComparisonOperator = 
    | 'eq' 
    | 'neq'
    | 'gt' 
    | 'gte' 
    | 'lt' 
    | 'lte' 
    | 'like' 
    | 'ilike' 
    | 'in' 
    | 'notIn'
    | 'isNull' 
    | 'isNotNull';
  
  export type FilterCondition<T> = {
    field: keyof T;
    operator: ComparisonOperator;
    value?: any;
  };
  
  export type FilterParams<T> = {
    where?: FilterCondition<T>[];
    whereOr?: FilterCondition<T>[];
    limit?: number;
    offset?: number;
    orderBy?: {
      field: keyof T;
      direction: 'asc' | 'desc';
    };
  };
  
  /**
   * Converts a filter condition to an SQL condition
   * @param table The PostgreSQL table
   * @param condition The filter condition
   * @returns SQL condition
   */
  function conditionToSql<T extends PgTable<TableConfig>>(
    table: T, 
    condition: FilterCondition<T["$inferSelect"]>
  ): SQL {
    const { field, operator, value } = condition;
    const Table: Record<string, any> = table
    const column = Table[field as string];
    
    if (!column) {
      throw new Error(`Field '${String(field)}' does not exist on the table`);
    }
  
    switch (operator) {
      case 'eq':
        return eq(column, value);
      case 'neq':
        return eq(column, value);
      case 'gt':
        return gt(column, value);
      case 'gte':
        return gte(column, value);
      case 'lt':
        return lt(column, value);
      case 'lte':
        return lte(column, value);
      case 'like':
        return like(column, `%${value}%`);
      case 'ilike':
        return ilike(column, `%${value}%`);
      case 'in':
        return inArray(column, Array.isArray(value) ? value : [value]);
      case 'notIn':
        return notInArray(column, Array.isArray(value) ? value : [value]);
      case 'isNull':
        return isNull(column);
      case 'isNotNull':
        return isNotNull(column);
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
  
  /**
   * Converts query parameters to SQL conditions for use in database queries
   * @param table The PostgreSQL table
   * @param params The filter parameters
   * @returns Object with SQL conditions and query options
   */
  function paramsToSql<T extends PgTable<TableConfig>>(
    table: T,
    params: FilterParams<T["$inferSelect"]>
  ) {
    const result: {
      whereCondition?: SQL;
      limit?: number;
      offset?: number;
      orderBy?: {
        column: any;
        direction: 'asc' | 'desc';
      }
    } = {};
  
    // Process WHERE conditions (AND)
    if (params.where && params.where.length > 0) {
      const conditions = params.where.map(condition => conditionToSql(table, condition));
      result.whereCondition = conditions.length === 1 ? conditions[0] : and(...conditions);
    }
  
    // Process OR conditions
    if (params.whereOr && params.whereOr.length > 0) {
      const orConditions = params.whereOr.map(condition => conditionToSql(table, condition));
      const orClause = orConditions.length === 1 ? orConditions[0] : or(...orConditions);
      
      // Combine with existing AND conditions if present
      if (result.whereCondition) {
        result.whereCondition = and(result.whereCondition, orClause);
      } else {
        result.whereCondition = orClause;
      }
    }
  
    // Process limit and offset
    if (params.limit !== undefined) {
      result.limit = params.limit;
    }
  
    if (params.offset !== undefined) {
      result.offset = params.offset;
    }
  
    // Process orderBy
    if (params.orderBy) {
      const { field, direction } = params.orderBy;
      const Table: Record<string, any> = table
      const column = Table[field as string];
      
      if (column) {
        result.orderBy = {
          column,
          direction
        };
      }
    }
  
    return result;
  }
  
  /**
   * Example usage:
   * 
   * const query = db.select()
   *   .from(users)
   *   .where(sqlParams.whereCondition)
   *   .limit(sqlParams.limit)
   *   .offset(sqlParams.offset);
   * 
   * if (sqlParams.orderBy) {
   *   query.orderBy(
   *     sqlParams.orderBy.direction === 'asc' 
   *       ? asc(sqlParams.orderBy.column) 
   *       : desc(sqlParams.orderBy.column)
   *   );
   * }
   */
  
  export { paramsToSql, generateConfig };