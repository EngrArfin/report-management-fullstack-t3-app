
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Zone
 * 
 */
export type Zone = $Result.DefaultSelection<Prisma.$ZonePayload>
/**
 * Model WeeklyReport
 * 
 */
export type WeeklyReport = $Result.DefaultSelection<Prisma.$WeeklyReportPayload>
/**
 * Model FindingHistory
 * 
 */
export type FindingHistory = $Result.DefaultSelection<Prisma.$FindingHistoryPayload>
/**
 * Model MonthlyTarget
 * 
 */
export type MonthlyTarget = $Result.DefaultSelection<Prisma.$MonthlyTargetPayload>
/**
 * Model EmailNotificationConfig
 * 
 */
export type EmailNotificationConfig = $Result.DefaultSelection<Prisma.$EmailNotificationConfigPayload>
/**
 * Model EmailNotificationLog
 * 
 */
export type EmailNotificationLog = $Result.DefaultSelection<Prisma.$EmailNotificationLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.zone`: Exposes CRUD operations for the **Zone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Zones
    * const zones = await prisma.zone.findMany()
    * ```
    */
  get zone(): Prisma.ZoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weeklyReport`: Exposes CRUD operations for the **WeeklyReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklyReports
    * const weeklyReports = await prisma.weeklyReport.findMany()
    * ```
    */
  get weeklyReport(): Prisma.WeeklyReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.findingHistory`: Exposes CRUD operations for the **FindingHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FindingHistories
    * const findingHistories = await prisma.findingHistory.findMany()
    * ```
    */
  get findingHistory(): Prisma.FindingHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyTarget`: Exposes CRUD operations for the **MonthlyTarget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyTargets
    * const monthlyTargets = await prisma.monthlyTarget.findMany()
    * ```
    */
  get monthlyTarget(): Prisma.MonthlyTargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailNotificationConfig`: Exposes CRUD operations for the **EmailNotificationConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailNotificationConfigs
    * const emailNotificationConfigs = await prisma.emailNotificationConfig.findMany()
    * ```
    */
  get emailNotificationConfig(): Prisma.EmailNotificationConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailNotificationLog`: Exposes CRUD operations for the **EmailNotificationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailNotificationLogs
    * const emailNotificationLogs = await prisma.emailNotificationLog.findMany()
    * ```
    */
  get emailNotificationLog(): Prisma.EmailNotificationLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Zone: 'Zone',
    WeeklyReport: 'WeeklyReport',
    FindingHistory: 'FindingHistory',
    MonthlyTarget: 'MonthlyTarget',
    EmailNotificationConfig: 'EmailNotificationConfig',
    EmailNotificationLog: 'EmailNotificationLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "zone" | "weeklyReport" | "findingHistory" | "monthlyTarget" | "emailNotificationConfig" | "emailNotificationLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Zone: {
        payload: Prisma.$ZonePayload<ExtArgs>
        fields: Prisma.ZoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ZoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ZoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          findFirst: {
            args: Prisma.ZoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ZoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          findMany: {
            args: Prisma.ZoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>[]
          }
          create: {
            args: Prisma.ZoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          createMany: {
            args: Prisma.ZoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ZoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>[]
          }
          delete: {
            args: Prisma.ZoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          update: {
            args: Prisma.ZoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          deleteMany: {
            args: Prisma.ZoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ZoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ZoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>[]
          }
          upsert: {
            args: Prisma.ZoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonePayload>
          }
          aggregate: {
            args: Prisma.ZoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateZone>
          }
          groupBy: {
            args: Prisma.ZoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<ZoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.ZoneCountArgs<ExtArgs>
            result: $Utils.Optional<ZoneCountAggregateOutputType> | number
          }
        }
      }
      WeeklyReport: {
        payload: Prisma.$WeeklyReportPayload<ExtArgs>
        fields: Prisma.WeeklyReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>
          }
          findFirst: {
            args: Prisma.WeeklyReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>
          }
          findMany: {
            args: Prisma.WeeklyReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>[]
          }
          create: {
            args: Prisma.WeeklyReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>
          }
          createMany: {
            args: Prisma.WeeklyReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>[]
          }
          delete: {
            args: Prisma.WeeklyReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>
          }
          update: {
            args: Prisma.WeeklyReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>
          }
          deleteMany: {
            args: Prisma.WeeklyReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeeklyReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>[]
          }
          upsert: {
            args: Prisma.WeeklyReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyReportPayload>
          }
          aggregate: {
            args: Prisma.WeeklyReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeeklyReport>
          }
          groupBy: {
            args: Prisma.WeeklyReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeeklyReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyReportCountArgs<ExtArgs>
            result: $Utils.Optional<WeeklyReportCountAggregateOutputType> | number
          }
        }
      }
      FindingHistory: {
        payload: Prisma.$FindingHistoryPayload<ExtArgs>
        fields: Prisma.FindingHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FindingHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FindingHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>
          }
          findFirst: {
            args: Prisma.FindingHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FindingHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>
          }
          findMany: {
            args: Prisma.FindingHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>[]
          }
          create: {
            args: Prisma.FindingHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>
          }
          createMany: {
            args: Prisma.FindingHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FindingHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>[]
          }
          delete: {
            args: Prisma.FindingHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>
          }
          update: {
            args: Prisma.FindingHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>
          }
          deleteMany: {
            args: Prisma.FindingHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FindingHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FindingHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>[]
          }
          upsert: {
            args: Prisma.FindingHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingHistoryPayload>
          }
          aggregate: {
            args: Prisma.FindingHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFindingHistory>
          }
          groupBy: {
            args: Prisma.FindingHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FindingHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FindingHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<FindingHistoryCountAggregateOutputType> | number
          }
        }
      }
      MonthlyTarget: {
        payload: Prisma.$MonthlyTargetPayload<ExtArgs>
        fields: Prisma.MonthlyTargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyTargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyTargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>
          }
          findFirst: {
            args: Prisma.MonthlyTargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyTargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>
          }
          findMany: {
            args: Prisma.MonthlyTargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>[]
          }
          create: {
            args: Prisma.MonthlyTargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>
          }
          createMany: {
            args: Prisma.MonthlyTargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyTargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>[]
          }
          delete: {
            args: Prisma.MonthlyTargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>
          }
          update: {
            args: Prisma.MonthlyTargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyTargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyTargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyTargetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyTargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTargetPayload>
          }
          aggregate: {
            args: Prisma.MonthlyTargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyTarget>
          }
          groupBy: {
            args: Prisma.MonthlyTargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyTargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyTargetCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyTargetCountAggregateOutputType> | number
          }
        }
      }
      EmailNotificationConfig: {
        payload: Prisma.$EmailNotificationConfigPayload<ExtArgs>
        fields: Prisma.EmailNotificationConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailNotificationConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailNotificationConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>
          }
          findFirst: {
            args: Prisma.EmailNotificationConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailNotificationConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>
          }
          findMany: {
            args: Prisma.EmailNotificationConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>[]
          }
          create: {
            args: Prisma.EmailNotificationConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>
          }
          createMany: {
            args: Prisma.EmailNotificationConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailNotificationConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>[]
          }
          delete: {
            args: Prisma.EmailNotificationConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>
          }
          update: {
            args: Prisma.EmailNotificationConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>
          }
          deleteMany: {
            args: Prisma.EmailNotificationConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailNotificationConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailNotificationConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>[]
          }
          upsert: {
            args: Prisma.EmailNotificationConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationConfigPayload>
          }
          aggregate: {
            args: Prisma.EmailNotificationConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailNotificationConfig>
          }
          groupBy: {
            args: Prisma.EmailNotificationConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailNotificationConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailNotificationConfigCountArgs<ExtArgs>
            result: $Utils.Optional<EmailNotificationConfigCountAggregateOutputType> | number
          }
        }
      }
      EmailNotificationLog: {
        payload: Prisma.$EmailNotificationLogPayload<ExtArgs>
        fields: Prisma.EmailNotificationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailNotificationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailNotificationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>
          }
          findFirst: {
            args: Prisma.EmailNotificationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailNotificationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>
          }
          findMany: {
            args: Prisma.EmailNotificationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>[]
          }
          create: {
            args: Prisma.EmailNotificationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>
          }
          createMany: {
            args: Prisma.EmailNotificationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailNotificationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>[]
          }
          delete: {
            args: Prisma.EmailNotificationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>
          }
          update: {
            args: Prisma.EmailNotificationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>
          }
          deleteMany: {
            args: Prisma.EmailNotificationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailNotificationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailNotificationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>[]
          }
          upsert: {
            args: Prisma.EmailNotificationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailNotificationLogPayload>
          }
          aggregate: {
            args: Prisma.EmailNotificationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailNotificationLog>
          }
          groupBy: {
            args: Prisma.EmailNotificationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailNotificationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailNotificationLogCountArgs<ExtArgs>
            result: $Utils.Optional<EmailNotificationLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    zone?: ZoneOmit
    weeklyReport?: WeeklyReportOmit
    findingHistory?: FindingHistoryOmit
    monthlyTarget?: MonthlyTargetOmit
    emailNotificationConfig?: EmailNotificationConfigOmit
    emailNotificationLog?: EmailNotificationLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    reports: number
    targets: number
    findingAudits: number
    emailLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    targets?: boolean | UserCountOutputTypeCountTargetsArgs
    findingAudits?: boolean | UserCountOutputTypeCountFindingAuditsArgs
    emailLogs?: boolean | UserCountOutputTypeCountEmailLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTargetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyTargetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFindingAuditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FindingHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailNotificationLogWhereInput
  }


  /**
   * Count Type WeeklyReportCountOutputType
   */

  export type WeeklyReportCountOutputType = {
    findingHistory: number
  }

  export type WeeklyReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    findingHistory?: boolean | WeeklyReportCountOutputTypeCountFindingHistoryArgs
  }

  // Custom InputTypes
  /**
   * WeeklyReportCountOutputType without action
   */
  export type WeeklyReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReportCountOutputType
     */
    select?: WeeklyReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WeeklyReportCountOutputType without action
   */
  export type WeeklyReportCountOutputTypeCountFindingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FindingHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    staffId: string | null
    name: string | null
    designation: string | null
    zone: string | null
    email: string | null
    mobile: string | null
    role: string | null
    status: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    staffId: string | null
    name: string | null
    designation: string | null
    zone: string | null
    email: string | null
    mobile: string | null
    role: string | null
    status: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    staffId: number
    name: number
    designation: number
    zone: number
    email: number
    mobile: number
    role: number
    status: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    staffId?: true
    name?: true
    designation?: true
    zone?: true
    email?: true
    mobile?: true
    role?: true
    status?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    staffId?: true
    name?: true
    designation?: true
    zone?: true
    email?: true
    mobile?: true
    role?: true
    status?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    staffId?: true
    name?: true
    designation?: true
    zone?: true
    email?: true
    mobile?: true
    role?: true
    status?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile: string | null
    role: string
    status: string
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    name?: boolean
    designation?: boolean
    zone?: boolean
    email?: boolean
    mobile?: boolean
    role?: boolean
    status?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reports?: boolean | User$reportsArgs<ExtArgs>
    targets?: boolean | User$targetsArgs<ExtArgs>
    findingAudits?: boolean | User$findingAuditsArgs<ExtArgs>
    emailLogs?: boolean | User$emailLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    name?: boolean
    designation?: boolean
    zone?: boolean
    email?: boolean
    mobile?: boolean
    role?: boolean
    status?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    name?: boolean
    designation?: boolean
    zone?: boolean
    email?: boolean
    mobile?: boolean
    role?: boolean
    status?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    staffId?: boolean
    name?: boolean
    designation?: boolean
    zone?: boolean
    email?: boolean
    mobile?: boolean
    role?: boolean
    status?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "staffId" | "name" | "designation" | "zone" | "email" | "mobile" | "role" | "status" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | User$reportsArgs<ExtArgs>
    targets?: boolean | User$targetsArgs<ExtArgs>
    findingAudits?: boolean | User$findingAuditsArgs<ExtArgs>
    emailLogs?: boolean | User$emailLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      reports: Prisma.$WeeklyReportPayload<ExtArgs>[]
      targets: Prisma.$MonthlyTargetPayload<ExtArgs>[]
      findingAudits: Prisma.$FindingHistoryPayload<ExtArgs>[]
      emailLogs: Prisma.$EmailNotificationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      staffId: string
      name: string
      designation: string
      zone: string
      email: string
      mobile: string | null
      role: string
      status: string
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    targets<T extends User$targetsArgs<ExtArgs> = {}>(args?: Subset<T, User$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    findingAudits<T extends User$findingAuditsArgs<ExtArgs> = {}>(args?: Subset<T, User$findingAuditsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emailLogs<T extends User$emailLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly staffId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly designation: FieldRef<"User", 'String'>
    readonly zone: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly mobile: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    where?: WeeklyReportWhereInput
    orderBy?: WeeklyReportOrderByWithRelationInput | WeeklyReportOrderByWithRelationInput[]
    cursor?: WeeklyReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyReportScalarFieldEnum | WeeklyReportScalarFieldEnum[]
  }

  /**
   * User.targets
   */
  export type User$targetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    where?: MonthlyTargetWhereInput
    orderBy?: MonthlyTargetOrderByWithRelationInput | MonthlyTargetOrderByWithRelationInput[]
    cursor?: MonthlyTargetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyTargetScalarFieldEnum | MonthlyTargetScalarFieldEnum[]
  }

  /**
   * User.findingAudits
   */
  export type User$findingAuditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    where?: FindingHistoryWhereInput
    orderBy?: FindingHistoryOrderByWithRelationInput | FindingHistoryOrderByWithRelationInput[]
    cursor?: FindingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FindingHistoryScalarFieldEnum | FindingHistoryScalarFieldEnum[]
  }

  /**
   * User.emailLogs
   */
  export type User$emailLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    where?: EmailNotificationLogWhereInput
    orderBy?: EmailNotificationLogOrderByWithRelationInput | EmailNotificationLogOrderByWithRelationInput[]
    cursor?: EmailNotificationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailNotificationLogScalarFieldEnum | EmailNotificationLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Zone
   */

  export type AggregateZone = {
    _count: ZoneCountAggregateOutputType | null
    _min: ZoneMinAggregateOutputType | null
    _max: ZoneMaxAggregateOutputType | null
  }

  export type ZoneMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ZoneMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ZoneCountAggregateOutputType = {
    id: number
    name: number
    code: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type ZoneMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    isActive?: true
    createdAt?: true
  }

  export type ZoneMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    isActive?: true
    createdAt?: true
  }

  export type ZoneCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type ZoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Zone to aggregate.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Zones
    **/
    _count?: true | ZoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ZoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ZoneMaxAggregateInputType
  }

  export type GetZoneAggregateType<T extends ZoneAggregateArgs> = {
        [P in keyof T & keyof AggregateZone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateZone[P]>
      : GetScalarType<T[P], AggregateZone[P]>
  }




  export type ZoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ZoneWhereInput
    orderBy?: ZoneOrderByWithAggregationInput | ZoneOrderByWithAggregationInput[]
    by: ZoneScalarFieldEnum[] | ZoneScalarFieldEnum
    having?: ZoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ZoneCountAggregateInputType | true
    _min?: ZoneMinAggregateInputType
    _max?: ZoneMaxAggregateInputType
  }

  export type ZoneGroupByOutputType = {
    id: string
    name: string
    code: string | null
    isActive: boolean
    createdAt: Date
    _count: ZoneCountAggregateOutputType | null
    _min: ZoneMinAggregateOutputType | null
    _max: ZoneMaxAggregateOutputType | null
  }

  type GetZoneGroupByPayload<T extends ZoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ZoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ZoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ZoneGroupByOutputType[P]>
            : GetScalarType<T[P], ZoneGroupByOutputType[P]>
        }
      >
    >


  export type ZoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["zone"]>

  export type ZoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["zone"]>

  export type ZoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["zone"]>

  export type ZoneSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type ZoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "isActive" | "createdAt", ExtArgs["result"]["zone"]>

  export type $ZonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Zone"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string | null
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["zone"]>
    composites: {}
  }

  type ZoneGetPayload<S extends boolean | null | undefined | ZoneDefaultArgs> = $Result.GetResult<Prisma.$ZonePayload, S>

  type ZoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ZoneCountAggregateInputType | true
    }

  export interface ZoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Zone'], meta: { name: 'Zone' } }
    /**
     * Find zero or one Zone that matches the filter.
     * @param {ZoneFindUniqueArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ZoneFindUniqueArgs>(args: SelectSubset<T, ZoneFindUniqueArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Zone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ZoneFindUniqueOrThrowArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ZoneFindUniqueOrThrowArgs>(args: SelectSubset<T, ZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Zone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneFindFirstArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ZoneFindFirstArgs>(args?: SelectSubset<T, ZoneFindFirstArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Zone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneFindFirstOrThrowArgs} args - Arguments to find a Zone
     * @example
     * // Get one Zone
     * const zone = await prisma.zone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ZoneFindFirstOrThrowArgs>(args?: SelectSubset<T, ZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Zones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Zones
     * const zones = await prisma.zone.findMany()
     * 
     * // Get first 10 Zones
     * const zones = await prisma.zone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const zoneWithIdOnly = await prisma.zone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ZoneFindManyArgs>(args?: SelectSubset<T, ZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Zone.
     * @param {ZoneCreateArgs} args - Arguments to create a Zone.
     * @example
     * // Create one Zone
     * const Zone = await prisma.zone.create({
     *   data: {
     *     // ... data to create a Zone
     *   }
     * })
     * 
     */
    create<T extends ZoneCreateArgs>(args: SelectSubset<T, ZoneCreateArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Zones.
     * @param {ZoneCreateManyArgs} args - Arguments to create many Zones.
     * @example
     * // Create many Zones
     * const zone = await prisma.zone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ZoneCreateManyArgs>(args?: SelectSubset<T, ZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Zones and returns the data saved in the database.
     * @param {ZoneCreateManyAndReturnArgs} args - Arguments to create many Zones.
     * @example
     * // Create many Zones
     * const zone = await prisma.zone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Zones and only return the `id`
     * const zoneWithIdOnly = await prisma.zone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ZoneCreateManyAndReturnArgs>(args?: SelectSubset<T, ZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Zone.
     * @param {ZoneDeleteArgs} args - Arguments to delete one Zone.
     * @example
     * // Delete one Zone
     * const Zone = await prisma.zone.delete({
     *   where: {
     *     // ... filter to delete one Zone
     *   }
     * })
     * 
     */
    delete<T extends ZoneDeleteArgs>(args: SelectSubset<T, ZoneDeleteArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Zone.
     * @param {ZoneUpdateArgs} args - Arguments to update one Zone.
     * @example
     * // Update one Zone
     * const zone = await prisma.zone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ZoneUpdateArgs>(args: SelectSubset<T, ZoneUpdateArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Zones.
     * @param {ZoneDeleteManyArgs} args - Arguments to filter Zones to delete.
     * @example
     * // Delete a few Zones
     * const { count } = await prisma.zone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ZoneDeleteManyArgs>(args?: SelectSubset<T, ZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Zones
     * const zone = await prisma.zone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ZoneUpdateManyArgs>(args: SelectSubset<T, ZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zones and returns the data updated in the database.
     * @param {ZoneUpdateManyAndReturnArgs} args - Arguments to update many Zones.
     * @example
     * // Update many Zones
     * const zone = await prisma.zone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Zones and only return the `id`
     * const zoneWithIdOnly = await prisma.zone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ZoneUpdateManyAndReturnArgs>(args: SelectSubset<T, ZoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Zone.
     * @param {ZoneUpsertArgs} args - Arguments to update or create a Zone.
     * @example
     * // Update or create a Zone
     * const zone = await prisma.zone.upsert({
     *   create: {
     *     // ... data to create a Zone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Zone we want to update
     *   }
     * })
     */
    upsert<T extends ZoneUpsertArgs>(args: SelectSubset<T, ZoneUpsertArgs<ExtArgs>>): Prisma__ZoneClient<$Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Zones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneCountArgs} args - Arguments to filter Zones to count.
     * @example
     * // Count the number of Zones
     * const count = await prisma.zone.count({
     *   where: {
     *     // ... the filter for the Zones we want to count
     *   }
     * })
    **/
    count<T extends ZoneCountArgs>(
      args?: Subset<T, ZoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ZoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Zone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ZoneAggregateArgs>(args: Subset<T, ZoneAggregateArgs>): Prisma.PrismaPromise<GetZoneAggregateType<T>>

    /**
     * Group by Zone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ZoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ZoneGroupByArgs['orderBy'] }
        : { orderBy?: ZoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Zone model
   */
  readonly fields: ZoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Zone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ZoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Zone model
   */
  interface ZoneFieldRefs {
    readonly id: FieldRef<"Zone", 'String'>
    readonly name: FieldRef<"Zone", 'String'>
    readonly code: FieldRef<"Zone", 'String'>
    readonly isActive: FieldRef<"Zone", 'Boolean'>
    readonly createdAt: FieldRef<"Zone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Zone findUnique
   */
  export type ZoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone findUniqueOrThrow
   */
  export type ZoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone findFirst
   */
  export type ZoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zones.
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zones.
     */
    distinct?: ZoneScalarFieldEnum | ZoneScalarFieldEnum[]
  }

  /**
   * Zone findFirstOrThrow
   */
  export type ZoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Filter, which Zone to fetch.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zones.
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zones.
     */
    distinct?: ZoneScalarFieldEnum | ZoneScalarFieldEnum[]
  }

  /**
   * Zone findMany
   */
  export type ZoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Filter, which Zones to fetch.
     */
    where?: ZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zones to fetch.
     */
    orderBy?: ZoneOrderByWithRelationInput | ZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Zones.
     */
    cursor?: ZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zones.
     */
    skip?: number
    distinct?: ZoneScalarFieldEnum | ZoneScalarFieldEnum[]
  }

  /**
   * Zone create
   */
  export type ZoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * The data needed to create a Zone.
     */
    data: XOR<ZoneCreateInput, ZoneUncheckedCreateInput>
  }

  /**
   * Zone createMany
   */
  export type ZoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Zones.
     */
    data: ZoneCreateManyInput | ZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Zone createManyAndReturn
   */
  export type ZoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * The data used to create many Zones.
     */
    data: ZoneCreateManyInput | ZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Zone update
   */
  export type ZoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * The data needed to update a Zone.
     */
    data: XOR<ZoneUpdateInput, ZoneUncheckedUpdateInput>
    /**
     * Choose, which Zone to update.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone updateMany
   */
  export type ZoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Zones.
     */
    data: XOR<ZoneUpdateManyMutationInput, ZoneUncheckedUpdateManyInput>
    /**
     * Filter which Zones to update
     */
    where?: ZoneWhereInput
    /**
     * Limit how many Zones to update.
     */
    limit?: number
  }

  /**
   * Zone updateManyAndReturn
   */
  export type ZoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * The data used to update Zones.
     */
    data: XOR<ZoneUpdateManyMutationInput, ZoneUncheckedUpdateManyInput>
    /**
     * Filter which Zones to update
     */
    where?: ZoneWhereInput
    /**
     * Limit how many Zones to update.
     */
    limit?: number
  }

  /**
   * Zone upsert
   */
  export type ZoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * The filter to search for the Zone to update in case it exists.
     */
    where: ZoneWhereUniqueInput
    /**
     * In case the Zone found by the `where` argument doesn't exist, create a new Zone with this data.
     */
    create: XOR<ZoneCreateInput, ZoneUncheckedCreateInput>
    /**
     * In case the Zone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ZoneUpdateInput, ZoneUncheckedUpdateInput>
  }

  /**
   * Zone delete
   */
  export type ZoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
    /**
     * Filter which Zone to delete.
     */
    where: ZoneWhereUniqueInput
  }

  /**
   * Zone deleteMany
   */
  export type ZoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Zones to delete
     */
    where?: ZoneWhereInput
    /**
     * Limit how many Zones to delete.
     */
    limit?: number
  }

  /**
   * Zone without action
   */
  export type ZoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zone
     */
    select?: ZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zone
     */
    omit?: ZoneOmit<ExtArgs> | null
  }


  /**
   * Model WeeklyReport
   */

  export type AggregateWeeklyReport = {
    _count: WeeklyReportCountAggregateOutputType | null
    _avg: WeeklyReportAvgAggregateOutputType | null
    _sum: WeeklyReportSumAggregateOutputType | null
    _min: WeeklyReportMinAggregateOutputType | null
    _max: WeeklyReportMaxAggregateOutputType | null
  }

  export type WeeklyReportAvgAggregateOutputType = {
    year: number | null
    month: number | null
    week: number | null
    marketVisitQty: number | null
    marketVisitFindingQty: number | null
    solvedQty: number | null
    pendingQty: number | null
    locSubmittedQty: number | null
    locFindingDayQty: number | null
    dressCodeQty: number | null
    dressCodeFindingQty: number | null
    messVisitQty: number | null
    messVisitFindingQty: number | null
  }

  export type WeeklyReportSumAggregateOutputType = {
    year: number | null
    month: number | null
    week: number | null
    marketVisitQty: number | null
    marketVisitFindingQty: number | null
    solvedQty: number | null
    pendingQty: number | null
    locSubmittedQty: number | null
    locFindingDayQty: number | null
    dressCodeQty: number | null
    dressCodeFindingQty: number | null
    messVisitQty: number | null
    messVisitFindingQty: number | null
  }

  export type WeeklyReportMinAggregateOutputType = {
    id: string | null
    userId: string | null
    monthYear: string | null
    year: number | null
    month: number | null
    week: number | null
    marketVisitQty: number | null
    marketVisitFindingQty: number | null
    solvedQty: number | null
    pendingQty: number | null
    locSubmittedQty: number | null
    locFindingDayQty: number | null
    dressCodeQty: number | null
    dressCodeFindingQty: number | null
    messVisitQty: number | null
    messVisitFindingQty: number | null
    status: string | null
    deadline: Date | null
    submittedAt: Date | null
    updatedAt: Date | null
    notes: string | null
  }

  export type WeeklyReportMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    monthYear: string | null
    year: number | null
    month: number | null
    week: number | null
    marketVisitQty: number | null
    marketVisitFindingQty: number | null
    solvedQty: number | null
    pendingQty: number | null
    locSubmittedQty: number | null
    locFindingDayQty: number | null
    dressCodeQty: number | null
    dressCodeFindingQty: number | null
    messVisitQty: number | null
    messVisitFindingQty: number | null
    status: string | null
    deadline: Date | null
    submittedAt: Date | null
    updatedAt: Date | null
    notes: string | null
  }

  export type WeeklyReportCountAggregateOutputType = {
    id: number
    userId: number
    monthYear: number
    year: number
    month: number
    week: number
    marketVisitQty: number
    marketVisitFindingQty: number
    solvedQty: number
    pendingQty: number
    locSubmittedQty: number
    locFindingDayQty: number
    dressCodeQty: number
    dressCodeFindingQty: number
    messVisitQty: number
    messVisitFindingQty: number
    status: number
    deadline: number
    submittedAt: number
    updatedAt: number
    notes: number
    _all: number
  }


  export type WeeklyReportAvgAggregateInputType = {
    year?: true
    month?: true
    week?: true
    marketVisitQty?: true
    marketVisitFindingQty?: true
    solvedQty?: true
    pendingQty?: true
    locSubmittedQty?: true
    locFindingDayQty?: true
    dressCodeQty?: true
    dressCodeFindingQty?: true
    messVisitQty?: true
    messVisitFindingQty?: true
  }

  export type WeeklyReportSumAggregateInputType = {
    year?: true
    month?: true
    week?: true
    marketVisitQty?: true
    marketVisitFindingQty?: true
    solvedQty?: true
    pendingQty?: true
    locSubmittedQty?: true
    locFindingDayQty?: true
    dressCodeQty?: true
    dressCodeFindingQty?: true
    messVisitQty?: true
    messVisitFindingQty?: true
  }

  export type WeeklyReportMinAggregateInputType = {
    id?: true
    userId?: true
    monthYear?: true
    year?: true
    month?: true
    week?: true
    marketVisitQty?: true
    marketVisitFindingQty?: true
    solvedQty?: true
    pendingQty?: true
    locSubmittedQty?: true
    locFindingDayQty?: true
    dressCodeQty?: true
    dressCodeFindingQty?: true
    messVisitQty?: true
    messVisitFindingQty?: true
    status?: true
    deadline?: true
    submittedAt?: true
    updatedAt?: true
    notes?: true
  }

  export type WeeklyReportMaxAggregateInputType = {
    id?: true
    userId?: true
    monthYear?: true
    year?: true
    month?: true
    week?: true
    marketVisitQty?: true
    marketVisitFindingQty?: true
    solvedQty?: true
    pendingQty?: true
    locSubmittedQty?: true
    locFindingDayQty?: true
    dressCodeQty?: true
    dressCodeFindingQty?: true
    messVisitQty?: true
    messVisitFindingQty?: true
    status?: true
    deadline?: true
    submittedAt?: true
    updatedAt?: true
    notes?: true
  }

  export type WeeklyReportCountAggregateInputType = {
    id?: true
    userId?: true
    monthYear?: true
    year?: true
    month?: true
    week?: true
    marketVisitQty?: true
    marketVisitFindingQty?: true
    solvedQty?: true
    pendingQty?: true
    locSubmittedQty?: true
    locFindingDayQty?: true
    dressCodeQty?: true
    dressCodeFindingQty?: true
    messVisitQty?: true
    messVisitFindingQty?: true
    status?: true
    deadline?: true
    submittedAt?: true
    updatedAt?: true
    notes?: true
    _all?: true
  }

  export type WeeklyReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyReport to aggregate.
     */
    where?: WeeklyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyReports to fetch.
     */
    orderBy?: WeeklyReportOrderByWithRelationInput | WeeklyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklyReports
    **/
    _count?: true | WeeklyReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeeklyReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeeklyReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyReportMaxAggregateInputType
  }

  export type GetWeeklyReportAggregateType<T extends WeeklyReportAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklyReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklyReport[P]>
      : GetScalarType<T[P], AggregateWeeklyReport[P]>
  }




  export type WeeklyReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyReportWhereInput
    orderBy?: WeeklyReportOrderByWithAggregationInput | WeeklyReportOrderByWithAggregationInput[]
    by: WeeklyReportScalarFieldEnum[] | WeeklyReportScalarFieldEnum
    having?: WeeklyReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyReportCountAggregateInputType | true
    _avg?: WeeklyReportAvgAggregateInputType
    _sum?: WeeklyReportSumAggregateInputType
    _min?: WeeklyReportMinAggregateInputType
    _max?: WeeklyReportMaxAggregateInputType
  }

  export type WeeklyReportGroupByOutputType = {
    id: string
    userId: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty: number
    marketVisitFindingQty: number
    solvedQty: number
    pendingQty: number
    locSubmittedQty: number
    locFindingDayQty: number
    dressCodeQty: number
    dressCodeFindingQty: number
    messVisitQty: number
    messVisitFindingQty: number
    status: string
    deadline: Date
    submittedAt: Date
    updatedAt: Date
    notes: string | null
    _count: WeeklyReportCountAggregateOutputType | null
    _avg: WeeklyReportAvgAggregateOutputType | null
    _sum: WeeklyReportSumAggregateOutputType | null
    _min: WeeklyReportMinAggregateOutputType | null
    _max: WeeklyReportMaxAggregateOutputType | null
  }

  type GetWeeklyReportGroupByPayload<T extends WeeklyReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyReportGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyReportGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    monthYear?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    marketVisitQty?: boolean
    marketVisitFindingQty?: boolean
    solvedQty?: boolean
    pendingQty?: boolean
    locSubmittedQty?: boolean
    locFindingDayQty?: boolean
    dressCodeQty?: boolean
    dressCodeFindingQty?: boolean
    messVisitQty?: boolean
    messVisitFindingQty?: boolean
    status?: boolean
    deadline?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
    notes?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    findingHistory?: boolean | WeeklyReport$findingHistoryArgs<ExtArgs>
    _count?: boolean | WeeklyReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyReport"]>

  export type WeeklyReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    monthYear?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    marketVisitQty?: boolean
    marketVisitFindingQty?: boolean
    solvedQty?: boolean
    pendingQty?: boolean
    locSubmittedQty?: boolean
    locFindingDayQty?: boolean
    dressCodeQty?: boolean
    dressCodeFindingQty?: boolean
    messVisitQty?: boolean
    messVisitFindingQty?: boolean
    status?: boolean
    deadline?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
    notes?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyReport"]>

  export type WeeklyReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    monthYear?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    marketVisitQty?: boolean
    marketVisitFindingQty?: boolean
    solvedQty?: boolean
    pendingQty?: boolean
    locSubmittedQty?: boolean
    locFindingDayQty?: boolean
    dressCodeQty?: boolean
    dressCodeFindingQty?: boolean
    messVisitQty?: boolean
    messVisitFindingQty?: boolean
    status?: boolean
    deadline?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
    notes?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyReport"]>

  export type WeeklyReportSelectScalar = {
    id?: boolean
    userId?: boolean
    monthYear?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    marketVisitQty?: boolean
    marketVisitFindingQty?: boolean
    solvedQty?: boolean
    pendingQty?: boolean
    locSubmittedQty?: boolean
    locFindingDayQty?: boolean
    dressCodeQty?: boolean
    dressCodeFindingQty?: boolean
    messVisitQty?: boolean
    messVisitFindingQty?: boolean
    status?: boolean
    deadline?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
    notes?: boolean
  }

  export type WeeklyReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "monthYear" | "year" | "month" | "week" | "marketVisitQty" | "marketVisitFindingQty" | "solvedQty" | "pendingQty" | "locSubmittedQty" | "locFindingDayQty" | "dressCodeQty" | "dressCodeFindingQty" | "messVisitQty" | "messVisitFindingQty" | "status" | "deadline" | "submittedAt" | "updatedAt" | "notes", ExtArgs["result"]["weeklyReport"]>
  export type WeeklyReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    findingHistory?: boolean | WeeklyReport$findingHistoryArgs<ExtArgs>
    _count?: boolean | WeeklyReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WeeklyReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeeklyReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WeeklyReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklyReport"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      findingHistory: Prisma.$FindingHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      monthYear: string
      year: number
      month: number
      week: number
      marketVisitQty: number
      marketVisitFindingQty: number
      solvedQty: number
      pendingQty: number
      locSubmittedQty: number
      locFindingDayQty: number
      dressCodeQty: number
      dressCodeFindingQty: number
      messVisitQty: number
      messVisitFindingQty: number
      status: string
      deadline: Date
      submittedAt: Date
      updatedAt: Date
      notes: string | null
    }, ExtArgs["result"]["weeklyReport"]>
    composites: {}
  }

  type WeeklyReportGetPayload<S extends boolean | null | undefined | WeeklyReportDefaultArgs> = $Result.GetResult<Prisma.$WeeklyReportPayload, S>

  type WeeklyReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeeklyReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeeklyReportCountAggregateInputType | true
    }

  export interface WeeklyReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklyReport'], meta: { name: 'WeeklyReport' } }
    /**
     * Find zero or one WeeklyReport that matches the filter.
     * @param {WeeklyReportFindUniqueArgs} args - Arguments to find a WeeklyReport
     * @example
     * // Get one WeeklyReport
     * const weeklyReport = await prisma.weeklyReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeeklyReportFindUniqueArgs>(args: SelectSubset<T, WeeklyReportFindUniqueArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeeklyReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeeklyReportFindUniqueOrThrowArgs} args - Arguments to find a WeeklyReport
     * @example
     * // Get one WeeklyReport
     * const weeklyReport = await prisma.weeklyReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeeklyReportFindUniqueOrThrowArgs>(args: SelectSubset<T, WeeklyReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportFindFirstArgs} args - Arguments to find a WeeklyReport
     * @example
     * // Get one WeeklyReport
     * const weeklyReport = await prisma.weeklyReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeeklyReportFindFirstArgs>(args?: SelectSubset<T, WeeklyReportFindFirstArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportFindFirstOrThrowArgs} args - Arguments to find a WeeklyReport
     * @example
     * // Get one WeeklyReport
     * const weeklyReport = await prisma.weeklyReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeeklyReportFindFirstOrThrowArgs>(args?: SelectSubset<T, WeeklyReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeeklyReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklyReports
     * const weeklyReports = await prisma.weeklyReport.findMany()
     * 
     * // Get first 10 WeeklyReports
     * const weeklyReports = await prisma.weeklyReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyReportWithIdOnly = await prisma.weeklyReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeeklyReportFindManyArgs>(args?: SelectSubset<T, WeeklyReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeeklyReport.
     * @param {WeeklyReportCreateArgs} args - Arguments to create a WeeklyReport.
     * @example
     * // Create one WeeklyReport
     * const WeeklyReport = await prisma.weeklyReport.create({
     *   data: {
     *     // ... data to create a WeeklyReport
     *   }
     * })
     * 
     */
    create<T extends WeeklyReportCreateArgs>(args: SelectSubset<T, WeeklyReportCreateArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeeklyReports.
     * @param {WeeklyReportCreateManyArgs} args - Arguments to create many WeeklyReports.
     * @example
     * // Create many WeeklyReports
     * const weeklyReport = await prisma.weeklyReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeeklyReportCreateManyArgs>(args?: SelectSubset<T, WeeklyReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklyReports and returns the data saved in the database.
     * @param {WeeklyReportCreateManyAndReturnArgs} args - Arguments to create many WeeklyReports.
     * @example
     * // Create many WeeklyReports
     * const weeklyReport = await prisma.weeklyReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklyReports and only return the `id`
     * const weeklyReportWithIdOnly = await prisma.weeklyReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeeklyReportCreateManyAndReturnArgs>(args?: SelectSubset<T, WeeklyReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeeklyReport.
     * @param {WeeklyReportDeleteArgs} args - Arguments to delete one WeeklyReport.
     * @example
     * // Delete one WeeklyReport
     * const WeeklyReport = await prisma.weeklyReport.delete({
     *   where: {
     *     // ... filter to delete one WeeklyReport
     *   }
     * })
     * 
     */
    delete<T extends WeeklyReportDeleteArgs>(args: SelectSubset<T, WeeklyReportDeleteArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeeklyReport.
     * @param {WeeklyReportUpdateArgs} args - Arguments to update one WeeklyReport.
     * @example
     * // Update one WeeklyReport
     * const weeklyReport = await prisma.weeklyReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeeklyReportUpdateArgs>(args: SelectSubset<T, WeeklyReportUpdateArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeeklyReports.
     * @param {WeeklyReportDeleteManyArgs} args - Arguments to filter WeeklyReports to delete.
     * @example
     * // Delete a few WeeklyReports
     * const { count } = await prisma.weeklyReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeeklyReportDeleteManyArgs>(args?: SelectSubset<T, WeeklyReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklyReports
     * const weeklyReport = await prisma.weeklyReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeeklyReportUpdateManyArgs>(args: SelectSubset<T, WeeklyReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyReports and returns the data updated in the database.
     * @param {WeeklyReportUpdateManyAndReturnArgs} args - Arguments to update many WeeklyReports.
     * @example
     * // Update many WeeklyReports
     * const weeklyReport = await prisma.weeklyReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeeklyReports and only return the `id`
     * const weeklyReportWithIdOnly = await prisma.weeklyReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeeklyReportUpdateManyAndReturnArgs>(args: SelectSubset<T, WeeklyReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeeklyReport.
     * @param {WeeklyReportUpsertArgs} args - Arguments to update or create a WeeklyReport.
     * @example
     * // Update or create a WeeklyReport
     * const weeklyReport = await prisma.weeklyReport.upsert({
     *   create: {
     *     // ... data to create a WeeklyReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklyReport we want to update
     *   }
     * })
     */
    upsert<T extends WeeklyReportUpsertArgs>(args: SelectSubset<T, WeeklyReportUpsertArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeeklyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportCountArgs} args - Arguments to filter WeeklyReports to count.
     * @example
     * // Count the number of WeeklyReports
     * const count = await prisma.weeklyReport.count({
     *   where: {
     *     // ... the filter for the WeeklyReports we want to count
     *   }
     * })
    **/
    count<T extends WeeklyReportCountArgs>(
      args?: Subset<T, WeeklyReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeeklyReportAggregateArgs>(args: Subset<T, WeeklyReportAggregateArgs>): Prisma.PrismaPromise<GetWeeklyReportAggregateType<T>>

    /**
     * Group by WeeklyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeeklyReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyReportGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeeklyReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklyReport model
   */
  readonly fields: WeeklyReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklyReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    findingHistory<T extends WeeklyReport$findingHistoryArgs<ExtArgs> = {}>(args?: Subset<T, WeeklyReport$findingHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeeklyReport model
   */
  interface WeeklyReportFieldRefs {
    readonly id: FieldRef<"WeeklyReport", 'String'>
    readonly userId: FieldRef<"WeeklyReport", 'String'>
    readonly monthYear: FieldRef<"WeeklyReport", 'String'>
    readonly year: FieldRef<"WeeklyReport", 'Int'>
    readonly month: FieldRef<"WeeklyReport", 'Int'>
    readonly week: FieldRef<"WeeklyReport", 'Int'>
    readonly marketVisitQty: FieldRef<"WeeklyReport", 'Int'>
    readonly marketVisitFindingQty: FieldRef<"WeeklyReport", 'Int'>
    readonly solvedQty: FieldRef<"WeeklyReport", 'Int'>
    readonly pendingQty: FieldRef<"WeeklyReport", 'Int'>
    readonly locSubmittedQty: FieldRef<"WeeklyReport", 'Int'>
    readonly locFindingDayQty: FieldRef<"WeeklyReport", 'Float'>
    readonly dressCodeQty: FieldRef<"WeeklyReport", 'Int'>
    readonly dressCodeFindingQty: FieldRef<"WeeklyReport", 'Int'>
    readonly messVisitQty: FieldRef<"WeeklyReport", 'Int'>
    readonly messVisitFindingQty: FieldRef<"WeeklyReport", 'Int'>
    readonly status: FieldRef<"WeeklyReport", 'String'>
    readonly deadline: FieldRef<"WeeklyReport", 'DateTime'>
    readonly submittedAt: FieldRef<"WeeklyReport", 'DateTime'>
    readonly updatedAt: FieldRef<"WeeklyReport", 'DateTime'>
    readonly notes: FieldRef<"WeeklyReport", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WeeklyReport findUnique
   */
  export type WeeklyReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyReport to fetch.
     */
    where: WeeklyReportWhereUniqueInput
  }

  /**
   * WeeklyReport findUniqueOrThrow
   */
  export type WeeklyReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyReport to fetch.
     */
    where: WeeklyReportWhereUniqueInput
  }

  /**
   * WeeklyReport findFirst
   */
  export type WeeklyReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyReport to fetch.
     */
    where?: WeeklyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyReports to fetch.
     */
    orderBy?: WeeklyReportOrderByWithRelationInput | WeeklyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyReports.
     */
    cursor?: WeeklyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyReports.
     */
    distinct?: WeeklyReportScalarFieldEnum | WeeklyReportScalarFieldEnum[]
  }

  /**
   * WeeklyReport findFirstOrThrow
   */
  export type WeeklyReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyReport to fetch.
     */
    where?: WeeklyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyReports to fetch.
     */
    orderBy?: WeeklyReportOrderByWithRelationInput | WeeklyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyReports.
     */
    cursor?: WeeklyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyReports.
     */
    distinct?: WeeklyReportScalarFieldEnum | WeeklyReportScalarFieldEnum[]
  }

  /**
   * WeeklyReport findMany
   */
  export type WeeklyReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyReports to fetch.
     */
    where?: WeeklyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyReports to fetch.
     */
    orderBy?: WeeklyReportOrderByWithRelationInput | WeeklyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklyReports.
     */
    cursor?: WeeklyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyReports.
     */
    skip?: number
    distinct?: WeeklyReportScalarFieldEnum | WeeklyReportScalarFieldEnum[]
  }

  /**
   * WeeklyReport create
   */
  export type WeeklyReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklyReport.
     */
    data: XOR<WeeklyReportCreateInput, WeeklyReportUncheckedCreateInput>
  }

  /**
   * WeeklyReport createMany
   */
  export type WeeklyReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklyReports.
     */
    data: WeeklyReportCreateManyInput | WeeklyReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyReport createManyAndReturn
   */
  export type WeeklyReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * The data used to create many WeeklyReports.
     */
    data: WeeklyReportCreateManyInput | WeeklyReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyReport update
   */
  export type WeeklyReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklyReport.
     */
    data: XOR<WeeklyReportUpdateInput, WeeklyReportUncheckedUpdateInput>
    /**
     * Choose, which WeeklyReport to update.
     */
    where: WeeklyReportWhereUniqueInput
  }

  /**
   * WeeklyReport updateMany
   */
  export type WeeklyReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklyReports.
     */
    data: XOR<WeeklyReportUpdateManyMutationInput, WeeklyReportUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyReports to update
     */
    where?: WeeklyReportWhereInput
    /**
     * Limit how many WeeklyReports to update.
     */
    limit?: number
  }

  /**
   * WeeklyReport updateManyAndReturn
   */
  export type WeeklyReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * The data used to update WeeklyReports.
     */
    data: XOR<WeeklyReportUpdateManyMutationInput, WeeklyReportUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyReports to update
     */
    where?: WeeklyReportWhereInput
    /**
     * Limit how many WeeklyReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyReport upsert
   */
  export type WeeklyReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklyReport to update in case it exists.
     */
    where: WeeklyReportWhereUniqueInput
    /**
     * In case the WeeklyReport found by the `where` argument doesn't exist, create a new WeeklyReport with this data.
     */
    create: XOR<WeeklyReportCreateInput, WeeklyReportUncheckedCreateInput>
    /**
     * In case the WeeklyReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyReportUpdateInput, WeeklyReportUncheckedUpdateInput>
  }

  /**
   * WeeklyReport delete
   */
  export type WeeklyReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
    /**
     * Filter which WeeklyReport to delete.
     */
    where: WeeklyReportWhereUniqueInput
  }

  /**
   * WeeklyReport deleteMany
   */
  export type WeeklyReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyReports to delete
     */
    where?: WeeklyReportWhereInput
    /**
     * Limit how many WeeklyReports to delete.
     */
    limit?: number
  }

  /**
   * WeeklyReport.findingHistory
   */
  export type WeeklyReport$findingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    where?: FindingHistoryWhereInput
    orderBy?: FindingHistoryOrderByWithRelationInput | FindingHistoryOrderByWithRelationInput[]
    cursor?: FindingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FindingHistoryScalarFieldEnum | FindingHistoryScalarFieldEnum[]
  }

  /**
   * WeeklyReport without action
   */
  export type WeeklyReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyReport
     */
    select?: WeeklyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyReport
     */
    omit?: WeeklyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyReportInclude<ExtArgs> | null
  }


  /**
   * Model FindingHistory
   */

  export type AggregateFindingHistory = {
    _count: FindingHistoryCountAggregateOutputType | null
    _avg: FindingHistoryAvgAggregateOutputType | null
    _sum: FindingHistorySumAggregateOutputType | null
    _min: FindingHistoryMinAggregateOutputType | null
    _max: FindingHistoryMaxAggregateOutputType | null
  }

  export type FindingHistoryAvgAggregateOutputType = {
    previousSolved: number | null
    newSolved: number | null
    previousPending: number | null
    newPending: number | null
  }

  export type FindingHistorySumAggregateOutputType = {
    previousSolved: number | null
    newSolved: number | null
    previousPending: number | null
    newPending: number | null
  }

  export type FindingHistoryMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    updatedById: string | null
    previousSolved: number | null
    newSolved: number | null
    previousPending: number | null
    newPending: number | null
    remark: string | null
    createdAt: Date | null
  }

  export type FindingHistoryMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    updatedById: string | null
    previousSolved: number | null
    newSolved: number | null
    previousPending: number | null
    newPending: number | null
    remark: string | null
    createdAt: Date | null
  }

  export type FindingHistoryCountAggregateOutputType = {
    id: number
    reportId: number
    updatedById: number
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark: number
    createdAt: number
    _all: number
  }


  export type FindingHistoryAvgAggregateInputType = {
    previousSolved?: true
    newSolved?: true
    previousPending?: true
    newPending?: true
  }

  export type FindingHistorySumAggregateInputType = {
    previousSolved?: true
    newSolved?: true
    previousPending?: true
    newPending?: true
  }

  export type FindingHistoryMinAggregateInputType = {
    id?: true
    reportId?: true
    updatedById?: true
    previousSolved?: true
    newSolved?: true
    previousPending?: true
    newPending?: true
    remark?: true
    createdAt?: true
  }

  export type FindingHistoryMaxAggregateInputType = {
    id?: true
    reportId?: true
    updatedById?: true
    previousSolved?: true
    newSolved?: true
    previousPending?: true
    newPending?: true
    remark?: true
    createdAt?: true
  }

  export type FindingHistoryCountAggregateInputType = {
    id?: true
    reportId?: true
    updatedById?: true
    previousSolved?: true
    newSolved?: true
    previousPending?: true
    newPending?: true
    remark?: true
    createdAt?: true
    _all?: true
  }

  export type FindingHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FindingHistory to aggregate.
     */
    where?: FindingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FindingHistories to fetch.
     */
    orderBy?: FindingHistoryOrderByWithRelationInput | FindingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FindingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FindingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FindingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FindingHistories
    **/
    _count?: true | FindingHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FindingHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FindingHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FindingHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FindingHistoryMaxAggregateInputType
  }

  export type GetFindingHistoryAggregateType<T extends FindingHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateFindingHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFindingHistory[P]>
      : GetScalarType<T[P], AggregateFindingHistory[P]>
  }




  export type FindingHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FindingHistoryWhereInput
    orderBy?: FindingHistoryOrderByWithAggregationInput | FindingHistoryOrderByWithAggregationInput[]
    by: FindingHistoryScalarFieldEnum[] | FindingHistoryScalarFieldEnum
    having?: FindingHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FindingHistoryCountAggregateInputType | true
    _avg?: FindingHistoryAvgAggregateInputType
    _sum?: FindingHistorySumAggregateInputType
    _min?: FindingHistoryMinAggregateInputType
    _max?: FindingHistoryMaxAggregateInputType
  }

  export type FindingHistoryGroupByOutputType = {
    id: string
    reportId: string
    updatedById: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark: string | null
    createdAt: Date
    _count: FindingHistoryCountAggregateOutputType | null
    _avg: FindingHistoryAvgAggregateOutputType | null
    _sum: FindingHistorySumAggregateOutputType | null
    _min: FindingHistoryMinAggregateOutputType | null
    _max: FindingHistoryMaxAggregateOutputType | null
  }

  type GetFindingHistoryGroupByPayload<T extends FindingHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FindingHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FindingHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FindingHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], FindingHistoryGroupByOutputType[P]>
        }
      >
    >


  export type FindingHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    updatedById?: boolean
    previousSolved?: boolean
    newSolved?: boolean
    previousPending?: boolean
    newPending?: boolean
    remark?: boolean
    createdAt?: boolean
    report?: boolean | WeeklyReportDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["findingHistory"]>

  export type FindingHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    updatedById?: boolean
    previousSolved?: boolean
    newSolved?: boolean
    previousPending?: boolean
    newPending?: boolean
    remark?: boolean
    createdAt?: boolean
    report?: boolean | WeeklyReportDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["findingHistory"]>

  export type FindingHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    updatedById?: boolean
    previousSolved?: boolean
    newSolved?: boolean
    previousPending?: boolean
    newPending?: boolean
    remark?: boolean
    createdAt?: boolean
    report?: boolean | WeeklyReportDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["findingHistory"]>

  export type FindingHistorySelectScalar = {
    id?: boolean
    reportId?: boolean
    updatedById?: boolean
    previousSolved?: boolean
    newSolved?: boolean
    previousPending?: boolean
    newPending?: boolean
    remark?: boolean
    createdAt?: boolean
  }

  export type FindingHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "updatedById" | "previousSolved" | "newSolved" | "previousPending" | "newPending" | "remark" | "createdAt", ExtArgs["result"]["findingHistory"]>
  export type FindingHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | WeeklyReportDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FindingHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | WeeklyReportDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FindingHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | WeeklyReportDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FindingHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FindingHistory"
    objects: {
      report: Prisma.$WeeklyReportPayload<ExtArgs>
      updatedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      updatedById: string
      previousSolved: number
      newSolved: number
      previousPending: number
      newPending: number
      remark: string | null
      createdAt: Date
    }, ExtArgs["result"]["findingHistory"]>
    composites: {}
  }

  type FindingHistoryGetPayload<S extends boolean | null | undefined | FindingHistoryDefaultArgs> = $Result.GetResult<Prisma.$FindingHistoryPayload, S>

  type FindingHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FindingHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FindingHistoryCountAggregateInputType | true
    }

  export interface FindingHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FindingHistory'], meta: { name: 'FindingHistory' } }
    /**
     * Find zero or one FindingHistory that matches the filter.
     * @param {FindingHistoryFindUniqueArgs} args - Arguments to find a FindingHistory
     * @example
     * // Get one FindingHistory
     * const findingHistory = await prisma.findingHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FindingHistoryFindUniqueArgs>(args: SelectSubset<T, FindingHistoryFindUniqueArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FindingHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FindingHistoryFindUniqueOrThrowArgs} args - Arguments to find a FindingHistory
     * @example
     * // Get one FindingHistory
     * const findingHistory = await prisma.findingHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FindingHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, FindingHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FindingHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryFindFirstArgs} args - Arguments to find a FindingHistory
     * @example
     * // Get one FindingHistory
     * const findingHistory = await prisma.findingHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FindingHistoryFindFirstArgs>(args?: SelectSubset<T, FindingHistoryFindFirstArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FindingHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryFindFirstOrThrowArgs} args - Arguments to find a FindingHistory
     * @example
     * // Get one FindingHistory
     * const findingHistory = await prisma.findingHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FindingHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, FindingHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FindingHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FindingHistories
     * const findingHistories = await prisma.findingHistory.findMany()
     * 
     * // Get first 10 FindingHistories
     * const findingHistories = await prisma.findingHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const findingHistoryWithIdOnly = await prisma.findingHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FindingHistoryFindManyArgs>(args?: SelectSubset<T, FindingHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FindingHistory.
     * @param {FindingHistoryCreateArgs} args - Arguments to create a FindingHistory.
     * @example
     * // Create one FindingHistory
     * const FindingHistory = await prisma.findingHistory.create({
     *   data: {
     *     // ... data to create a FindingHistory
     *   }
     * })
     * 
     */
    create<T extends FindingHistoryCreateArgs>(args: SelectSubset<T, FindingHistoryCreateArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FindingHistories.
     * @param {FindingHistoryCreateManyArgs} args - Arguments to create many FindingHistories.
     * @example
     * // Create many FindingHistories
     * const findingHistory = await prisma.findingHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FindingHistoryCreateManyArgs>(args?: SelectSubset<T, FindingHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FindingHistories and returns the data saved in the database.
     * @param {FindingHistoryCreateManyAndReturnArgs} args - Arguments to create many FindingHistories.
     * @example
     * // Create many FindingHistories
     * const findingHistory = await prisma.findingHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FindingHistories and only return the `id`
     * const findingHistoryWithIdOnly = await prisma.findingHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FindingHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, FindingHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FindingHistory.
     * @param {FindingHistoryDeleteArgs} args - Arguments to delete one FindingHistory.
     * @example
     * // Delete one FindingHistory
     * const FindingHistory = await prisma.findingHistory.delete({
     *   where: {
     *     // ... filter to delete one FindingHistory
     *   }
     * })
     * 
     */
    delete<T extends FindingHistoryDeleteArgs>(args: SelectSubset<T, FindingHistoryDeleteArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FindingHistory.
     * @param {FindingHistoryUpdateArgs} args - Arguments to update one FindingHistory.
     * @example
     * // Update one FindingHistory
     * const findingHistory = await prisma.findingHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FindingHistoryUpdateArgs>(args: SelectSubset<T, FindingHistoryUpdateArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FindingHistories.
     * @param {FindingHistoryDeleteManyArgs} args - Arguments to filter FindingHistories to delete.
     * @example
     * // Delete a few FindingHistories
     * const { count } = await prisma.findingHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FindingHistoryDeleteManyArgs>(args?: SelectSubset<T, FindingHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FindingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FindingHistories
     * const findingHistory = await prisma.findingHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FindingHistoryUpdateManyArgs>(args: SelectSubset<T, FindingHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FindingHistories and returns the data updated in the database.
     * @param {FindingHistoryUpdateManyAndReturnArgs} args - Arguments to update many FindingHistories.
     * @example
     * // Update many FindingHistories
     * const findingHistory = await prisma.findingHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FindingHistories and only return the `id`
     * const findingHistoryWithIdOnly = await prisma.findingHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FindingHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, FindingHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FindingHistory.
     * @param {FindingHistoryUpsertArgs} args - Arguments to update or create a FindingHistory.
     * @example
     * // Update or create a FindingHistory
     * const findingHistory = await prisma.findingHistory.upsert({
     *   create: {
     *     // ... data to create a FindingHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FindingHistory we want to update
     *   }
     * })
     */
    upsert<T extends FindingHistoryUpsertArgs>(args: SelectSubset<T, FindingHistoryUpsertArgs<ExtArgs>>): Prisma__FindingHistoryClient<$Result.GetResult<Prisma.$FindingHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FindingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryCountArgs} args - Arguments to filter FindingHistories to count.
     * @example
     * // Count the number of FindingHistories
     * const count = await prisma.findingHistory.count({
     *   where: {
     *     // ... the filter for the FindingHistories we want to count
     *   }
     * })
    **/
    count<T extends FindingHistoryCountArgs>(
      args?: Subset<T, FindingHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FindingHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FindingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FindingHistoryAggregateArgs>(args: Subset<T, FindingHistoryAggregateArgs>): Prisma.PrismaPromise<GetFindingHistoryAggregateType<T>>

    /**
     * Group by FindingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FindingHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FindingHistoryGroupByArgs['orderBy'] }
        : { orderBy?: FindingHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FindingHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFindingHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FindingHistory model
   */
  readonly fields: FindingHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FindingHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FindingHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends WeeklyReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WeeklyReportDefaultArgs<ExtArgs>>): Prisma__WeeklyReportClient<$Result.GetResult<Prisma.$WeeklyReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FindingHistory model
   */
  interface FindingHistoryFieldRefs {
    readonly id: FieldRef<"FindingHistory", 'String'>
    readonly reportId: FieldRef<"FindingHistory", 'String'>
    readonly updatedById: FieldRef<"FindingHistory", 'String'>
    readonly previousSolved: FieldRef<"FindingHistory", 'Int'>
    readonly newSolved: FieldRef<"FindingHistory", 'Int'>
    readonly previousPending: FieldRef<"FindingHistory", 'Int'>
    readonly newPending: FieldRef<"FindingHistory", 'Int'>
    readonly remark: FieldRef<"FindingHistory", 'String'>
    readonly createdAt: FieldRef<"FindingHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FindingHistory findUnique
   */
  export type FindingHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which FindingHistory to fetch.
     */
    where: FindingHistoryWhereUniqueInput
  }

  /**
   * FindingHistory findUniqueOrThrow
   */
  export type FindingHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which FindingHistory to fetch.
     */
    where: FindingHistoryWhereUniqueInput
  }

  /**
   * FindingHistory findFirst
   */
  export type FindingHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which FindingHistory to fetch.
     */
    where?: FindingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FindingHistories to fetch.
     */
    orderBy?: FindingHistoryOrderByWithRelationInput | FindingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FindingHistories.
     */
    cursor?: FindingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FindingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FindingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FindingHistories.
     */
    distinct?: FindingHistoryScalarFieldEnum | FindingHistoryScalarFieldEnum[]
  }

  /**
   * FindingHistory findFirstOrThrow
   */
  export type FindingHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which FindingHistory to fetch.
     */
    where?: FindingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FindingHistories to fetch.
     */
    orderBy?: FindingHistoryOrderByWithRelationInput | FindingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FindingHistories.
     */
    cursor?: FindingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FindingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FindingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FindingHistories.
     */
    distinct?: FindingHistoryScalarFieldEnum | FindingHistoryScalarFieldEnum[]
  }

  /**
   * FindingHistory findMany
   */
  export type FindingHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which FindingHistories to fetch.
     */
    where?: FindingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FindingHistories to fetch.
     */
    orderBy?: FindingHistoryOrderByWithRelationInput | FindingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FindingHistories.
     */
    cursor?: FindingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FindingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FindingHistories.
     */
    skip?: number
    distinct?: FindingHistoryScalarFieldEnum | FindingHistoryScalarFieldEnum[]
  }

  /**
   * FindingHistory create
   */
  export type FindingHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a FindingHistory.
     */
    data: XOR<FindingHistoryCreateInput, FindingHistoryUncheckedCreateInput>
  }

  /**
   * FindingHistory createMany
   */
  export type FindingHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FindingHistories.
     */
    data: FindingHistoryCreateManyInput | FindingHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FindingHistory createManyAndReturn
   */
  export type FindingHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many FindingHistories.
     */
    data: FindingHistoryCreateManyInput | FindingHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FindingHistory update
   */
  export type FindingHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a FindingHistory.
     */
    data: XOR<FindingHistoryUpdateInput, FindingHistoryUncheckedUpdateInput>
    /**
     * Choose, which FindingHistory to update.
     */
    where: FindingHistoryWhereUniqueInput
  }

  /**
   * FindingHistory updateMany
   */
  export type FindingHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FindingHistories.
     */
    data: XOR<FindingHistoryUpdateManyMutationInput, FindingHistoryUncheckedUpdateManyInput>
    /**
     * Filter which FindingHistories to update
     */
    where?: FindingHistoryWhereInput
    /**
     * Limit how many FindingHistories to update.
     */
    limit?: number
  }

  /**
   * FindingHistory updateManyAndReturn
   */
  export type FindingHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * The data used to update FindingHistories.
     */
    data: XOR<FindingHistoryUpdateManyMutationInput, FindingHistoryUncheckedUpdateManyInput>
    /**
     * Filter which FindingHistories to update
     */
    where?: FindingHistoryWhereInput
    /**
     * Limit how many FindingHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FindingHistory upsert
   */
  export type FindingHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the FindingHistory to update in case it exists.
     */
    where: FindingHistoryWhereUniqueInput
    /**
     * In case the FindingHistory found by the `where` argument doesn't exist, create a new FindingHistory with this data.
     */
    create: XOR<FindingHistoryCreateInput, FindingHistoryUncheckedCreateInput>
    /**
     * In case the FindingHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FindingHistoryUpdateInput, FindingHistoryUncheckedUpdateInput>
  }

  /**
   * FindingHistory delete
   */
  export type FindingHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
    /**
     * Filter which FindingHistory to delete.
     */
    where: FindingHistoryWhereUniqueInput
  }

  /**
   * FindingHistory deleteMany
   */
  export type FindingHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FindingHistories to delete
     */
    where?: FindingHistoryWhereInput
    /**
     * Limit how many FindingHistories to delete.
     */
    limit?: number
  }

  /**
   * FindingHistory without action
   */
  export type FindingHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FindingHistory
     */
    select?: FindingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FindingHistory
     */
    omit?: FindingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingHistoryInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyTarget
   */

  export type AggregateMonthlyTarget = {
    _count: MonthlyTargetCountAggregateOutputType | null
    _avg: MonthlyTargetAvgAggregateOutputType | null
    _sum: MonthlyTargetSumAggregateOutputType | null
    _min: MonthlyTargetMinAggregateOutputType | null
    _max: MonthlyTargetMaxAggregateOutputType | null
  }

  export type MonthlyTargetAvgAggregateOutputType = {
    year: number | null
    month: number | null
    locTarget: number | null
    messVisitTarget: number | null
    dressCodeTarget: number | null
  }

  export type MonthlyTargetSumAggregateOutputType = {
    year: number | null
    month: number | null
    locTarget: number | null
    messVisitTarget: number | null
    dressCodeTarget: number | null
  }

  export type MonthlyTargetMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    monthYear: string | null
    locTarget: number | null
    messVisitTarget: number | null
    dressCodeTarget: number | null
    isLocked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyTargetMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    monthYear: string | null
    locTarget: number | null
    messVisitTarget: number | null
    dressCodeTarget: number | null
    isLocked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyTargetCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    month: number
    monthYear: number
    locTarget: number
    messVisitTarget: number
    dressCodeTarget: number
    isLocked: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MonthlyTargetAvgAggregateInputType = {
    year?: true
    month?: true
    locTarget?: true
    messVisitTarget?: true
    dressCodeTarget?: true
  }

  export type MonthlyTargetSumAggregateInputType = {
    year?: true
    month?: true
    locTarget?: true
    messVisitTarget?: true
    dressCodeTarget?: true
  }

  export type MonthlyTargetMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    monthYear?: true
    locTarget?: true
    messVisitTarget?: true
    dressCodeTarget?: true
    isLocked?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyTargetMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    monthYear?: true
    locTarget?: true
    messVisitTarget?: true
    dressCodeTarget?: true
    isLocked?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyTargetCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    monthYear?: true
    locTarget?: true
    messVisitTarget?: true
    dressCodeTarget?: true
    isLocked?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MonthlyTargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyTarget to aggregate.
     */
    where?: MonthlyTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTargets to fetch.
     */
    orderBy?: MonthlyTargetOrderByWithRelationInput | MonthlyTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyTargets
    **/
    _count?: true | MonthlyTargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyTargetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyTargetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyTargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyTargetMaxAggregateInputType
  }

  export type GetMonthlyTargetAggregateType<T extends MonthlyTargetAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyTarget[P]>
      : GetScalarType<T[P], AggregateMonthlyTarget[P]>
  }




  export type MonthlyTargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyTargetWhereInput
    orderBy?: MonthlyTargetOrderByWithAggregationInput | MonthlyTargetOrderByWithAggregationInput[]
    by: MonthlyTargetScalarFieldEnum[] | MonthlyTargetScalarFieldEnum
    having?: MonthlyTargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyTargetCountAggregateInputType | true
    _avg?: MonthlyTargetAvgAggregateInputType
    _sum?: MonthlyTargetSumAggregateInputType
    _min?: MonthlyTargetMinAggregateInputType
    _max?: MonthlyTargetMaxAggregateInputType
  }

  export type MonthlyTargetGroupByOutputType = {
    id: string
    userId: string
    year: number
    month: number
    monthYear: string
    locTarget: number
    messVisitTarget: number
    dressCodeTarget: number
    isLocked: boolean
    createdAt: Date
    updatedAt: Date
    _count: MonthlyTargetCountAggregateOutputType | null
    _avg: MonthlyTargetAvgAggregateOutputType | null
    _sum: MonthlyTargetSumAggregateOutputType | null
    _min: MonthlyTargetMinAggregateOutputType | null
    _max: MonthlyTargetMaxAggregateOutputType | null
  }

  type GetMonthlyTargetGroupByPayload<T extends MonthlyTargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyTargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyTargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyTargetGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyTargetGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyTargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    monthYear?: boolean
    locTarget?: boolean
    messVisitTarget?: boolean
    dressCodeTarget?: boolean
    isLocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyTarget"]>

  export type MonthlyTargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    monthYear?: boolean
    locTarget?: boolean
    messVisitTarget?: boolean
    dressCodeTarget?: boolean
    isLocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyTarget"]>

  export type MonthlyTargetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    monthYear?: boolean
    locTarget?: boolean
    messVisitTarget?: boolean
    dressCodeTarget?: boolean
    isLocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyTarget"]>

  export type MonthlyTargetSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    monthYear?: boolean
    locTarget?: boolean
    messVisitTarget?: boolean
    dressCodeTarget?: boolean
    isLocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MonthlyTargetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "month" | "monthYear" | "locTarget" | "messVisitTarget" | "dressCodeTarget" | "isLocked" | "createdAt" | "updatedAt", ExtArgs["result"]["monthlyTarget"]>
  export type MonthlyTargetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MonthlyTargetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MonthlyTargetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MonthlyTargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyTarget"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      month: number
      monthYear: string
      locTarget: number
      messVisitTarget: number
      dressCodeTarget: number
      isLocked: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["monthlyTarget"]>
    composites: {}
  }

  type MonthlyTargetGetPayload<S extends boolean | null | undefined | MonthlyTargetDefaultArgs> = $Result.GetResult<Prisma.$MonthlyTargetPayload, S>

  type MonthlyTargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyTargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyTargetCountAggregateInputType | true
    }

  export interface MonthlyTargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyTarget'], meta: { name: 'MonthlyTarget' } }
    /**
     * Find zero or one MonthlyTarget that matches the filter.
     * @param {MonthlyTargetFindUniqueArgs} args - Arguments to find a MonthlyTarget
     * @example
     * // Get one MonthlyTarget
     * const monthlyTarget = await prisma.monthlyTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyTargetFindUniqueArgs>(args: SelectSubset<T, MonthlyTargetFindUniqueArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyTarget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyTargetFindUniqueOrThrowArgs} args - Arguments to find a MonthlyTarget
     * @example
     * // Get one MonthlyTarget
     * const monthlyTarget = await prisma.monthlyTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyTargetFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyTargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetFindFirstArgs} args - Arguments to find a MonthlyTarget
     * @example
     * // Get one MonthlyTarget
     * const monthlyTarget = await prisma.monthlyTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyTargetFindFirstArgs>(args?: SelectSubset<T, MonthlyTargetFindFirstArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetFindFirstOrThrowArgs} args - Arguments to find a MonthlyTarget
     * @example
     * // Get one MonthlyTarget
     * const monthlyTarget = await prisma.monthlyTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyTargetFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyTargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyTargets
     * const monthlyTargets = await prisma.monthlyTarget.findMany()
     * 
     * // Get first 10 MonthlyTargets
     * const monthlyTargets = await prisma.monthlyTarget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyTargetWithIdOnly = await prisma.monthlyTarget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyTargetFindManyArgs>(args?: SelectSubset<T, MonthlyTargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyTarget.
     * @param {MonthlyTargetCreateArgs} args - Arguments to create a MonthlyTarget.
     * @example
     * // Create one MonthlyTarget
     * const MonthlyTarget = await prisma.monthlyTarget.create({
     *   data: {
     *     // ... data to create a MonthlyTarget
     *   }
     * })
     * 
     */
    create<T extends MonthlyTargetCreateArgs>(args: SelectSubset<T, MonthlyTargetCreateArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyTargets.
     * @param {MonthlyTargetCreateManyArgs} args - Arguments to create many MonthlyTargets.
     * @example
     * // Create many MonthlyTargets
     * const monthlyTarget = await prisma.monthlyTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyTargetCreateManyArgs>(args?: SelectSubset<T, MonthlyTargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyTargets and returns the data saved in the database.
     * @param {MonthlyTargetCreateManyAndReturnArgs} args - Arguments to create many MonthlyTargets.
     * @example
     * // Create many MonthlyTargets
     * const monthlyTarget = await prisma.monthlyTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyTargets and only return the `id`
     * const monthlyTargetWithIdOnly = await prisma.monthlyTarget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyTargetCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyTargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyTarget.
     * @param {MonthlyTargetDeleteArgs} args - Arguments to delete one MonthlyTarget.
     * @example
     * // Delete one MonthlyTarget
     * const MonthlyTarget = await prisma.monthlyTarget.delete({
     *   where: {
     *     // ... filter to delete one MonthlyTarget
     *   }
     * })
     * 
     */
    delete<T extends MonthlyTargetDeleteArgs>(args: SelectSubset<T, MonthlyTargetDeleteArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyTarget.
     * @param {MonthlyTargetUpdateArgs} args - Arguments to update one MonthlyTarget.
     * @example
     * // Update one MonthlyTarget
     * const monthlyTarget = await prisma.monthlyTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyTargetUpdateArgs>(args: SelectSubset<T, MonthlyTargetUpdateArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyTargets.
     * @param {MonthlyTargetDeleteManyArgs} args - Arguments to filter MonthlyTargets to delete.
     * @example
     * // Delete a few MonthlyTargets
     * const { count } = await prisma.monthlyTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyTargetDeleteManyArgs>(args?: SelectSubset<T, MonthlyTargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyTargets
     * const monthlyTarget = await prisma.monthlyTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyTargetUpdateManyArgs>(args: SelectSubset<T, MonthlyTargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyTargets and returns the data updated in the database.
     * @param {MonthlyTargetUpdateManyAndReturnArgs} args - Arguments to update many MonthlyTargets.
     * @example
     * // Update many MonthlyTargets
     * const monthlyTarget = await prisma.monthlyTarget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyTargets and only return the `id`
     * const monthlyTargetWithIdOnly = await prisma.monthlyTarget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyTargetUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyTargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyTarget.
     * @param {MonthlyTargetUpsertArgs} args - Arguments to update or create a MonthlyTarget.
     * @example
     * // Update or create a MonthlyTarget
     * const monthlyTarget = await prisma.monthlyTarget.upsert({
     *   create: {
     *     // ... data to create a MonthlyTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyTarget we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyTargetUpsertArgs>(args: SelectSubset<T, MonthlyTargetUpsertArgs<ExtArgs>>): Prisma__MonthlyTargetClient<$Result.GetResult<Prisma.$MonthlyTargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetCountArgs} args - Arguments to filter MonthlyTargets to count.
     * @example
     * // Count the number of MonthlyTargets
     * const count = await prisma.monthlyTarget.count({
     *   where: {
     *     // ... the filter for the MonthlyTargets we want to count
     *   }
     * })
    **/
    count<T extends MonthlyTargetCountArgs>(
      args?: Subset<T, MonthlyTargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyTargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyTargetAggregateArgs>(args: Subset<T, MonthlyTargetAggregateArgs>): Prisma.PrismaPromise<GetMonthlyTargetAggregateType<T>>

    /**
     * Group by MonthlyTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyTargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyTargetGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyTargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyTargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyTarget model
   */
  readonly fields: MonthlyTargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyTarget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyTargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyTarget model
   */
  interface MonthlyTargetFieldRefs {
    readonly id: FieldRef<"MonthlyTarget", 'String'>
    readonly userId: FieldRef<"MonthlyTarget", 'String'>
    readonly year: FieldRef<"MonthlyTarget", 'Int'>
    readonly month: FieldRef<"MonthlyTarget", 'Int'>
    readonly monthYear: FieldRef<"MonthlyTarget", 'String'>
    readonly locTarget: FieldRef<"MonthlyTarget", 'Int'>
    readonly messVisitTarget: FieldRef<"MonthlyTarget", 'Int'>
    readonly dressCodeTarget: FieldRef<"MonthlyTarget", 'Int'>
    readonly isLocked: FieldRef<"MonthlyTarget", 'Boolean'>
    readonly createdAt: FieldRef<"MonthlyTarget", 'DateTime'>
    readonly updatedAt: FieldRef<"MonthlyTarget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyTarget findUnique
   */
  export type MonthlyTargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyTarget to fetch.
     */
    where: MonthlyTargetWhereUniqueInput
  }

  /**
   * MonthlyTarget findUniqueOrThrow
   */
  export type MonthlyTargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyTarget to fetch.
     */
    where: MonthlyTargetWhereUniqueInput
  }

  /**
   * MonthlyTarget findFirst
   */
  export type MonthlyTargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyTarget to fetch.
     */
    where?: MonthlyTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTargets to fetch.
     */
    orderBy?: MonthlyTargetOrderByWithRelationInput | MonthlyTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyTargets.
     */
    cursor?: MonthlyTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyTargets.
     */
    distinct?: MonthlyTargetScalarFieldEnum | MonthlyTargetScalarFieldEnum[]
  }

  /**
   * MonthlyTarget findFirstOrThrow
   */
  export type MonthlyTargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyTarget to fetch.
     */
    where?: MonthlyTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTargets to fetch.
     */
    orderBy?: MonthlyTargetOrderByWithRelationInput | MonthlyTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyTargets.
     */
    cursor?: MonthlyTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyTargets.
     */
    distinct?: MonthlyTargetScalarFieldEnum | MonthlyTargetScalarFieldEnum[]
  }

  /**
   * MonthlyTarget findMany
   */
  export type MonthlyTargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyTargets to fetch.
     */
    where?: MonthlyTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTargets to fetch.
     */
    orderBy?: MonthlyTargetOrderByWithRelationInput | MonthlyTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyTargets.
     */
    cursor?: MonthlyTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTargets.
     */
    skip?: number
    distinct?: MonthlyTargetScalarFieldEnum | MonthlyTargetScalarFieldEnum[]
  }

  /**
   * MonthlyTarget create
   */
  export type MonthlyTargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyTarget.
     */
    data: XOR<MonthlyTargetCreateInput, MonthlyTargetUncheckedCreateInput>
  }

  /**
   * MonthlyTarget createMany
   */
  export type MonthlyTargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyTargets.
     */
    data: MonthlyTargetCreateManyInput | MonthlyTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyTarget createManyAndReturn
   */
  export type MonthlyTargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyTargets.
     */
    data: MonthlyTargetCreateManyInput | MonthlyTargetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyTarget update
   */
  export type MonthlyTargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyTarget.
     */
    data: XOR<MonthlyTargetUpdateInput, MonthlyTargetUncheckedUpdateInput>
    /**
     * Choose, which MonthlyTarget to update.
     */
    where: MonthlyTargetWhereUniqueInput
  }

  /**
   * MonthlyTarget updateMany
   */
  export type MonthlyTargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyTargets.
     */
    data: XOR<MonthlyTargetUpdateManyMutationInput, MonthlyTargetUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyTargets to update
     */
    where?: MonthlyTargetWhereInput
    /**
     * Limit how many MonthlyTargets to update.
     */
    limit?: number
  }

  /**
   * MonthlyTarget updateManyAndReturn
   */
  export type MonthlyTargetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyTargets.
     */
    data: XOR<MonthlyTargetUpdateManyMutationInput, MonthlyTargetUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyTargets to update
     */
    where?: MonthlyTargetWhereInput
    /**
     * Limit how many MonthlyTargets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyTarget upsert
   */
  export type MonthlyTargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyTarget to update in case it exists.
     */
    where: MonthlyTargetWhereUniqueInput
    /**
     * In case the MonthlyTarget found by the `where` argument doesn't exist, create a new MonthlyTarget with this data.
     */
    create: XOR<MonthlyTargetCreateInput, MonthlyTargetUncheckedCreateInput>
    /**
     * In case the MonthlyTarget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyTargetUpdateInput, MonthlyTargetUncheckedUpdateInput>
  }

  /**
   * MonthlyTarget delete
   */
  export type MonthlyTargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
    /**
     * Filter which MonthlyTarget to delete.
     */
    where: MonthlyTargetWhereUniqueInput
  }

  /**
   * MonthlyTarget deleteMany
   */
  export type MonthlyTargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyTargets to delete
     */
    where?: MonthlyTargetWhereInput
    /**
     * Limit how many MonthlyTargets to delete.
     */
    limit?: number
  }

  /**
   * MonthlyTarget without action
   */
  export type MonthlyTargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTarget
     */
    select?: MonthlyTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTarget
     */
    omit?: MonthlyTargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyTargetInclude<ExtArgs> | null
  }


  /**
   * Model EmailNotificationConfig
   */

  export type AggregateEmailNotificationConfig = {
    _count: EmailNotificationConfigCountAggregateOutputType | null
    _min: EmailNotificationConfigMinAggregateOutputType | null
    _max: EmailNotificationConfigMaxAggregateOutputType | null
  }

  export type EmailNotificationConfigMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    subjectTemplate: string | null
    bodyTemplate: string | null
    ccRecipients: string | null
    bccRecipients: string | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type EmailNotificationConfigMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    subjectTemplate: string | null
    bodyTemplate: string | null
    ccRecipients: string | null
    bccRecipients: string | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type EmailNotificationConfigCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    subjectTemplate: number
    bodyTemplate: number
    ccRecipients: number
    bccRecipients: number
    isActive: number
    updatedAt: number
    _all: number
  }


  export type EmailNotificationConfigMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    subjectTemplate?: true
    bodyTemplate?: true
    ccRecipients?: true
    bccRecipients?: true
    isActive?: true
    updatedAt?: true
  }

  export type EmailNotificationConfigMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    subjectTemplate?: true
    bodyTemplate?: true
    ccRecipients?: true
    bccRecipients?: true
    isActive?: true
    updatedAt?: true
  }

  export type EmailNotificationConfigCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    subjectTemplate?: true
    bodyTemplate?: true
    ccRecipients?: true
    bccRecipients?: true
    isActive?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailNotificationConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailNotificationConfig to aggregate.
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationConfigs to fetch.
     */
    orderBy?: EmailNotificationConfigOrderByWithRelationInput | EmailNotificationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailNotificationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailNotificationConfigs
    **/
    _count?: true | EmailNotificationConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailNotificationConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailNotificationConfigMaxAggregateInputType
  }

  export type GetEmailNotificationConfigAggregateType<T extends EmailNotificationConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailNotificationConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailNotificationConfig[P]>
      : GetScalarType<T[P], AggregateEmailNotificationConfig[P]>
  }




  export type EmailNotificationConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailNotificationConfigWhereInput
    orderBy?: EmailNotificationConfigOrderByWithAggregationInput | EmailNotificationConfigOrderByWithAggregationInput[]
    by: EmailNotificationConfigScalarFieldEnum[] | EmailNotificationConfigScalarFieldEnum
    having?: EmailNotificationConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailNotificationConfigCountAggregateInputType | true
    _min?: EmailNotificationConfigMinAggregateInputType
    _max?: EmailNotificationConfigMaxAggregateInputType
  }

  export type EmailNotificationConfigGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    subjectTemplate: string
    bodyTemplate: string
    ccRecipients: string
    bccRecipients: string | null
    isActive: boolean
    updatedAt: Date
    _count: EmailNotificationConfigCountAggregateOutputType | null
    _min: EmailNotificationConfigMinAggregateOutputType | null
    _max: EmailNotificationConfigMaxAggregateOutputType | null
  }

  type GetEmailNotificationConfigGroupByPayload<T extends EmailNotificationConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailNotificationConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailNotificationConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailNotificationConfigGroupByOutputType[P]>
            : GetScalarType<T[P], EmailNotificationConfigGroupByOutputType[P]>
        }
      >
    >


  export type EmailNotificationConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    subjectTemplate?: boolean
    bodyTemplate?: boolean
    ccRecipients?: boolean
    bccRecipients?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailNotificationConfig"]>

  export type EmailNotificationConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    subjectTemplate?: boolean
    bodyTemplate?: boolean
    ccRecipients?: boolean
    bccRecipients?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailNotificationConfig"]>

  export type EmailNotificationConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    subjectTemplate?: boolean
    bodyTemplate?: boolean
    ccRecipients?: boolean
    bccRecipients?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailNotificationConfig"]>

  export type EmailNotificationConfigSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    subjectTemplate?: boolean
    bodyTemplate?: boolean
    ccRecipients?: boolean
    bccRecipients?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }

  export type EmailNotificationConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "subjectTemplate" | "bodyTemplate" | "ccRecipients" | "bccRecipients" | "isActive" | "updatedAt", ExtArgs["result"]["emailNotificationConfig"]>

  export type $EmailNotificationConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailNotificationConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      subjectTemplate: string
      bodyTemplate: string
      ccRecipients: string
      bccRecipients: string | null
      isActive: boolean
      updatedAt: Date
    }, ExtArgs["result"]["emailNotificationConfig"]>
    composites: {}
  }

  type EmailNotificationConfigGetPayload<S extends boolean | null | undefined | EmailNotificationConfigDefaultArgs> = $Result.GetResult<Prisma.$EmailNotificationConfigPayload, S>

  type EmailNotificationConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailNotificationConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailNotificationConfigCountAggregateInputType | true
    }

  export interface EmailNotificationConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailNotificationConfig'], meta: { name: 'EmailNotificationConfig' } }
    /**
     * Find zero or one EmailNotificationConfig that matches the filter.
     * @param {EmailNotificationConfigFindUniqueArgs} args - Arguments to find a EmailNotificationConfig
     * @example
     * // Get one EmailNotificationConfig
     * const emailNotificationConfig = await prisma.emailNotificationConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailNotificationConfigFindUniqueArgs>(args: SelectSubset<T, EmailNotificationConfigFindUniqueArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailNotificationConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailNotificationConfigFindUniqueOrThrowArgs} args - Arguments to find a EmailNotificationConfig
     * @example
     * // Get one EmailNotificationConfig
     * const emailNotificationConfig = await prisma.emailNotificationConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailNotificationConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailNotificationConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailNotificationConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigFindFirstArgs} args - Arguments to find a EmailNotificationConfig
     * @example
     * // Get one EmailNotificationConfig
     * const emailNotificationConfig = await prisma.emailNotificationConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailNotificationConfigFindFirstArgs>(args?: SelectSubset<T, EmailNotificationConfigFindFirstArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailNotificationConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigFindFirstOrThrowArgs} args - Arguments to find a EmailNotificationConfig
     * @example
     * // Get one EmailNotificationConfig
     * const emailNotificationConfig = await prisma.emailNotificationConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailNotificationConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailNotificationConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailNotificationConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailNotificationConfigs
     * const emailNotificationConfigs = await prisma.emailNotificationConfig.findMany()
     * 
     * // Get first 10 EmailNotificationConfigs
     * const emailNotificationConfigs = await prisma.emailNotificationConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailNotificationConfigWithIdOnly = await prisma.emailNotificationConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailNotificationConfigFindManyArgs>(args?: SelectSubset<T, EmailNotificationConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailNotificationConfig.
     * @param {EmailNotificationConfigCreateArgs} args - Arguments to create a EmailNotificationConfig.
     * @example
     * // Create one EmailNotificationConfig
     * const EmailNotificationConfig = await prisma.emailNotificationConfig.create({
     *   data: {
     *     // ... data to create a EmailNotificationConfig
     *   }
     * })
     * 
     */
    create<T extends EmailNotificationConfigCreateArgs>(args: SelectSubset<T, EmailNotificationConfigCreateArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailNotificationConfigs.
     * @param {EmailNotificationConfigCreateManyArgs} args - Arguments to create many EmailNotificationConfigs.
     * @example
     * // Create many EmailNotificationConfigs
     * const emailNotificationConfig = await prisma.emailNotificationConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailNotificationConfigCreateManyArgs>(args?: SelectSubset<T, EmailNotificationConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailNotificationConfigs and returns the data saved in the database.
     * @param {EmailNotificationConfigCreateManyAndReturnArgs} args - Arguments to create many EmailNotificationConfigs.
     * @example
     * // Create many EmailNotificationConfigs
     * const emailNotificationConfig = await prisma.emailNotificationConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailNotificationConfigs and only return the `id`
     * const emailNotificationConfigWithIdOnly = await prisma.emailNotificationConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailNotificationConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailNotificationConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailNotificationConfig.
     * @param {EmailNotificationConfigDeleteArgs} args - Arguments to delete one EmailNotificationConfig.
     * @example
     * // Delete one EmailNotificationConfig
     * const EmailNotificationConfig = await prisma.emailNotificationConfig.delete({
     *   where: {
     *     // ... filter to delete one EmailNotificationConfig
     *   }
     * })
     * 
     */
    delete<T extends EmailNotificationConfigDeleteArgs>(args: SelectSubset<T, EmailNotificationConfigDeleteArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailNotificationConfig.
     * @param {EmailNotificationConfigUpdateArgs} args - Arguments to update one EmailNotificationConfig.
     * @example
     * // Update one EmailNotificationConfig
     * const emailNotificationConfig = await prisma.emailNotificationConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailNotificationConfigUpdateArgs>(args: SelectSubset<T, EmailNotificationConfigUpdateArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailNotificationConfigs.
     * @param {EmailNotificationConfigDeleteManyArgs} args - Arguments to filter EmailNotificationConfigs to delete.
     * @example
     * // Delete a few EmailNotificationConfigs
     * const { count } = await prisma.emailNotificationConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailNotificationConfigDeleteManyArgs>(args?: SelectSubset<T, EmailNotificationConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailNotificationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailNotificationConfigs
     * const emailNotificationConfig = await prisma.emailNotificationConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailNotificationConfigUpdateManyArgs>(args: SelectSubset<T, EmailNotificationConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailNotificationConfigs and returns the data updated in the database.
     * @param {EmailNotificationConfigUpdateManyAndReturnArgs} args - Arguments to update many EmailNotificationConfigs.
     * @example
     * // Update many EmailNotificationConfigs
     * const emailNotificationConfig = await prisma.emailNotificationConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailNotificationConfigs and only return the `id`
     * const emailNotificationConfigWithIdOnly = await prisma.emailNotificationConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailNotificationConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailNotificationConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailNotificationConfig.
     * @param {EmailNotificationConfigUpsertArgs} args - Arguments to update or create a EmailNotificationConfig.
     * @example
     * // Update or create a EmailNotificationConfig
     * const emailNotificationConfig = await prisma.emailNotificationConfig.upsert({
     *   create: {
     *     // ... data to create a EmailNotificationConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailNotificationConfig we want to update
     *   }
     * })
     */
    upsert<T extends EmailNotificationConfigUpsertArgs>(args: SelectSubset<T, EmailNotificationConfigUpsertArgs<ExtArgs>>): Prisma__EmailNotificationConfigClient<$Result.GetResult<Prisma.$EmailNotificationConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailNotificationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigCountArgs} args - Arguments to filter EmailNotificationConfigs to count.
     * @example
     * // Count the number of EmailNotificationConfigs
     * const count = await prisma.emailNotificationConfig.count({
     *   where: {
     *     // ... the filter for the EmailNotificationConfigs we want to count
     *   }
     * })
    **/
    count<T extends EmailNotificationConfigCountArgs>(
      args?: Subset<T, EmailNotificationConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailNotificationConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailNotificationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailNotificationConfigAggregateArgs>(args: Subset<T, EmailNotificationConfigAggregateArgs>): Prisma.PrismaPromise<GetEmailNotificationConfigAggregateType<T>>

    /**
     * Group by EmailNotificationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailNotificationConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailNotificationConfigGroupByArgs['orderBy'] }
        : { orderBy?: EmailNotificationConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailNotificationConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailNotificationConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailNotificationConfig model
   */
  readonly fields: EmailNotificationConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailNotificationConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailNotificationConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailNotificationConfig model
   */
  interface EmailNotificationConfigFieldRefs {
    readonly id: FieldRef<"EmailNotificationConfig", 'String'>
    readonly code: FieldRef<"EmailNotificationConfig", 'String'>
    readonly name: FieldRef<"EmailNotificationConfig", 'String'>
    readonly description: FieldRef<"EmailNotificationConfig", 'String'>
    readonly subjectTemplate: FieldRef<"EmailNotificationConfig", 'String'>
    readonly bodyTemplate: FieldRef<"EmailNotificationConfig", 'String'>
    readonly ccRecipients: FieldRef<"EmailNotificationConfig", 'String'>
    readonly bccRecipients: FieldRef<"EmailNotificationConfig", 'String'>
    readonly isActive: FieldRef<"EmailNotificationConfig", 'Boolean'>
    readonly updatedAt: FieldRef<"EmailNotificationConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailNotificationConfig findUnique
   */
  export type EmailNotificationConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailNotificationConfig to fetch.
     */
    where: EmailNotificationConfigWhereUniqueInput
  }

  /**
   * EmailNotificationConfig findUniqueOrThrow
   */
  export type EmailNotificationConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailNotificationConfig to fetch.
     */
    where: EmailNotificationConfigWhereUniqueInput
  }

  /**
   * EmailNotificationConfig findFirst
   */
  export type EmailNotificationConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailNotificationConfig to fetch.
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationConfigs to fetch.
     */
    orderBy?: EmailNotificationConfigOrderByWithRelationInput | EmailNotificationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailNotificationConfigs.
     */
    cursor?: EmailNotificationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailNotificationConfigs.
     */
    distinct?: EmailNotificationConfigScalarFieldEnum | EmailNotificationConfigScalarFieldEnum[]
  }

  /**
   * EmailNotificationConfig findFirstOrThrow
   */
  export type EmailNotificationConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailNotificationConfig to fetch.
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationConfigs to fetch.
     */
    orderBy?: EmailNotificationConfigOrderByWithRelationInput | EmailNotificationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailNotificationConfigs.
     */
    cursor?: EmailNotificationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailNotificationConfigs.
     */
    distinct?: EmailNotificationConfigScalarFieldEnum | EmailNotificationConfigScalarFieldEnum[]
  }

  /**
   * EmailNotificationConfig findMany
   */
  export type EmailNotificationConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailNotificationConfigs to fetch.
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationConfigs to fetch.
     */
    orderBy?: EmailNotificationConfigOrderByWithRelationInput | EmailNotificationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailNotificationConfigs.
     */
    cursor?: EmailNotificationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationConfigs.
     */
    skip?: number
    distinct?: EmailNotificationConfigScalarFieldEnum | EmailNotificationConfigScalarFieldEnum[]
  }

  /**
   * EmailNotificationConfig create
   */
  export type EmailNotificationConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailNotificationConfig.
     */
    data: XOR<EmailNotificationConfigCreateInput, EmailNotificationConfigUncheckedCreateInput>
  }

  /**
   * EmailNotificationConfig createMany
   */
  export type EmailNotificationConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailNotificationConfigs.
     */
    data: EmailNotificationConfigCreateManyInput | EmailNotificationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailNotificationConfig createManyAndReturn
   */
  export type EmailNotificationConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * The data used to create many EmailNotificationConfigs.
     */
    data: EmailNotificationConfigCreateManyInput | EmailNotificationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailNotificationConfig update
   */
  export type EmailNotificationConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailNotificationConfig.
     */
    data: XOR<EmailNotificationConfigUpdateInput, EmailNotificationConfigUncheckedUpdateInput>
    /**
     * Choose, which EmailNotificationConfig to update.
     */
    where: EmailNotificationConfigWhereUniqueInput
  }

  /**
   * EmailNotificationConfig updateMany
   */
  export type EmailNotificationConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailNotificationConfigs.
     */
    data: XOR<EmailNotificationConfigUpdateManyMutationInput, EmailNotificationConfigUncheckedUpdateManyInput>
    /**
     * Filter which EmailNotificationConfigs to update
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * Limit how many EmailNotificationConfigs to update.
     */
    limit?: number
  }

  /**
   * EmailNotificationConfig updateManyAndReturn
   */
  export type EmailNotificationConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * The data used to update EmailNotificationConfigs.
     */
    data: XOR<EmailNotificationConfigUpdateManyMutationInput, EmailNotificationConfigUncheckedUpdateManyInput>
    /**
     * Filter which EmailNotificationConfigs to update
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * Limit how many EmailNotificationConfigs to update.
     */
    limit?: number
  }

  /**
   * EmailNotificationConfig upsert
   */
  export type EmailNotificationConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailNotificationConfig to update in case it exists.
     */
    where: EmailNotificationConfigWhereUniqueInput
    /**
     * In case the EmailNotificationConfig found by the `where` argument doesn't exist, create a new EmailNotificationConfig with this data.
     */
    create: XOR<EmailNotificationConfigCreateInput, EmailNotificationConfigUncheckedCreateInput>
    /**
     * In case the EmailNotificationConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailNotificationConfigUpdateInput, EmailNotificationConfigUncheckedUpdateInput>
  }

  /**
   * EmailNotificationConfig delete
   */
  export type EmailNotificationConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
    /**
     * Filter which EmailNotificationConfig to delete.
     */
    where: EmailNotificationConfigWhereUniqueInput
  }

  /**
   * EmailNotificationConfig deleteMany
   */
  export type EmailNotificationConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailNotificationConfigs to delete
     */
    where?: EmailNotificationConfigWhereInput
    /**
     * Limit how many EmailNotificationConfigs to delete.
     */
    limit?: number
  }

  /**
   * EmailNotificationConfig without action
   */
  export type EmailNotificationConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationConfig
     */
    select?: EmailNotificationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationConfig
     */
    omit?: EmailNotificationConfigOmit<ExtArgs> | null
  }


  /**
   * Model EmailNotificationLog
   */

  export type AggregateEmailNotificationLog = {
    _count: EmailNotificationLogCountAggregateOutputType | null
    _avg: EmailNotificationLogAvgAggregateOutputType | null
    _sum: EmailNotificationLogSumAggregateOutputType | null
    _min: EmailNotificationLogMinAggregateOutputType | null
    _max: EmailNotificationLogMaxAggregateOutputType | null
  }

  export type EmailNotificationLogAvgAggregateOutputType = {
    year: number | null
    month: number | null
    week: number | null
  }

  export type EmailNotificationLogSumAggregateOutputType = {
    year: number | null
    month: number | null
    week: number | null
  }

  export type EmailNotificationLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    week: number | null
    emailType: string | null
    toEmail: string | null
    ccEmails: string | null
    subject: string | null
    status: string | null
    sentAt: Date | null
    errorMessage: string | null
  }

  export type EmailNotificationLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    week: number | null
    emailType: string | null
    toEmail: string | null
    ccEmails: string | null
    subject: string | null
    status: string | null
    sentAt: Date | null
    errorMessage: string | null
  }

  export type EmailNotificationLogCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    month: number
    week: number
    emailType: number
    toEmail: number
    ccEmails: number
    subject: number
    status: number
    sentAt: number
    errorMessage: number
    _all: number
  }


  export type EmailNotificationLogAvgAggregateInputType = {
    year?: true
    month?: true
    week?: true
  }

  export type EmailNotificationLogSumAggregateInputType = {
    year?: true
    month?: true
    week?: true
  }

  export type EmailNotificationLogMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    week?: true
    emailType?: true
    toEmail?: true
    ccEmails?: true
    subject?: true
    status?: true
    sentAt?: true
    errorMessage?: true
  }

  export type EmailNotificationLogMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    week?: true
    emailType?: true
    toEmail?: true
    ccEmails?: true
    subject?: true
    status?: true
    sentAt?: true
    errorMessage?: true
  }

  export type EmailNotificationLogCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    week?: true
    emailType?: true
    toEmail?: true
    ccEmails?: true
    subject?: true
    status?: true
    sentAt?: true
    errorMessage?: true
    _all?: true
  }

  export type EmailNotificationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailNotificationLog to aggregate.
     */
    where?: EmailNotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationLogs to fetch.
     */
    orderBy?: EmailNotificationLogOrderByWithRelationInput | EmailNotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailNotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailNotificationLogs
    **/
    _count?: true | EmailNotificationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailNotificationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailNotificationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailNotificationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailNotificationLogMaxAggregateInputType
  }

  export type GetEmailNotificationLogAggregateType<T extends EmailNotificationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailNotificationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailNotificationLog[P]>
      : GetScalarType<T[P], AggregateEmailNotificationLog[P]>
  }




  export type EmailNotificationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailNotificationLogWhereInput
    orderBy?: EmailNotificationLogOrderByWithAggregationInput | EmailNotificationLogOrderByWithAggregationInput[]
    by: EmailNotificationLogScalarFieldEnum[] | EmailNotificationLogScalarFieldEnum
    having?: EmailNotificationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailNotificationLogCountAggregateInputType | true
    _avg?: EmailNotificationLogAvgAggregateInputType
    _sum?: EmailNotificationLogSumAggregateInputType
    _min?: EmailNotificationLogMinAggregateInputType
    _max?: EmailNotificationLogMaxAggregateInputType
  }

  export type EmailNotificationLogGroupByOutputType = {
    id: string
    userId: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails: string | null
    subject: string
    status: string
    sentAt: Date
    errorMessage: string | null
    _count: EmailNotificationLogCountAggregateOutputType | null
    _avg: EmailNotificationLogAvgAggregateOutputType | null
    _sum: EmailNotificationLogSumAggregateOutputType | null
    _min: EmailNotificationLogMinAggregateOutputType | null
    _max: EmailNotificationLogMaxAggregateOutputType | null
  }

  type GetEmailNotificationLogGroupByPayload<T extends EmailNotificationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailNotificationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailNotificationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailNotificationLogGroupByOutputType[P]>
            : GetScalarType<T[P], EmailNotificationLogGroupByOutputType[P]>
        }
      >
    >


  export type EmailNotificationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    emailType?: boolean
    toEmail?: boolean
    ccEmails?: boolean
    subject?: boolean
    status?: boolean
    sentAt?: boolean
    errorMessage?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailNotificationLog"]>

  export type EmailNotificationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    emailType?: boolean
    toEmail?: boolean
    ccEmails?: boolean
    subject?: boolean
    status?: boolean
    sentAt?: boolean
    errorMessage?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailNotificationLog"]>

  export type EmailNotificationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    emailType?: boolean
    toEmail?: boolean
    ccEmails?: boolean
    subject?: boolean
    status?: boolean
    sentAt?: boolean
    errorMessage?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailNotificationLog"]>

  export type EmailNotificationLogSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    week?: boolean
    emailType?: boolean
    toEmail?: boolean
    ccEmails?: boolean
    subject?: boolean
    status?: boolean
    sentAt?: boolean
    errorMessage?: boolean
  }

  export type EmailNotificationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "month" | "week" | "emailType" | "toEmail" | "ccEmails" | "subject" | "status" | "sentAt" | "errorMessage", ExtArgs["result"]["emailNotificationLog"]>
  export type EmailNotificationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailNotificationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailNotificationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailNotificationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailNotificationLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      month: number
      week: number
      emailType: string
      toEmail: string
      ccEmails: string | null
      subject: string
      status: string
      sentAt: Date
      errorMessage: string | null
    }, ExtArgs["result"]["emailNotificationLog"]>
    composites: {}
  }

  type EmailNotificationLogGetPayload<S extends boolean | null | undefined | EmailNotificationLogDefaultArgs> = $Result.GetResult<Prisma.$EmailNotificationLogPayload, S>

  type EmailNotificationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailNotificationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailNotificationLogCountAggregateInputType | true
    }

  export interface EmailNotificationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailNotificationLog'], meta: { name: 'EmailNotificationLog' } }
    /**
     * Find zero or one EmailNotificationLog that matches the filter.
     * @param {EmailNotificationLogFindUniqueArgs} args - Arguments to find a EmailNotificationLog
     * @example
     * // Get one EmailNotificationLog
     * const emailNotificationLog = await prisma.emailNotificationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailNotificationLogFindUniqueArgs>(args: SelectSubset<T, EmailNotificationLogFindUniqueArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailNotificationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailNotificationLogFindUniqueOrThrowArgs} args - Arguments to find a EmailNotificationLog
     * @example
     * // Get one EmailNotificationLog
     * const emailNotificationLog = await prisma.emailNotificationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailNotificationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailNotificationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailNotificationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogFindFirstArgs} args - Arguments to find a EmailNotificationLog
     * @example
     * // Get one EmailNotificationLog
     * const emailNotificationLog = await prisma.emailNotificationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailNotificationLogFindFirstArgs>(args?: SelectSubset<T, EmailNotificationLogFindFirstArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailNotificationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogFindFirstOrThrowArgs} args - Arguments to find a EmailNotificationLog
     * @example
     * // Get one EmailNotificationLog
     * const emailNotificationLog = await prisma.emailNotificationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailNotificationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailNotificationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailNotificationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailNotificationLogs
     * const emailNotificationLogs = await prisma.emailNotificationLog.findMany()
     * 
     * // Get first 10 EmailNotificationLogs
     * const emailNotificationLogs = await prisma.emailNotificationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailNotificationLogWithIdOnly = await prisma.emailNotificationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailNotificationLogFindManyArgs>(args?: SelectSubset<T, EmailNotificationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailNotificationLog.
     * @param {EmailNotificationLogCreateArgs} args - Arguments to create a EmailNotificationLog.
     * @example
     * // Create one EmailNotificationLog
     * const EmailNotificationLog = await prisma.emailNotificationLog.create({
     *   data: {
     *     // ... data to create a EmailNotificationLog
     *   }
     * })
     * 
     */
    create<T extends EmailNotificationLogCreateArgs>(args: SelectSubset<T, EmailNotificationLogCreateArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailNotificationLogs.
     * @param {EmailNotificationLogCreateManyArgs} args - Arguments to create many EmailNotificationLogs.
     * @example
     * // Create many EmailNotificationLogs
     * const emailNotificationLog = await prisma.emailNotificationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailNotificationLogCreateManyArgs>(args?: SelectSubset<T, EmailNotificationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailNotificationLogs and returns the data saved in the database.
     * @param {EmailNotificationLogCreateManyAndReturnArgs} args - Arguments to create many EmailNotificationLogs.
     * @example
     * // Create many EmailNotificationLogs
     * const emailNotificationLog = await prisma.emailNotificationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailNotificationLogs and only return the `id`
     * const emailNotificationLogWithIdOnly = await prisma.emailNotificationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailNotificationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailNotificationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailNotificationLog.
     * @param {EmailNotificationLogDeleteArgs} args - Arguments to delete one EmailNotificationLog.
     * @example
     * // Delete one EmailNotificationLog
     * const EmailNotificationLog = await prisma.emailNotificationLog.delete({
     *   where: {
     *     // ... filter to delete one EmailNotificationLog
     *   }
     * })
     * 
     */
    delete<T extends EmailNotificationLogDeleteArgs>(args: SelectSubset<T, EmailNotificationLogDeleteArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailNotificationLog.
     * @param {EmailNotificationLogUpdateArgs} args - Arguments to update one EmailNotificationLog.
     * @example
     * // Update one EmailNotificationLog
     * const emailNotificationLog = await prisma.emailNotificationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailNotificationLogUpdateArgs>(args: SelectSubset<T, EmailNotificationLogUpdateArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailNotificationLogs.
     * @param {EmailNotificationLogDeleteManyArgs} args - Arguments to filter EmailNotificationLogs to delete.
     * @example
     * // Delete a few EmailNotificationLogs
     * const { count } = await prisma.emailNotificationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailNotificationLogDeleteManyArgs>(args?: SelectSubset<T, EmailNotificationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailNotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailNotificationLogs
     * const emailNotificationLog = await prisma.emailNotificationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailNotificationLogUpdateManyArgs>(args: SelectSubset<T, EmailNotificationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailNotificationLogs and returns the data updated in the database.
     * @param {EmailNotificationLogUpdateManyAndReturnArgs} args - Arguments to update many EmailNotificationLogs.
     * @example
     * // Update many EmailNotificationLogs
     * const emailNotificationLog = await prisma.emailNotificationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailNotificationLogs and only return the `id`
     * const emailNotificationLogWithIdOnly = await prisma.emailNotificationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailNotificationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailNotificationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailNotificationLog.
     * @param {EmailNotificationLogUpsertArgs} args - Arguments to update or create a EmailNotificationLog.
     * @example
     * // Update or create a EmailNotificationLog
     * const emailNotificationLog = await prisma.emailNotificationLog.upsert({
     *   create: {
     *     // ... data to create a EmailNotificationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailNotificationLog we want to update
     *   }
     * })
     */
    upsert<T extends EmailNotificationLogUpsertArgs>(args: SelectSubset<T, EmailNotificationLogUpsertArgs<ExtArgs>>): Prisma__EmailNotificationLogClient<$Result.GetResult<Prisma.$EmailNotificationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailNotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogCountArgs} args - Arguments to filter EmailNotificationLogs to count.
     * @example
     * // Count the number of EmailNotificationLogs
     * const count = await prisma.emailNotificationLog.count({
     *   where: {
     *     // ... the filter for the EmailNotificationLogs we want to count
     *   }
     * })
    **/
    count<T extends EmailNotificationLogCountArgs>(
      args?: Subset<T, EmailNotificationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailNotificationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailNotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailNotificationLogAggregateArgs>(args: Subset<T, EmailNotificationLogAggregateArgs>): Prisma.PrismaPromise<GetEmailNotificationLogAggregateType<T>>

    /**
     * Group by EmailNotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailNotificationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailNotificationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailNotificationLogGroupByArgs['orderBy'] }
        : { orderBy?: EmailNotificationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailNotificationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailNotificationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailNotificationLog model
   */
  readonly fields: EmailNotificationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailNotificationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailNotificationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailNotificationLog model
   */
  interface EmailNotificationLogFieldRefs {
    readonly id: FieldRef<"EmailNotificationLog", 'String'>
    readonly userId: FieldRef<"EmailNotificationLog", 'String'>
    readonly year: FieldRef<"EmailNotificationLog", 'Int'>
    readonly month: FieldRef<"EmailNotificationLog", 'Int'>
    readonly week: FieldRef<"EmailNotificationLog", 'Int'>
    readonly emailType: FieldRef<"EmailNotificationLog", 'String'>
    readonly toEmail: FieldRef<"EmailNotificationLog", 'String'>
    readonly ccEmails: FieldRef<"EmailNotificationLog", 'String'>
    readonly subject: FieldRef<"EmailNotificationLog", 'String'>
    readonly status: FieldRef<"EmailNotificationLog", 'String'>
    readonly sentAt: FieldRef<"EmailNotificationLog", 'DateTime'>
    readonly errorMessage: FieldRef<"EmailNotificationLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmailNotificationLog findUnique
   */
  export type EmailNotificationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailNotificationLog to fetch.
     */
    where: EmailNotificationLogWhereUniqueInput
  }

  /**
   * EmailNotificationLog findUniqueOrThrow
   */
  export type EmailNotificationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailNotificationLog to fetch.
     */
    where: EmailNotificationLogWhereUniqueInput
  }

  /**
   * EmailNotificationLog findFirst
   */
  export type EmailNotificationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailNotificationLog to fetch.
     */
    where?: EmailNotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationLogs to fetch.
     */
    orderBy?: EmailNotificationLogOrderByWithRelationInput | EmailNotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailNotificationLogs.
     */
    cursor?: EmailNotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailNotificationLogs.
     */
    distinct?: EmailNotificationLogScalarFieldEnum | EmailNotificationLogScalarFieldEnum[]
  }

  /**
   * EmailNotificationLog findFirstOrThrow
   */
  export type EmailNotificationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailNotificationLog to fetch.
     */
    where?: EmailNotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationLogs to fetch.
     */
    orderBy?: EmailNotificationLogOrderByWithRelationInput | EmailNotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailNotificationLogs.
     */
    cursor?: EmailNotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailNotificationLogs.
     */
    distinct?: EmailNotificationLogScalarFieldEnum | EmailNotificationLogScalarFieldEnum[]
  }

  /**
   * EmailNotificationLog findMany
   */
  export type EmailNotificationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailNotificationLogs to fetch.
     */
    where?: EmailNotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailNotificationLogs to fetch.
     */
    orderBy?: EmailNotificationLogOrderByWithRelationInput | EmailNotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailNotificationLogs.
     */
    cursor?: EmailNotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailNotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailNotificationLogs.
     */
    skip?: number
    distinct?: EmailNotificationLogScalarFieldEnum | EmailNotificationLogScalarFieldEnum[]
  }

  /**
   * EmailNotificationLog create
   */
  export type EmailNotificationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailNotificationLog.
     */
    data: XOR<EmailNotificationLogCreateInput, EmailNotificationLogUncheckedCreateInput>
  }

  /**
   * EmailNotificationLog createMany
   */
  export type EmailNotificationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailNotificationLogs.
     */
    data: EmailNotificationLogCreateManyInput | EmailNotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailNotificationLog createManyAndReturn
   */
  export type EmailNotificationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * The data used to create many EmailNotificationLogs.
     */
    data: EmailNotificationLogCreateManyInput | EmailNotificationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailNotificationLog update
   */
  export type EmailNotificationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailNotificationLog.
     */
    data: XOR<EmailNotificationLogUpdateInput, EmailNotificationLogUncheckedUpdateInput>
    /**
     * Choose, which EmailNotificationLog to update.
     */
    where: EmailNotificationLogWhereUniqueInput
  }

  /**
   * EmailNotificationLog updateMany
   */
  export type EmailNotificationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailNotificationLogs.
     */
    data: XOR<EmailNotificationLogUpdateManyMutationInput, EmailNotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which EmailNotificationLogs to update
     */
    where?: EmailNotificationLogWhereInput
    /**
     * Limit how many EmailNotificationLogs to update.
     */
    limit?: number
  }

  /**
   * EmailNotificationLog updateManyAndReturn
   */
  export type EmailNotificationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * The data used to update EmailNotificationLogs.
     */
    data: XOR<EmailNotificationLogUpdateManyMutationInput, EmailNotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which EmailNotificationLogs to update
     */
    where?: EmailNotificationLogWhereInput
    /**
     * Limit how many EmailNotificationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailNotificationLog upsert
   */
  export type EmailNotificationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailNotificationLog to update in case it exists.
     */
    where: EmailNotificationLogWhereUniqueInput
    /**
     * In case the EmailNotificationLog found by the `where` argument doesn't exist, create a new EmailNotificationLog with this data.
     */
    create: XOR<EmailNotificationLogCreateInput, EmailNotificationLogUncheckedCreateInput>
    /**
     * In case the EmailNotificationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailNotificationLogUpdateInput, EmailNotificationLogUncheckedUpdateInput>
  }

  /**
   * EmailNotificationLog delete
   */
  export type EmailNotificationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
    /**
     * Filter which EmailNotificationLog to delete.
     */
    where: EmailNotificationLogWhereUniqueInput
  }

  /**
   * EmailNotificationLog deleteMany
   */
  export type EmailNotificationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailNotificationLogs to delete
     */
    where?: EmailNotificationLogWhereInput
    /**
     * Limit how many EmailNotificationLogs to delete.
     */
    limit?: number
  }

  /**
   * EmailNotificationLog without action
   */
  export type EmailNotificationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailNotificationLog
     */
    select?: EmailNotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailNotificationLog
     */
    omit?: EmailNotificationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailNotificationLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    staffId: 'staffId',
    name: 'name',
    designation: 'designation',
    zone: 'zone',
    email: 'email',
    mobile: 'mobile',
    role: 'role',
    status: 'status',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ZoneScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type ZoneScalarFieldEnum = (typeof ZoneScalarFieldEnum)[keyof typeof ZoneScalarFieldEnum]


  export const WeeklyReportScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    monthYear: 'monthYear',
    year: 'year',
    month: 'month',
    week: 'week',
    marketVisitQty: 'marketVisitQty',
    marketVisitFindingQty: 'marketVisitFindingQty',
    solvedQty: 'solvedQty',
    pendingQty: 'pendingQty',
    locSubmittedQty: 'locSubmittedQty',
    locFindingDayQty: 'locFindingDayQty',
    dressCodeQty: 'dressCodeQty',
    dressCodeFindingQty: 'dressCodeFindingQty',
    messVisitQty: 'messVisitQty',
    messVisitFindingQty: 'messVisitFindingQty',
    status: 'status',
    deadline: 'deadline',
    submittedAt: 'submittedAt',
    updatedAt: 'updatedAt',
    notes: 'notes'
  };

  export type WeeklyReportScalarFieldEnum = (typeof WeeklyReportScalarFieldEnum)[keyof typeof WeeklyReportScalarFieldEnum]


  export const FindingHistoryScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    updatedById: 'updatedById',
    previousSolved: 'previousSolved',
    newSolved: 'newSolved',
    previousPending: 'previousPending',
    newPending: 'newPending',
    remark: 'remark',
    createdAt: 'createdAt'
  };

  export type FindingHistoryScalarFieldEnum = (typeof FindingHistoryScalarFieldEnum)[keyof typeof FindingHistoryScalarFieldEnum]


  export const MonthlyTargetScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    month: 'month',
    monthYear: 'monthYear',
    locTarget: 'locTarget',
    messVisitTarget: 'messVisitTarget',
    dressCodeTarget: 'dressCodeTarget',
    isLocked: 'isLocked',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MonthlyTargetScalarFieldEnum = (typeof MonthlyTargetScalarFieldEnum)[keyof typeof MonthlyTargetScalarFieldEnum]


  export const EmailNotificationConfigScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    subjectTemplate: 'subjectTemplate',
    bodyTemplate: 'bodyTemplate',
    ccRecipients: 'ccRecipients',
    bccRecipients: 'bccRecipients',
    isActive: 'isActive',
    updatedAt: 'updatedAt'
  };

  export type EmailNotificationConfigScalarFieldEnum = (typeof EmailNotificationConfigScalarFieldEnum)[keyof typeof EmailNotificationConfigScalarFieldEnum]


  export const EmailNotificationLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    month: 'month',
    week: 'week',
    emailType: 'emailType',
    toEmail: 'toEmail',
    ccEmails: 'ccEmails',
    subject: 'subject',
    status: 'status',
    sentAt: 'sentAt',
    errorMessage: 'errorMessage'
  };

  export type EmailNotificationLogScalarFieldEnum = (typeof EmailNotificationLogScalarFieldEnum)[keyof typeof EmailNotificationLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    staffId?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    designation?: StringFilter<"User"> | string
    zone?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    mobile?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reports?: WeeklyReportListRelationFilter
    targets?: MonthlyTargetListRelationFilter
    findingAudits?: FindingHistoryListRelationFilter
    emailLogs?: EmailNotificationLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    staffId?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    zone?: SortOrder
    email?: SortOrder
    mobile?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reports?: WeeklyReportOrderByRelationAggregateInput
    targets?: MonthlyTargetOrderByRelationAggregateInput
    findingAudits?: FindingHistoryOrderByRelationAggregateInput
    emailLogs?: EmailNotificationLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    staffId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    designation?: StringFilter<"User"> | string
    zone?: StringFilter<"User"> | string
    mobile?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reports?: WeeklyReportListRelationFilter
    targets?: MonthlyTargetListRelationFilter
    findingAudits?: FindingHistoryListRelationFilter
    emailLogs?: EmailNotificationLogListRelationFilter
  }, "id" | "staffId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    staffId?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    zone?: SortOrder
    email?: SortOrder
    mobile?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    staffId?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    designation?: StringWithAggregatesFilter<"User"> | string
    zone?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    mobile?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ZoneWhereInput = {
    AND?: ZoneWhereInput | ZoneWhereInput[]
    OR?: ZoneWhereInput[]
    NOT?: ZoneWhereInput | ZoneWhereInput[]
    id?: StringFilter<"Zone"> | string
    name?: StringFilter<"Zone"> | string
    code?: StringNullableFilter<"Zone"> | string | null
    isActive?: BoolFilter<"Zone"> | boolean
    createdAt?: DateTimeFilter<"Zone"> | Date | string
  }

  export type ZoneOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ZoneWhereInput | ZoneWhereInput[]
    OR?: ZoneWhereInput[]
    NOT?: ZoneWhereInput | ZoneWhereInput[]
    code?: StringNullableFilter<"Zone"> | string | null
    isActive?: BoolFilter<"Zone"> | boolean
    createdAt?: DateTimeFilter<"Zone"> | Date | string
  }, "id" | "name">

  export type ZoneOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: ZoneCountOrderByAggregateInput
    _max?: ZoneMaxOrderByAggregateInput
    _min?: ZoneMinOrderByAggregateInput
  }

  export type ZoneScalarWhereWithAggregatesInput = {
    AND?: ZoneScalarWhereWithAggregatesInput | ZoneScalarWhereWithAggregatesInput[]
    OR?: ZoneScalarWhereWithAggregatesInput[]
    NOT?: ZoneScalarWhereWithAggregatesInput | ZoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Zone"> | string
    name?: StringWithAggregatesFilter<"Zone"> | string
    code?: StringNullableWithAggregatesFilter<"Zone"> | string | null
    isActive?: BoolWithAggregatesFilter<"Zone"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Zone"> | Date | string
  }

  export type WeeklyReportWhereInput = {
    AND?: WeeklyReportWhereInput | WeeklyReportWhereInput[]
    OR?: WeeklyReportWhereInput[]
    NOT?: WeeklyReportWhereInput | WeeklyReportWhereInput[]
    id?: StringFilter<"WeeklyReport"> | string
    userId?: StringFilter<"WeeklyReport"> | string
    monthYear?: StringFilter<"WeeklyReport"> | string
    year?: IntFilter<"WeeklyReport"> | number
    month?: IntFilter<"WeeklyReport"> | number
    week?: IntFilter<"WeeklyReport"> | number
    marketVisitQty?: IntFilter<"WeeklyReport"> | number
    marketVisitFindingQty?: IntFilter<"WeeklyReport"> | number
    solvedQty?: IntFilter<"WeeklyReport"> | number
    pendingQty?: IntFilter<"WeeklyReport"> | number
    locSubmittedQty?: IntFilter<"WeeklyReport"> | number
    locFindingDayQty?: FloatFilter<"WeeklyReport"> | number
    dressCodeQty?: IntFilter<"WeeklyReport"> | number
    dressCodeFindingQty?: IntFilter<"WeeklyReport"> | number
    messVisitQty?: IntFilter<"WeeklyReport"> | number
    messVisitFindingQty?: IntFilter<"WeeklyReport"> | number
    status?: StringFilter<"WeeklyReport"> | string
    deadline?: DateTimeFilter<"WeeklyReport"> | Date | string
    submittedAt?: DateTimeFilter<"WeeklyReport"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyReport"> | Date | string
    notes?: StringNullableFilter<"WeeklyReport"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    findingHistory?: FindingHistoryListRelationFilter
  }

  export type WeeklyReportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    monthYear?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    findingHistory?: FindingHistoryOrderByRelationAggregateInput
  }

  export type WeeklyReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year_month_week?: WeeklyReportUserIdYearMonthWeekCompoundUniqueInput
    AND?: WeeklyReportWhereInput | WeeklyReportWhereInput[]
    OR?: WeeklyReportWhereInput[]
    NOT?: WeeklyReportWhereInput | WeeklyReportWhereInput[]
    userId?: StringFilter<"WeeklyReport"> | string
    monthYear?: StringFilter<"WeeklyReport"> | string
    year?: IntFilter<"WeeklyReport"> | number
    month?: IntFilter<"WeeklyReport"> | number
    week?: IntFilter<"WeeklyReport"> | number
    marketVisitQty?: IntFilter<"WeeklyReport"> | number
    marketVisitFindingQty?: IntFilter<"WeeklyReport"> | number
    solvedQty?: IntFilter<"WeeklyReport"> | number
    pendingQty?: IntFilter<"WeeklyReport"> | number
    locSubmittedQty?: IntFilter<"WeeklyReport"> | number
    locFindingDayQty?: FloatFilter<"WeeklyReport"> | number
    dressCodeQty?: IntFilter<"WeeklyReport"> | number
    dressCodeFindingQty?: IntFilter<"WeeklyReport"> | number
    messVisitQty?: IntFilter<"WeeklyReport"> | number
    messVisitFindingQty?: IntFilter<"WeeklyReport"> | number
    status?: StringFilter<"WeeklyReport"> | string
    deadline?: DateTimeFilter<"WeeklyReport"> | Date | string
    submittedAt?: DateTimeFilter<"WeeklyReport"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyReport"> | Date | string
    notes?: StringNullableFilter<"WeeklyReport"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    findingHistory?: FindingHistoryListRelationFilter
  }, "id" | "userId_year_month_week">

  export type WeeklyReportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    monthYear?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: WeeklyReportCountOrderByAggregateInput
    _avg?: WeeklyReportAvgOrderByAggregateInput
    _max?: WeeklyReportMaxOrderByAggregateInput
    _min?: WeeklyReportMinOrderByAggregateInput
    _sum?: WeeklyReportSumOrderByAggregateInput
  }

  export type WeeklyReportScalarWhereWithAggregatesInput = {
    AND?: WeeklyReportScalarWhereWithAggregatesInput | WeeklyReportScalarWhereWithAggregatesInput[]
    OR?: WeeklyReportScalarWhereWithAggregatesInput[]
    NOT?: WeeklyReportScalarWhereWithAggregatesInput | WeeklyReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklyReport"> | string
    userId?: StringWithAggregatesFilter<"WeeklyReport"> | string
    monthYear?: StringWithAggregatesFilter<"WeeklyReport"> | string
    year?: IntWithAggregatesFilter<"WeeklyReport"> | number
    month?: IntWithAggregatesFilter<"WeeklyReport"> | number
    week?: IntWithAggregatesFilter<"WeeklyReport"> | number
    marketVisitQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    marketVisitFindingQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    solvedQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    pendingQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    locSubmittedQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    locFindingDayQty?: FloatWithAggregatesFilter<"WeeklyReport"> | number
    dressCodeQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    dressCodeFindingQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    messVisitQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    messVisitFindingQty?: IntWithAggregatesFilter<"WeeklyReport"> | number
    status?: StringWithAggregatesFilter<"WeeklyReport"> | string
    deadline?: DateTimeWithAggregatesFilter<"WeeklyReport"> | Date | string
    submittedAt?: DateTimeWithAggregatesFilter<"WeeklyReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeeklyReport"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"WeeklyReport"> | string | null
  }

  export type FindingHistoryWhereInput = {
    AND?: FindingHistoryWhereInput | FindingHistoryWhereInput[]
    OR?: FindingHistoryWhereInput[]
    NOT?: FindingHistoryWhereInput | FindingHistoryWhereInput[]
    id?: StringFilter<"FindingHistory"> | string
    reportId?: StringFilter<"FindingHistory"> | string
    updatedById?: StringFilter<"FindingHistory"> | string
    previousSolved?: IntFilter<"FindingHistory"> | number
    newSolved?: IntFilter<"FindingHistory"> | number
    previousPending?: IntFilter<"FindingHistory"> | number
    newPending?: IntFilter<"FindingHistory"> | number
    remark?: StringNullableFilter<"FindingHistory"> | string | null
    createdAt?: DateTimeFilter<"FindingHistory"> | Date | string
    report?: XOR<WeeklyReportScalarRelationFilter, WeeklyReportWhereInput>
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FindingHistoryOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    updatedById?: SortOrder
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
    remark?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    report?: WeeklyReportOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
  }

  export type FindingHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FindingHistoryWhereInput | FindingHistoryWhereInput[]
    OR?: FindingHistoryWhereInput[]
    NOT?: FindingHistoryWhereInput | FindingHistoryWhereInput[]
    reportId?: StringFilter<"FindingHistory"> | string
    updatedById?: StringFilter<"FindingHistory"> | string
    previousSolved?: IntFilter<"FindingHistory"> | number
    newSolved?: IntFilter<"FindingHistory"> | number
    previousPending?: IntFilter<"FindingHistory"> | number
    newPending?: IntFilter<"FindingHistory"> | number
    remark?: StringNullableFilter<"FindingHistory"> | string | null
    createdAt?: DateTimeFilter<"FindingHistory"> | Date | string
    report?: XOR<WeeklyReportScalarRelationFilter, WeeklyReportWhereInput>
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FindingHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    updatedById?: SortOrder
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
    remark?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FindingHistoryCountOrderByAggregateInput
    _avg?: FindingHistoryAvgOrderByAggregateInput
    _max?: FindingHistoryMaxOrderByAggregateInput
    _min?: FindingHistoryMinOrderByAggregateInput
    _sum?: FindingHistorySumOrderByAggregateInput
  }

  export type FindingHistoryScalarWhereWithAggregatesInput = {
    AND?: FindingHistoryScalarWhereWithAggregatesInput | FindingHistoryScalarWhereWithAggregatesInput[]
    OR?: FindingHistoryScalarWhereWithAggregatesInput[]
    NOT?: FindingHistoryScalarWhereWithAggregatesInput | FindingHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FindingHistory"> | string
    reportId?: StringWithAggregatesFilter<"FindingHistory"> | string
    updatedById?: StringWithAggregatesFilter<"FindingHistory"> | string
    previousSolved?: IntWithAggregatesFilter<"FindingHistory"> | number
    newSolved?: IntWithAggregatesFilter<"FindingHistory"> | number
    previousPending?: IntWithAggregatesFilter<"FindingHistory"> | number
    newPending?: IntWithAggregatesFilter<"FindingHistory"> | number
    remark?: StringNullableWithAggregatesFilter<"FindingHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FindingHistory"> | Date | string
  }

  export type MonthlyTargetWhereInput = {
    AND?: MonthlyTargetWhereInput | MonthlyTargetWhereInput[]
    OR?: MonthlyTargetWhereInput[]
    NOT?: MonthlyTargetWhereInput | MonthlyTargetWhereInput[]
    id?: StringFilter<"MonthlyTarget"> | string
    userId?: StringFilter<"MonthlyTarget"> | string
    year?: IntFilter<"MonthlyTarget"> | number
    month?: IntFilter<"MonthlyTarget"> | number
    monthYear?: StringFilter<"MonthlyTarget"> | string
    locTarget?: IntFilter<"MonthlyTarget"> | number
    messVisitTarget?: IntFilter<"MonthlyTarget"> | number
    dressCodeTarget?: IntFilter<"MonthlyTarget"> | number
    isLocked?: BoolFilter<"MonthlyTarget"> | boolean
    createdAt?: DateTimeFilter<"MonthlyTarget"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyTarget"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MonthlyTargetOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    monthYear?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MonthlyTargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year_month?: MonthlyTargetUserIdYearMonthCompoundUniqueInput
    AND?: MonthlyTargetWhereInput | MonthlyTargetWhereInput[]
    OR?: MonthlyTargetWhereInput[]
    NOT?: MonthlyTargetWhereInput | MonthlyTargetWhereInput[]
    userId?: StringFilter<"MonthlyTarget"> | string
    year?: IntFilter<"MonthlyTarget"> | number
    month?: IntFilter<"MonthlyTarget"> | number
    monthYear?: StringFilter<"MonthlyTarget"> | string
    locTarget?: IntFilter<"MonthlyTarget"> | number
    messVisitTarget?: IntFilter<"MonthlyTarget"> | number
    dressCodeTarget?: IntFilter<"MonthlyTarget"> | number
    isLocked?: BoolFilter<"MonthlyTarget"> | boolean
    createdAt?: DateTimeFilter<"MonthlyTarget"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyTarget"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year_month">

  export type MonthlyTargetOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    monthYear?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MonthlyTargetCountOrderByAggregateInput
    _avg?: MonthlyTargetAvgOrderByAggregateInput
    _max?: MonthlyTargetMaxOrderByAggregateInput
    _min?: MonthlyTargetMinOrderByAggregateInput
    _sum?: MonthlyTargetSumOrderByAggregateInput
  }

  export type MonthlyTargetScalarWhereWithAggregatesInput = {
    AND?: MonthlyTargetScalarWhereWithAggregatesInput | MonthlyTargetScalarWhereWithAggregatesInput[]
    OR?: MonthlyTargetScalarWhereWithAggregatesInput[]
    NOT?: MonthlyTargetScalarWhereWithAggregatesInput | MonthlyTargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyTarget"> | string
    userId?: StringWithAggregatesFilter<"MonthlyTarget"> | string
    year?: IntWithAggregatesFilter<"MonthlyTarget"> | number
    month?: IntWithAggregatesFilter<"MonthlyTarget"> | number
    monthYear?: StringWithAggregatesFilter<"MonthlyTarget"> | string
    locTarget?: IntWithAggregatesFilter<"MonthlyTarget"> | number
    messVisitTarget?: IntWithAggregatesFilter<"MonthlyTarget"> | number
    dressCodeTarget?: IntWithAggregatesFilter<"MonthlyTarget"> | number
    isLocked?: BoolWithAggregatesFilter<"MonthlyTarget"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyTarget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MonthlyTarget"> | Date | string
  }

  export type EmailNotificationConfigWhereInput = {
    AND?: EmailNotificationConfigWhereInput | EmailNotificationConfigWhereInput[]
    OR?: EmailNotificationConfigWhereInput[]
    NOT?: EmailNotificationConfigWhereInput | EmailNotificationConfigWhereInput[]
    id?: StringFilter<"EmailNotificationConfig"> | string
    code?: StringFilter<"EmailNotificationConfig"> | string
    name?: StringFilter<"EmailNotificationConfig"> | string
    description?: StringNullableFilter<"EmailNotificationConfig"> | string | null
    subjectTemplate?: StringFilter<"EmailNotificationConfig"> | string
    bodyTemplate?: StringFilter<"EmailNotificationConfig"> | string
    ccRecipients?: StringFilter<"EmailNotificationConfig"> | string
    bccRecipients?: StringNullableFilter<"EmailNotificationConfig"> | string | null
    isActive?: BoolFilter<"EmailNotificationConfig"> | boolean
    updatedAt?: DateTimeFilter<"EmailNotificationConfig"> | Date | string
  }

  export type EmailNotificationConfigOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    subjectTemplate?: SortOrder
    bodyTemplate?: SortOrder
    ccRecipients?: SortOrder
    bccRecipients?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailNotificationConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: EmailNotificationConfigWhereInput | EmailNotificationConfigWhereInput[]
    OR?: EmailNotificationConfigWhereInput[]
    NOT?: EmailNotificationConfigWhereInput | EmailNotificationConfigWhereInput[]
    name?: StringFilter<"EmailNotificationConfig"> | string
    description?: StringNullableFilter<"EmailNotificationConfig"> | string | null
    subjectTemplate?: StringFilter<"EmailNotificationConfig"> | string
    bodyTemplate?: StringFilter<"EmailNotificationConfig"> | string
    ccRecipients?: StringFilter<"EmailNotificationConfig"> | string
    bccRecipients?: StringNullableFilter<"EmailNotificationConfig"> | string | null
    isActive?: BoolFilter<"EmailNotificationConfig"> | boolean
    updatedAt?: DateTimeFilter<"EmailNotificationConfig"> | Date | string
  }, "id" | "code">

  export type EmailNotificationConfigOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    subjectTemplate?: SortOrder
    bodyTemplate?: SortOrder
    ccRecipients?: SortOrder
    bccRecipients?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailNotificationConfigCountOrderByAggregateInput
    _max?: EmailNotificationConfigMaxOrderByAggregateInput
    _min?: EmailNotificationConfigMinOrderByAggregateInput
  }

  export type EmailNotificationConfigScalarWhereWithAggregatesInput = {
    AND?: EmailNotificationConfigScalarWhereWithAggregatesInput | EmailNotificationConfigScalarWhereWithAggregatesInput[]
    OR?: EmailNotificationConfigScalarWhereWithAggregatesInput[]
    NOT?: EmailNotificationConfigScalarWhereWithAggregatesInput | EmailNotificationConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailNotificationConfig"> | string
    code?: StringWithAggregatesFilter<"EmailNotificationConfig"> | string
    name?: StringWithAggregatesFilter<"EmailNotificationConfig"> | string
    description?: StringNullableWithAggregatesFilter<"EmailNotificationConfig"> | string | null
    subjectTemplate?: StringWithAggregatesFilter<"EmailNotificationConfig"> | string
    bodyTemplate?: StringWithAggregatesFilter<"EmailNotificationConfig"> | string
    ccRecipients?: StringWithAggregatesFilter<"EmailNotificationConfig"> | string
    bccRecipients?: StringNullableWithAggregatesFilter<"EmailNotificationConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"EmailNotificationConfig"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"EmailNotificationConfig"> | Date | string
  }

  export type EmailNotificationLogWhereInput = {
    AND?: EmailNotificationLogWhereInput | EmailNotificationLogWhereInput[]
    OR?: EmailNotificationLogWhereInput[]
    NOT?: EmailNotificationLogWhereInput | EmailNotificationLogWhereInput[]
    id?: StringFilter<"EmailNotificationLog"> | string
    userId?: StringFilter<"EmailNotificationLog"> | string
    year?: IntFilter<"EmailNotificationLog"> | number
    month?: IntFilter<"EmailNotificationLog"> | number
    week?: IntFilter<"EmailNotificationLog"> | number
    emailType?: StringFilter<"EmailNotificationLog"> | string
    toEmail?: StringFilter<"EmailNotificationLog"> | string
    ccEmails?: StringNullableFilter<"EmailNotificationLog"> | string | null
    subject?: StringFilter<"EmailNotificationLog"> | string
    status?: StringFilter<"EmailNotificationLog"> | string
    sentAt?: DateTimeFilter<"EmailNotificationLog"> | Date | string
    errorMessage?: StringNullableFilter<"EmailNotificationLog"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailNotificationLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    emailType?: SortOrder
    toEmail?: SortOrder
    ccEmails?: SortOrderInput | SortOrder
    subject?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailNotificationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year_month_week_emailType?: EmailNotificationLogUserIdYearMonthWeekEmailTypeCompoundUniqueInput
    AND?: EmailNotificationLogWhereInput | EmailNotificationLogWhereInput[]
    OR?: EmailNotificationLogWhereInput[]
    NOT?: EmailNotificationLogWhereInput | EmailNotificationLogWhereInput[]
    userId?: StringFilter<"EmailNotificationLog"> | string
    year?: IntFilter<"EmailNotificationLog"> | number
    month?: IntFilter<"EmailNotificationLog"> | number
    week?: IntFilter<"EmailNotificationLog"> | number
    emailType?: StringFilter<"EmailNotificationLog"> | string
    toEmail?: StringFilter<"EmailNotificationLog"> | string
    ccEmails?: StringNullableFilter<"EmailNotificationLog"> | string | null
    subject?: StringFilter<"EmailNotificationLog"> | string
    status?: StringFilter<"EmailNotificationLog"> | string
    sentAt?: DateTimeFilter<"EmailNotificationLog"> | Date | string
    errorMessage?: StringNullableFilter<"EmailNotificationLog"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year_month_week_emailType">

  export type EmailNotificationLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    emailType?: SortOrder
    toEmail?: SortOrder
    ccEmails?: SortOrderInput | SortOrder
    subject?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    _count?: EmailNotificationLogCountOrderByAggregateInput
    _avg?: EmailNotificationLogAvgOrderByAggregateInput
    _max?: EmailNotificationLogMaxOrderByAggregateInput
    _min?: EmailNotificationLogMinOrderByAggregateInput
    _sum?: EmailNotificationLogSumOrderByAggregateInput
  }

  export type EmailNotificationLogScalarWhereWithAggregatesInput = {
    AND?: EmailNotificationLogScalarWhereWithAggregatesInput | EmailNotificationLogScalarWhereWithAggregatesInput[]
    OR?: EmailNotificationLogScalarWhereWithAggregatesInput[]
    NOT?: EmailNotificationLogScalarWhereWithAggregatesInput | EmailNotificationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailNotificationLog"> | string
    userId?: StringWithAggregatesFilter<"EmailNotificationLog"> | string
    year?: IntWithAggregatesFilter<"EmailNotificationLog"> | number
    month?: IntWithAggregatesFilter<"EmailNotificationLog"> | number
    week?: IntWithAggregatesFilter<"EmailNotificationLog"> | number
    emailType?: StringWithAggregatesFilter<"EmailNotificationLog"> | string
    toEmail?: StringWithAggregatesFilter<"EmailNotificationLog"> | string
    ccEmails?: StringNullableWithAggregatesFilter<"EmailNotificationLog"> | string | null
    subject?: StringWithAggregatesFilter<"EmailNotificationLog"> | string
    status?: StringWithAggregatesFilter<"EmailNotificationLog"> | string
    sentAt?: DateTimeWithAggregatesFilter<"EmailNotificationLog"> | Date | string
    errorMessage?: StringNullableWithAggregatesFilter<"EmailNotificationLog"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportCreateNestedManyWithoutUserInput
    targets?: MonthlyTargetCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryCreateNestedManyWithoutUpdatedByInput
    emailLogs?: EmailNotificationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportUncheckedCreateNestedManyWithoutUserInput
    targets?: MonthlyTargetUncheckedCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryUncheckedCreateNestedManyWithoutUpdatedByInput
    emailLogs?: EmailNotificationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUpdateManyWithoutUserNestedInput
    targets?: MonthlyTargetUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUpdateManyWithoutUpdatedByNestedInput
    emailLogs?: EmailNotificationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUncheckedUpdateManyWithoutUserNestedInput
    targets?: MonthlyTargetUncheckedUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUncheckedUpdateManyWithoutUpdatedByNestedInput
    emailLogs?: EmailNotificationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneCreateInput = {
    id?: string
    name: string
    code?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ZoneUncheckedCreateInput = {
    id?: string
    name: string
    code?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ZoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneCreateManyInput = {
    id?: string
    name: string
    code?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ZoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyReportCreateInput = {
    id?: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
    user: UserCreateNestedOneWithoutReportsInput
    findingHistory?: FindingHistoryCreateNestedManyWithoutReportInput
  }

  export type WeeklyReportUncheckedCreateInput = {
    id?: string
    userId: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
    findingHistory?: FindingHistoryUncheckedCreateNestedManyWithoutReportInput
  }

  export type WeeklyReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutReportsNestedInput
    findingHistory?: FindingHistoryUpdateManyWithoutReportNestedInput
  }

  export type WeeklyReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    findingHistory?: FindingHistoryUncheckedUpdateManyWithoutReportNestedInput
  }

  export type WeeklyReportCreateManyInput = {
    id?: string
    userId: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
  }

  export type WeeklyReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WeeklyReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FindingHistoryCreateInput = {
    id?: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
    report: WeeklyReportCreateNestedOneWithoutFindingHistoryInput
    updatedBy: UserCreateNestedOneWithoutFindingAuditsInput
  }

  export type FindingHistoryUncheckedCreateInput = {
    id?: string
    reportId: string
    updatedById: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
  }

  export type FindingHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: WeeklyReportUpdateOneRequiredWithoutFindingHistoryNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutFindingAuditsNestedInput
  }

  export type FindingHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingHistoryCreateManyInput = {
    id?: string
    reportId: string
    updatedById: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
  }

  export type FindingHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyTargetCreateInput = {
    id?: string
    year: number
    month: number
    monthYear: string
    locTarget?: number
    messVisitTarget?: number
    dressCodeTarget?: number
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTargetsInput
  }

  export type MonthlyTargetUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    month: number
    monthYear: string
    locTarget?: number
    messVisitTarget?: number
    dressCodeTarget?: number
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyTargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type MonthlyTargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyTargetCreateManyInput = {
    id?: string
    userId: string
    year: number
    month: number
    monthYear: string
    locTarget?: number
    messVisitTarget?: number
    dressCodeTarget?: number
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyTargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyTargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailNotificationConfigCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    subjectTemplate: string
    bodyTemplate: string
    ccRecipients: string
    bccRecipients?: string | null
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type EmailNotificationConfigUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    subjectTemplate: string
    bodyTemplate: string
    ccRecipients: string
    bccRecipients?: string | null
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type EmailNotificationConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    ccRecipients?: StringFieldUpdateOperationsInput | string
    bccRecipients?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailNotificationConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    ccRecipients?: StringFieldUpdateOperationsInput | string
    bccRecipients?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailNotificationConfigCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    subjectTemplate: string
    bodyTemplate: string
    ccRecipients: string
    bccRecipients?: string | null
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type EmailNotificationConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    ccRecipients?: StringFieldUpdateOperationsInput | string
    bccRecipients?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailNotificationConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    ccRecipients?: StringFieldUpdateOperationsInput | string
    bccRecipients?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailNotificationLogCreateInput = {
    id?: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails?: string | null
    subject: string
    status?: string
    sentAt?: Date | string
    errorMessage?: string | null
    user: UserCreateNestedOneWithoutEmailLogsInput
  }

  export type EmailNotificationLogUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails?: string | null
    subject: string
    status?: string
    sentAt?: Date | string
    errorMessage?: string | null
  }

  export type EmailNotificationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutEmailLogsNestedInput
  }

  export type EmailNotificationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmailNotificationLogCreateManyInput = {
    id?: string
    userId: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails?: string | null
    subject: string
    status?: string
    sentAt?: Date | string
    errorMessage?: string | null
  }

  export type EmailNotificationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmailNotificationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WeeklyReportListRelationFilter = {
    every?: WeeklyReportWhereInput
    some?: WeeklyReportWhereInput
    none?: WeeklyReportWhereInput
  }

  export type MonthlyTargetListRelationFilter = {
    every?: MonthlyTargetWhereInput
    some?: MonthlyTargetWhereInput
    none?: MonthlyTargetWhereInput
  }

  export type FindingHistoryListRelationFilter = {
    every?: FindingHistoryWhereInput
    some?: FindingHistoryWhereInput
    none?: FindingHistoryWhereInput
  }

  export type EmailNotificationLogListRelationFilter = {
    every?: EmailNotificationLogWhereInput
    some?: EmailNotificationLogWhereInput
    none?: EmailNotificationLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WeeklyReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyTargetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FindingHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailNotificationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    zone?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    status?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    zone?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    status?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    name?: SortOrder
    designation?: SortOrder
    zone?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    status?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ZoneCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ZoneMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ZoneMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WeeklyReportUserIdYearMonthWeekCompoundUniqueInput = {
    userId: string
    year: number
    month: number
    week: number
  }

  export type WeeklyReportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    monthYear?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    notes?: SortOrder
  }

  export type WeeklyReportAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
  }

  export type WeeklyReportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    monthYear?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    notes?: SortOrder
  }

  export type WeeklyReportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    monthYear?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    notes?: SortOrder
  }

  export type WeeklyReportSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    marketVisitQty?: SortOrder
    marketVisitFindingQty?: SortOrder
    solvedQty?: SortOrder
    pendingQty?: SortOrder
    locSubmittedQty?: SortOrder
    locFindingDayQty?: SortOrder
    dressCodeQty?: SortOrder
    dressCodeFindingQty?: SortOrder
    messVisitQty?: SortOrder
    messVisitFindingQty?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type WeeklyReportScalarRelationFilter = {
    is?: WeeklyReportWhereInput
    isNot?: WeeklyReportWhereInput
  }

  export type FindingHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    updatedById?: SortOrder
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
    remark?: SortOrder
    createdAt?: SortOrder
  }

  export type FindingHistoryAvgOrderByAggregateInput = {
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
  }

  export type FindingHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    updatedById?: SortOrder
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
    remark?: SortOrder
    createdAt?: SortOrder
  }

  export type FindingHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    updatedById?: SortOrder
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
    remark?: SortOrder
    createdAt?: SortOrder
  }

  export type FindingHistorySumOrderByAggregateInput = {
    previousSolved?: SortOrder
    newSolved?: SortOrder
    previousPending?: SortOrder
    newPending?: SortOrder
  }

  export type MonthlyTargetUserIdYearMonthCompoundUniqueInput = {
    userId: string
    year: number
    month: number
  }

  export type MonthlyTargetCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    monthYear?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyTargetAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
  }

  export type MonthlyTargetMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    monthYear?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyTargetMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    monthYear?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
    isLocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyTargetSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    locTarget?: SortOrder
    messVisitTarget?: SortOrder
    dressCodeTarget?: SortOrder
  }

  export type EmailNotificationConfigCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subjectTemplate?: SortOrder
    bodyTemplate?: SortOrder
    ccRecipients?: SortOrder
    bccRecipients?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailNotificationConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subjectTemplate?: SortOrder
    bodyTemplate?: SortOrder
    ccRecipients?: SortOrder
    bccRecipients?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailNotificationConfigMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subjectTemplate?: SortOrder
    bodyTemplate?: SortOrder
    ccRecipients?: SortOrder
    bccRecipients?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailNotificationLogUserIdYearMonthWeekEmailTypeCompoundUniqueInput = {
    userId: string
    year: number
    month: number
    week: number
    emailType: string
  }

  export type EmailNotificationLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    emailType?: SortOrder
    toEmail?: SortOrder
    ccEmails?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    errorMessage?: SortOrder
  }

  export type EmailNotificationLogAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
  }

  export type EmailNotificationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    emailType?: SortOrder
    toEmail?: SortOrder
    ccEmails?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    errorMessage?: SortOrder
  }

  export type EmailNotificationLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
    emailType?: SortOrder
    toEmail?: SortOrder
    ccEmails?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    errorMessage?: SortOrder
  }

  export type EmailNotificationLogSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    week?: SortOrder
  }

  export type WeeklyReportCreateNestedManyWithoutUserInput = {
    create?: XOR<WeeklyReportCreateWithoutUserInput, WeeklyReportUncheckedCreateWithoutUserInput> | WeeklyReportCreateWithoutUserInput[] | WeeklyReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyReportCreateOrConnectWithoutUserInput | WeeklyReportCreateOrConnectWithoutUserInput[]
    createMany?: WeeklyReportCreateManyUserInputEnvelope
    connect?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
  }

  export type MonthlyTargetCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlyTargetCreateWithoutUserInput, MonthlyTargetUncheckedCreateWithoutUserInput> | MonthlyTargetCreateWithoutUserInput[] | MonthlyTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyTargetCreateOrConnectWithoutUserInput | MonthlyTargetCreateOrConnectWithoutUserInput[]
    createMany?: MonthlyTargetCreateManyUserInputEnvelope
    connect?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
  }

  export type FindingHistoryCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<FindingHistoryCreateWithoutUpdatedByInput, FindingHistoryUncheckedCreateWithoutUpdatedByInput> | FindingHistoryCreateWithoutUpdatedByInput[] | FindingHistoryUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutUpdatedByInput | FindingHistoryCreateOrConnectWithoutUpdatedByInput[]
    createMany?: FindingHistoryCreateManyUpdatedByInputEnvelope
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
  }

  export type EmailNotificationLogCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailNotificationLogCreateWithoutUserInput, EmailNotificationLogUncheckedCreateWithoutUserInput> | EmailNotificationLogCreateWithoutUserInput[] | EmailNotificationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailNotificationLogCreateOrConnectWithoutUserInput | EmailNotificationLogCreateOrConnectWithoutUserInput[]
    createMany?: EmailNotificationLogCreateManyUserInputEnvelope
    connect?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
  }

  export type WeeklyReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WeeklyReportCreateWithoutUserInput, WeeklyReportUncheckedCreateWithoutUserInput> | WeeklyReportCreateWithoutUserInput[] | WeeklyReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyReportCreateOrConnectWithoutUserInput | WeeklyReportCreateOrConnectWithoutUserInput[]
    createMany?: WeeklyReportCreateManyUserInputEnvelope
    connect?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
  }

  export type MonthlyTargetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlyTargetCreateWithoutUserInput, MonthlyTargetUncheckedCreateWithoutUserInput> | MonthlyTargetCreateWithoutUserInput[] | MonthlyTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyTargetCreateOrConnectWithoutUserInput | MonthlyTargetCreateOrConnectWithoutUserInput[]
    createMany?: MonthlyTargetCreateManyUserInputEnvelope
    connect?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
  }

  export type FindingHistoryUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<FindingHistoryCreateWithoutUpdatedByInput, FindingHistoryUncheckedCreateWithoutUpdatedByInput> | FindingHistoryCreateWithoutUpdatedByInput[] | FindingHistoryUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutUpdatedByInput | FindingHistoryCreateOrConnectWithoutUpdatedByInput[]
    createMany?: FindingHistoryCreateManyUpdatedByInputEnvelope
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
  }

  export type EmailNotificationLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailNotificationLogCreateWithoutUserInput, EmailNotificationLogUncheckedCreateWithoutUserInput> | EmailNotificationLogCreateWithoutUserInput[] | EmailNotificationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailNotificationLogCreateOrConnectWithoutUserInput | EmailNotificationLogCreateOrConnectWithoutUserInput[]
    createMany?: EmailNotificationLogCreateManyUserInputEnvelope
    connect?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WeeklyReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeeklyReportCreateWithoutUserInput, WeeklyReportUncheckedCreateWithoutUserInput> | WeeklyReportCreateWithoutUserInput[] | WeeklyReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyReportCreateOrConnectWithoutUserInput | WeeklyReportCreateOrConnectWithoutUserInput[]
    upsert?: WeeklyReportUpsertWithWhereUniqueWithoutUserInput | WeeklyReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeeklyReportCreateManyUserInputEnvelope
    set?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    disconnect?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    delete?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    connect?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    update?: WeeklyReportUpdateWithWhereUniqueWithoutUserInput | WeeklyReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeeklyReportUpdateManyWithWhereWithoutUserInput | WeeklyReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeeklyReportScalarWhereInput | WeeklyReportScalarWhereInput[]
  }

  export type MonthlyTargetUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlyTargetCreateWithoutUserInput, MonthlyTargetUncheckedCreateWithoutUserInput> | MonthlyTargetCreateWithoutUserInput[] | MonthlyTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyTargetCreateOrConnectWithoutUserInput | MonthlyTargetCreateOrConnectWithoutUserInput[]
    upsert?: MonthlyTargetUpsertWithWhereUniqueWithoutUserInput | MonthlyTargetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlyTargetCreateManyUserInputEnvelope
    set?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    disconnect?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    delete?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    connect?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    update?: MonthlyTargetUpdateWithWhereUniqueWithoutUserInput | MonthlyTargetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlyTargetUpdateManyWithWhereWithoutUserInput | MonthlyTargetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlyTargetScalarWhereInput | MonthlyTargetScalarWhereInput[]
  }

  export type FindingHistoryUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<FindingHistoryCreateWithoutUpdatedByInput, FindingHistoryUncheckedCreateWithoutUpdatedByInput> | FindingHistoryCreateWithoutUpdatedByInput[] | FindingHistoryUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutUpdatedByInput | FindingHistoryCreateOrConnectWithoutUpdatedByInput[]
    upsert?: FindingHistoryUpsertWithWhereUniqueWithoutUpdatedByInput | FindingHistoryUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: FindingHistoryCreateManyUpdatedByInputEnvelope
    set?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    disconnect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    delete?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    update?: FindingHistoryUpdateWithWhereUniqueWithoutUpdatedByInput | FindingHistoryUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: FindingHistoryUpdateManyWithWhereWithoutUpdatedByInput | FindingHistoryUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: FindingHistoryScalarWhereInput | FindingHistoryScalarWhereInput[]
  }

  export type EmailNotificationLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailNotificationLogCreateWithoutUserInput, EmailNotificationLogUncheckedCreateWithoutUserInput> | EmailNotificationLogCreateWithoutUserInput[] | EmailNotificationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailNotificationLogCreateOrConnectWithoutUserInput | EmailNotificationLogCreateOrConnectWithoutUserInput[]
    upsert?: EmailNotificationLogUpsertWithWhereUniqueWithoutUserInput | EmailNotificationLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailNotificationLogCreateManyUserInputEnvelope
    set?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    disconnect?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    delete?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    connect?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    update?: EmailNotificationLogUpdateWithWhereUniqueWithoutUserInput | EmailNotificationLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailNotificationLogUpdateManyWithWhereWithoutUserInput | EmailNotificationLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailNotificationLogScalarWhereInput | EmailNotificationLogScalarWhereInput[]
  }

  export type WeeklyReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeeklyReportCreateWithoutUserInput, WeeklyReportUncheckedCreateWithoutUserInput> | WeeklyReportCreateWithoutUserInput[] | WeeklyReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyReportCreateOrConnectWithoutUserInput | WeeklyReportCreateOrConnectWithoutUserInput[]
    upsert?: WeeklyReportUpsertWithWhereUniqueWithoutUserInput | WeeklyReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeeklyReportCreateManyUserInputEnvelope
    set?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    disconnect?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    delete?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    connect?: WeeklyReportWhereUniqueInput | WeeklyReportWhereUniqueInput[]
    update?: WeeklyReportUpdateWithWhereUniqueWithoutUserInput | WeeklyReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeeklyReportUpdateManyWithWhereWithoutUserInput | WeeklyReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeeklyReportScalarWhereInput | WeeklyReportScalarWhereInput[]
  }

  export type MonthlyTargetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlyTargetCreateWithoutUserInput, MonthlyTargetUncheckedCreateWithoutUserInput> | MonthlyTargetCreateWithoutUserInput[] | MonthlyTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyTargetCreateOrConnectWithoutUserInput | MonthlyTargetCreateOrConnectWithoutUserInput[]
    upsert?: MonthlyTargetUpsertWithWhereUniqueWithoutUserInput | MonthlyTargetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlyTargetCreateManyUserInputEnvelope
    set?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    disconnect?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    delete?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    connect?: MonthlyTargetWhereUniqueInput | MonthlyTargetWhereUniqueInput[]
    update?: MonthlyTargetUpdateWithWhereUniqueWithoutUserInput | MonthlyTargetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlyTargetUpdateManyWithWhereWithoutUserInput | MonthlyTargetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlyTargetScalarWhereInput | MonthlyTargetScalarWhereInput[]
  }

  export type FindingHistoryUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<FindingHistoryCreateWithoutUpdatedByInput, FindingHistoryUncheckedCreateWithoutUpdatedByInput> | FindingHistoryCreateWithoutUpdatedByInput[] | FindingHistoryUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutUpdatedByInput | FindingHistoryCreateOrConnectWithoutUpdatedByInput[]
    upsert?: FindingHistoryUpsertWithWhereUniqueWithoutUpdatedByInput | FindingHistoryUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: FindingHistoryCreateManyUpdatedByInputEnvelope
    set?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    disconnect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    delete?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    update?: FindingHistoryUpdateWithWhereUniqueWithoutUpdatedByInput | FindingHistoryUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: FindingHistoryUpdateManyWithWhereWithoutUpdatedByInput | FindingHistoryUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: FindingHistoryScalarWhereInput | FindingHistoryScalarWhereInput[]
  }

  export type EmailNotificationLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailNotificationLogCreateWithoutUserInput, EmailNotificationLogUncheckedCreateWithoutUserInput> | EmailNotificationLogCreateWithoutUserInput[] | EmailNotificationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailNotificationLogCreateOrConnectWithoutUserInput | EmailNotificationLogCreateOrConnectWithoutUserInput[]
    upsert?: EmailNotificationLogUpsertWithWhereUniqueWithoutUserInput | EmailNotificationLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailNotificationLogCreateManyUserInputEnvelope
    set?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    disconnect?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    delete?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    connect?: EmailNotificationLogWhereUniqueInput | EmailNotificationLogWhereUniqueInput[]
    update?: EmailNotificationLogUpdateWithWhereUniqueWithoutUserInput | EmailNotificationLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailNotificationLogUpdateManyWithWhereWithoutUserInput | EmailNotificationLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailNotificationLogScalarWhereInput | EmailNotificationLogScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type FindingHistoryCreateNestedManyWithoutReportInput = {
    create?: XOR<FindingHistoryCreateWithoutReportInput, FindingHistoryUncheckedCreateWithoutReportInput> | FindingHistoryCreateWithoutReportInput[] | FindingHistoryUncheckedCreateWithoutReportInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutReportInput | FindingHistoryCreateOrConnectWithoutReportInput[]
    createMany?: FindingHistoryCreateManyReportInputEnvelope
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
  }

  export type FindingHistoryUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<FindingHistoryCreateWithoutReportInput, FindingHistoryUncheckedCreateWithoutReportInput> | FindingHistoryCreateWithoutReportInput[] | FindingHistoryUncheckedCreateWithoutReportInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutReportInput | FindingHistoryCreateOrConnectWithoutReportInput[]
    createMany?: FindingHistoryCreateManyReportInputEnvelope
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsInput, UserUpdateWithoutReportsInput>, UserUncheckedUpdateWithoutReportsInput>
  }

  export type FindingHistoryUpdateManyWithoutReportNestedInput = {
    create?: XOR<FindingHistoryCreateWithoutReportInput, FindingHistoryUncheckedCreateWithoutReportInput> | FindingHistoryCreateWithoutReportInput[] | FindingHistoryUncheckedCreateWithoutReportInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutReportInput | FindingHistoryCreateOrConnectWithoutReportInput[]
    upsert?: FindingHistoryUpsertWithWhereUniqueWithoutReportInput | FindingHistoryUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: FindingHistoryCreateManyReportInputEnvelope
    set?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    disconnect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    delete?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    update?: FindingHistoryUpdateWithWhereUniqueWithoutReportInput | FindingHistoryUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: FindingHistoryUpdateManyWithWhereWithoutReportInput | FindingHistoryUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: FindingHistoryScalarWhereInput | FindingHistoryScalarWhereInput[]
  }

  export type FindingHistoryUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<FindingHistoryCreateWithoutReportInput, FindingHistoryUncheckedCreateWithoutReportInput> | FindingHistoryCreateWithoutReportInput[] | FindingHistoryUncheckedCreateWithoutReportInput[]
    connectOrCreate?: FindingHistoryCreateOrConnectWithoutReportInput | FindingHistoryCreateOrConnectWithoutReportInput[]
    upsert?: FindingHistoryUpsertWithWhereUniqueWithoutReportInput | FindingHistoryUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: FindingHistoryCreateManyReportInputEnvelope
    set?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    disconnect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    delete?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    connect?: FindingHistoryWhereUniqueInput | FindingHistoryWhereUniqueInput[]
    update?: FindingHistoryUpdateWithWhereUniqueWithoutReportInput | FindingHistoryUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: FindingHistoryUpdateManyWithWhereWithoutReportInput | FindingHistoryUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: FindingHistoryScalarWhereInput | FindingHistoryScalarWhereInput[]
  }

  export type WeeklyReportCreateNestedOneWithoutFindingHistoryInput = {
    create?: XOR<WeeklyReportCreateWithoutFindingHistoryInput, WeeklyReportUncheckedCreateWithoutFindingHistoryInput>
    connectOrCreate?: WeeklyReportCreateOrConnectWithoutFindingHistoryInput
    connect?: WeeklyReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFindingAuditsInput = {
    create?: XOR<UserCreateWithoutFindingAuditsInput, UserUncheckedCreateWithoutFindingAuditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFindingAuditsInput
    connect?: UserWhereUniqueInput
  }

  export type WeeklyReportUpdateOneRequiredWithoutFindingHistoryNestedInput = {
    create?: XOR<WeeklyReportCreateWithoutFindingHistoryInput, WeeklyReportUncheckedCreateWithoutFindingHistoryInput>
    connectOrCreate?: WeeklyReportCreateOrConnectWithoutFindingHistoryInput
    upsert?: WeeklyReportUpsertWithoutFindingHistoryInput
    connect?: WeeklyReportWhereUniqueInput
    update?: XOR<XOR<WeeklyReportUpdateToOneWithWhereWithoutFindingHistoryInput, WeeklyReportUpdateWithoutFindingHistoryInput>, WeeklyReportUncheckedUpdateWithoutFindingHistoryInput>
  }

  export type UserUpdateOneRequiredWithoutFindingAuditsNestedInput = {
    create?: XOR<UserCreateWithoutFindingAuditsInput, UserUncheckedCreateWithoutFindingAuditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFindingAuditsInput
    upsert?: UserUpsertWithoutFindingAuditsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFindingAuditsInput, UserUpdateWithoutFindingAuditsInput>, UserUncheckedUpdateWithoutFindingAuditsInput>
  }

  export type UserCreateNestedOneWithoutTargetsInput = {
    create?: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTargetsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTargetsInput
    upsert?: UserUpsertWithoutTargetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTargetsInput, UserUpdateWithoutTargetsInput>, UserUncheckedUpdateWithoutTargetsInput>
  }

  export type UserCreateNestedOneWithoutEmailLogsInput = {
    create?: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmailLogsNestedInput = {
    create?: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailLogsInput
    upsert?: UserUpsertWithoutEmailLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailLogsInput, UserUpdateWithoutEmailLogsInput>, UserUncheckedUpdateWithoutEmailLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type WeeklyReportCreateWithoutUserInput = {
    id?: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
    findingHistory?: FindingHistoryCreateNestedManyWithoutReportInput
  }

  export type WeeklyReportUncheckedCreateWithoutUserInput = {
    id?: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
    findingHistory?: FindingHistoryUncheckedCreateNestedManyWithoutReportInput
  }

  export type WeeklyReportCreateOrConnectWithoutUserInput = {
    where: WeeklyReportWhereUniqueInput
    create: XOR<WeeklyReportCreateWithoutUserInput, WeeklyReportUncheckedCreateWithoutUserInput>
  }

  export type WeeklyReportCreateManyUserInputEnvelope = {
    data: WeeklyReportCreateManyUserInput | WeeklyReportCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MonthlyTargetCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    monthYear: string
    locTarget?: number
    messVisitTarget?: number
    dressCodeTarget?: number
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyTargetUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    monthYear: string
    locTarget?: number
    messVisitTarget?: number
    dressCodeTarget?: number
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyTargetCreateOrConnectWithoutUserInput = {
    where: MonthlyTargetWhereUniqueInput
    create: XOR<MonthlyTargetCreateWithoutUserInput, MonthlyTargetUncheckedCreateWithoutUserInput>
  }

  export type MonthlyTargetCreateManyUserInputEnvelope = {
    data: MonthlyTargetCreateManyUserInput | MonthlyTargetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FindingHistoryCreateWithoutUpdatedByInput = {
    id?: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
    report: WeeklyReportCreateNestedOneWithoutFindingHistoryInput
  }

  export type FindingHistoryUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    reportId: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
  }

  export type FindingHistoryCreateOrConnectWithoutUpdatedByInput = {
    where: FindingHistoryWhereUniqueInput
    create: XOR<FindingHistoryCreateWithoutUpdatedByInput, FindingHistoryUncheckedCreateWithoutUpdatedByInput>
  }

  export type FindingHistoryCreateManyUpdatedByInputEnvelope = {
    data: FindingHistoryCreateManyUpdatedByInput | FindingHistoryCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type EmailNotificationLogCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails?: string | null
    subject: string
    status?: string
    sentAt?: Date | string
    errorMessage?: string | null
  }

  export type EmailNotificationLogUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails?: string | null
    subject: string
    status?: string
    sentAt?: Date | string
    errorMessage?: string | null
  }

  export type EmailNotificationLogCreateOrConnectWithoutUserInput = {
    where: EmailNotificationLogWhereUniqueInput
    create: XOR<EmailNotificationLogCreateWithoutUserInput, EmailNotificationLogUncheckedCreateWithoutUserInput>
  }

  export type EmailNotificationLogCreateManyUserInputEnvelope = {
    data: EmailNotificationLogCreateManyUserInput | EmailNotificationLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WeeklyReportUpsertWithWhereUniqueWithoutUserInput = {
    where: WeeklyReportWhereUniqueInput
    update: XOR<WeeklyReportUpdateWithoutUserInput, WeeklyReportUncheckedUpdateWithoutUserInput>
    create: XOR<WeeklyReportCreateWithoutUserInput, WeeklyReportUncheckedCreateWithoutUserInput>
  }

  export type WeeklyReportUpdateWithWhereUniqueWithoutUserInput = {
    where: WeeklyReportWhereUniqueInput
    data: XOR<WeeklyReportUpdateWithoutUserInput, WeeklyReportUncheckedUpdateWithoutUserInput>
  }

  export type WeeklyReportUpdateManyWithWhereWithoutUserInput = {
    where: WeeklyReportScalarWhereInput
    data: XOR<WeeklyReportUpdateManyMutationInput, WeeklyReportUncheckedUpdateManyWithoutUserInput>
  }

  export type WeeklyReportScalarWhereInput = {
    AND?: WeeklyReportScalarWhereInput | WeeklyReportScalarWhereInput[]
    OR?: WeeklyReportScalarWhereInput[]
    NOT?: WeeklyReportScalarWhereInput | WeeklyReportScalarWhereInput[]
    id?: StringFilter<"WeeklyReport"> | string
    userId?: StringFilter<"WeeklyReport"> | string
    monthYear?: StringFilter<"WeeklyReport"> | string
    year?: IntFilter<"WeeklyReport"> | number
    month?: IntFilter<"WeeklyReport"> | number
    week?: IntFilter<"WeeklyReport"> | number
    marketVisitQty?: IntFilter<"WeeklyReport"> | number
    marketVisitFindingQty?: IntFilter<"WeeklyReport"> | number
    solvedQty?: IntFilter<"WeeklyReport"> | number
    pendingQty?: IntFilter<"WeeklyReport"> | number
    locSubmittedQty?: IntFilter<"WeeklyReport"> | number
    locFindingDayQty?: FloatFilter<"WeeklyReport"> | number
    dressCodeQty?: IntFilter<"WeeklyReport"> | number
    dressCodeFindingQty?: IntFilter<"WeeklyReport"> | number
    messVisitQty?: IntFilter<"WeeklyReport"> | number
    messVisitFindingQty?: IntFilter<"WeeklyReport"> | number
    status?: StringFilter<"WeeklyReport"> | string
    deadline?: DateTimeFilter<"WeeklyReport"> | Date | string
    submittedAt?: DateTimeFilter<"WeeklyReport"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyReport"> | Date | string
    notes?: StringNullableFilter<"WeeklyReport"> | string | null
  }

  export type MonthlyTargetUpsertWithWhereUniqueWithoutUserInput = {
    where: MonthlyTargetWhereUniqueInput
    update: XOR<MonthlyTargetUpdateWithoutUserInput, MonthlyTargetUncheckedUpdateWithoutUserInput>
    create: XOR<MonthlyTargetCreateWithoutUserInput, MonthlyTargetUncheckedCreateWithoutUserInput>
  }

  export type MonthlyTargetUpdateWithWhereUniqueWithoutUserInput = {
    where: MonthlyTargetWhereUniqueInput
    data: XOR<MonthlyTargetUpdateWithoutUserInput, MonthlyTargetUncheckedUpdateWithoutUserInput>
  }

  export type MonthlyTargetUpdateManyWithWhereWithoutUserInput = {
    where: MonthlyTargetScalarWhereInput
    data: XOR<MonthlyTargetUpdateManyMutationInput, MonthlyTargetUncheckedUpdateManyWithoutUserInput>
  }

  export type MonthlyTargetScalarWhereInput = {
    AND?: MonthlyTargetScalarWhereInput | MonthlyTargetScalarWhereInput[]
    OR?: MonthlyTargetScalarWhereInput[]
    NOT?: MonthlyTargetScalarWhereInput | MonthlyTargetScalarWhereInput[]
    id?: StringFilter<"MonthlyTarget"> | string
    userId?: StringFilter<"MonthlyTarget"> | string
    year?: IntFilter<"MonthlyTarget"> | number
    month?: IntFilter<"MonthlyTarget"> | number
    monthYear?: StringFilter<"MonthlyTarget"> | string
    locTarget?: IntFilter<"MonthlyTarget"> | number
    messVisitTarget?: IntFilter<"MonthlyTarget"> | number
    dressCodeTarget?: IntFilter<"MonthlyTarget"> | number
    isLocked?: BoolFilter<"MonthlyTarget"> | boolean
    createdAt?: DateTimeFilter<"MonthlyTarget"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyTarget"> | Date | string
  }

  export type FindingHistoryUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: FindingHistoryWhereUniqueInput
    update: XOR<FindingHistoryUpdateWithoutUpdatedByInput, FindingHistoryUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<FindingHistoryCreateWithoutUpdatedByInput, FindingHistoryUncheckedCreateWithoutUpdatedByInput>
  }

  export type FindingHistoryUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: FindingHistoryWhereUniqueInput
    data: XOR<FindingHistoryUpdateWithoutUpdatedByInput, FindingHistoryUncheckedUpdateWithoutUpdatedByInput>
  }

  export type FindingHistoryUpdateManyWithWhereWithoutUpdatedByInput = {
    where: FindingHistoryScalarWhereInput
    data: XOR<FindingHistoryUpdateManyMutationInput, FindingHistoryUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type FindingHistoryScalarWhereInput = {
    AND?: FindingHistoryScalarWhereInput | FindingHistoryScalarWhereInput[]
    OR?: FindingHistoryScalarWhereInput[]
    NOT?: FindingHistoryScalarWhereInput | FindingHistoryScalarWhereInput[]
    id?: StringFilter<"FindingHistory"> | string
    reportId?: StringFilter<"FindingHistory"> | string
    updatedById?: StringFilter<"FindingHistory"> | string
    previousSolved?: IntFilter<"FindingHistory"> | number
    newSolved?: IntFilter<"FindingHistory"> | number
    previousPending?: IntFilter<"FindingHistory"> | number
    newPending?: IntFilter<"FindingHistory"> | number
    remark?: StringNullableFilter<"FindingHistory"> | string | null
    createdAt?: DateTimeFilter<"FindingHistory"> | Date | string
  }

  export type EmailNotificationLogUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailNotificationLogWhereUniqueInput
    update: XOR<EmailNotificationLogUpdateWithoutUserInput, EmailNotificationLogUncheckedUpdateWithoutUserInput>
    create: XOR<EmailNotificationLogCreateWithoutUserInput, EmailNotificationLogUncheckedCreateWithoutUserInput>
  }

  export type EmailNotificationLogUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailNotificationLogWhereUniqueInput
    data: XOR<EmailNotificationLogUpdateWithoutUserInput, EmailNotificationLogUncheckedUpdateWithoutUserInput>
  }

  export type EmailNotificationLogUpdateManyWithWhereWithoutUserInput = {
    where: EmailNotificationLogScalarWhereInput
    data: XOR<EmailNotificationLogUpdateManyMutationInput, EmailNotificationLogUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailNotificationLogScalarWhereInput = {
    AND?: EmailNotificationLogScalarWhereInput | EmailNotificationLogScalarWhereInput[]
    OR?: EmailNotificationLogScalarWhereInput[]
    NOT?: EmailNotificationLogScalarWhereInput | EmailNotificationLogScalarWhereInput[]
    id?: StringFilter<"EmailNotificationLog"> | string
    userId?: StringFilter<"EmailNotificationLog"> | string
    year?: IntFilter<"EmailNotificationLog"> | number
    month?: IntFilter<"EmailNotificationLog"> | number
    week?: IntFilter<"EmailNotificationLog"> | number
    emailType?: StringFilter<"EmailNotificationLog"> | string
    toEmail?: StringFilter<"EmailNotificationLog"> | string
    ccEmails?: StringNullableFilter<"EmailNotificationLog"> | string | null
    subject?: StringFilter<"EmailNotificationLog"> | string
    status?: StringFilter<"EmailNotificationLog"> | string
    sentAt?: DateTimeFilter<"EmailNotificationLog"> | Date | string
    errorMessage?: StringNullableFilter<"EmailNotificationLog"> | string | null
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    targets?: MonthlyTargetCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryCreateNestedManyWithoutUpdatedByInput
    emailLogs?: EmailNotificationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    targets?: MonthlyTargetUncheckedCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryUncheckedCreateNestedManyWithoutUpdatedByInput
    emailLogs?: EmailNotificationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type FindingHistoryCreateWithoutReportInput = {
    id?: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
    updatedBy: UserCreateNestedOneWithoutFindingAuditsInput
  }

  export type FindingHistoryUncheckedCreateWithoutReportInput = {
    id?: string
    updatedById: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
  }

  export type FindingHistoryCreateOrConnectWithoutReportInput = {
    where: FindingHistoryWhereUniqueInput
    create: XOR<FindingHistoryCreateWithoutReportInput, FindingHistoryUncheckedCreateWithoutReportInput>
  }

  export type FindingHistoryCreateManyReportInputEnvelope = {
    data: FindingHistoryCreateManyReportInput | FindingHistoryCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: MonthlyTargetUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUpdateManyWithoutUpdatedByNestedInput
    emailLogs?: EmailNotificationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: MonthlyTargetUncheckedUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUncheckedUpdateManyWithoutUpdatedByNestedInput
    emailLogs?: EmailNotificationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FindingHistoryUpsertWithWhereUniqueWithoutReportInput = {
    where: FindingHistoryWhereUniqueInput
    update: XOR<FindingHistoryUpdateWithoutReportInput, FindingHistoryUncheckedUpdateWithoutReportInput>
    create: XOR<FindingHistoryCreateWithoutReportInput, FindingHistoryUncheckedCreateWithoutReportInput>
  }

  export type FindingHistoryUpdateWithWhereUniqueWithoutReportInput = {
    where: FindingHistoryWhereUniqueInput
    data: XOR<FindingHistoryUpdateWithoutReportInput, FindingHistoryUncheckedUpdateWithoutReportInput>
  }

  export type FindingHistoryUpdateManyWithWhereWithoutReportInput = {
    where: FindingHistoryScalarWhereInput
    data: XOR<FindingHistoryUpdateManyMutationInput, FindingHistoryUncheckedUpdateManyWithoutReportInput>
  }

  export type WeeklyReportCreateWithoutFindingHistoryInput = {
    id?: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
    user: UserCreateNestedOneWithoutReportsInput
  }

  export type WeeklyReportUncheckedCreateWithoutFindingHistoryInput = {
    id?: string
    userId: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
  }

  export type WeeklyReportCreateOrConnectWithoutFindingHistoryInput = {
    where: WeeklyReportWhereUniqueInput
    create: XOR<WeeklyReportCreateWithoutFindingHistoryInput, WeeklyReportUncheckedCreateWithoutFindingHistoryInput>
  }

  export type UserCreateWithoutFindingAuditsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportCreateNestedManyWithoutUserInput
    targets?: MonthlyTargetCreateNestedManyWithoutUserInput
    emailLogs?: EmailNotificationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFindingAuditsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportUncheckedCreateNestedManyWithoutUserInput
    targets?: MonthlyTargetUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailNotificationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFindingAuditsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFindingAuditsInput, UserUncheckedCreateWithoutFindingAuditsInput>
  }

  export type WeeklyReportUpsertWithoutFindingHistoryInput = {
    update: XOR<WeeklyReportUpdateWithoutFindingHistoryInput, WeeklyReportUncheckedUpdateWithoutFindingHistoryInput>
    create: XOR<WeeklyReportCreateWithoutFindingHistoryInput, WeeklyReportUncheckedCreateWithoutFindingHistoryInput>
    where?: WeeklyReportWhereInput
  }

  export type WeeklyReportUpdateToOneWithWhereWithoutFindingHistoryInput = {
    where?: WeeklyReportWhereInput
    data: XOR<WeeklyReportUpdateWithoutFindingHistoryInput, WeeklyReportUncheckedUpdateWithoutFindingHistoryInput>
  }

  export type WeeklyReportUpdateWithoutFindingHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutReportsNestedInput
  }

  export type WeeklyReportUncheckedUpdateWithoutFindingHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpsertWithoutFindingAuditsInput = {
    update: XOR<UserUpdateWithoutFindingAuditsInput, UserUncheckedUpdateWithoutFindingAuditsInput>
    create: XOR<UserCreateWithoutFindingAuditsInput, UserUncheckedCreateWithoutFindingAuditsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFindingAuditsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFindingAuditsInput, UserUncheckedUpdateWithoutFindingAuditsInput>
  }

  export type UserUpdateWithoutFindingAuditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUpdateManyWithoutUserNestedInput
    targets?: MonthlyTargetUpdateManyWithoutUserNestedInput
    emailLogs?: EmailNotificationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFindingAuditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUncheckedUpdateManyWithoutUserNestedInput
    targets?: MonthlyTargetUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailNotificationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTargetsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryCreateNestedManyWithoutUpdatedByInput
    emailLogs?: EmailNotificationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTargetsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportUncheckedCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryUncheckedCreateNestedManyWithoutUpdatedByInput
    emailLogs?: EmailNotificationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTargetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
  }

  export type UserUpsertWithoutTargetsInput = {
    update: XOR<UserUpdateWithoutTargetsInput, UserUncheckedUpdateWithoutTargetsInput>
    create: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTargetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTargetsInput, UserUncheckedUpdateWithoutTargetsInput>
  }

  export type UserUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUpdateManyWithoutUpdatedByNestedInput
    emailLogs?: EmailNotificationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUncheckedUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUncheckedUpdateManyWithoutUpdatedByNestedInput
    emailLogs?: EmailNotificationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEmailLogsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportCreateNestedManyWithoutUserInput
    targets?: MonthlyTargetCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutEmailLogsInput = {
    id?: string
    staffId: string
    name: string
    designation: string
    zone: string
    email: string
    mobile?: string | null
    role?: string
    status?: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: WeeklyReportUncheckedCreateNestedManyWithoutUserInput
    targets?: MonthlyTargetUncheckedCreateNestedManyWithoutUserInput
    findingAudits?: FindingHistoryUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutEmailLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
  }

  export type UserUpsertWithoutEmailLogsInput = {
    update: XOR<UserUpdateWithoutEmailLogsInput, UserUncheckedUpdateWithoutEmailLogsInput>
    create: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailLogsInput, UserUncheckedUpdateWithoutEmailLogsInput>
  }

  export type UserUpdateWithoutEmailLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUpdateManyWithoutUserNestedInput
    targets?: MonthlyTargetUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: WeeklyReportUncheckedUpdateManyWithoutUserNestedInput
    targets?: MonthlyTargetUncheckedUpdateManyWithoutUserNestedInput
    findingAudits?: FindingHistoryUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type WeeklyReportCreateManyUserInput = {
    id?: string
    monthYear: string
    year: number
    month: number
    week: number
    marketVisitQty?: number
    marketVisitFindingQty?: number
    solvedQty?: number
    pendingQty?: number
    locSubmittedQty?: number
    locFindingDayQty?: number
    dressCodeQty?: number
    dressCodeFindingQty?: number
    messVisitQty?: number
    messVisitFindingQty?: number
    status?: string
    deadline: Date | string
    submittedAt?: Date | string
    updatedAt?: Date | string
    notes?: string | null
  }

  export type MonthlyTargetCreateManyUserInput = {
    id?: string
    year: number
    month: number
    monthYear: string
    locTarget?: number
    messVisitTarget?: number
    dressCodeTarget?: number
    isLocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FindingHistoryCreateManyUpdatedByInput = {
    id?: string
    reportId: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
  }

  export type EmailNotificationLogCreateManyUserInput = {
    id?: string
    year: number
    month: number
    week: number
    emailType: string
    toEmail: string
    ccEmails?: string | null
    subject: string
    status?: string
    sentAt?: Date | string
    errorMessage?: string | null
  }

  export type WeeklyReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    findingHistory?: FindingHistoryUpdateManyWithoutReportNestedInput
  }

  export type WeeklyReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    findingHistory?: FindingHistoryUncheckedUpdateManyWithoutReportNestedInput
  }

  export type WeeklyReportUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    marketVisitQty?: IntFieldUpdateOperationsInput | number
    marketVisitFindingQty?: IntFieldUpdateOperationsInput | number
    solvedQty?: IntFieldUpdateOperationsInput | number
    pendingQty?: IntFieldUpdateOperationsInput | number
    locSubmittedQty?: IntFieldUpdateOperationsInput | number
    locFindingDayQty?: FloatFieldUpdateOperationsInput | number
    dressCodeQty?: IntFieldUpdateOperationsInput | number
    dressCodeFindingQty?: IntFieldUpdateOperationsInput | number
    messVisitQty?: IntFieldUpdateOperationsInput | number
    messVisitFindingQty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MonthlyTargetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyTargetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyTargetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    locTarget?: IntFieldUpdateOperationsInput | number
    messVisitTarget?: IntFieldUpdateOperationsInput | number
    dressCodeTarget?: IntFieldUpdateOperationsInput | number
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingHistoryUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: WeeklyReportUpdateOneRequiredWithoutFindingHistoryNestedInput
  }

  export type FindingHistoryUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingHistoryUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailNotificationLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmailNotificationLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmailNotificationLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    week?: IntFieldUpdateOperationsInput | number
    emailType?: StringFieldUpdateOperationsInput | string
    toEmail?: StringFieldUpdateOperationsInput | string
    ccEmails?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FindingHistoryCreateManyReportInput = {
    id?: string
    updatedById: string
    previousSolved: number
    newSolved: number
    previousPending: number
    newPending: number
    remark?: string | null
    createdAt?: Date | string
  }

  export type FindingHistoryUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: UserUpdateOneRequiredWithoutFindingAuditsNestedInput
  }

  export type FindingHistoryUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingHistoryUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    previousSolved?: IntFieldUpdateOperationsInput | number
    newSolved?: IntFieldUpdateOperationsInput | number
    previousPending?: IntFieldUpdateOperationsInput | number
    newPending?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}