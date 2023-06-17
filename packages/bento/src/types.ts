import { Request } from 'node-fetch';

/** Flattens any given type into a flat object type. */
export declare type Obj<T> = T extends {
  [key: string | number]: any;
}
  ? T extends infer U
    ? {
        [K in keyof U]: U[K];
      }
    : never
  : never;
/** Retrieves all non-nullish value types of an object dictionary. */
export declare type ObjValues<T> = T[keyof T] extends infer U
  ? U extends null | undefined | never | void
    ? never
    : U
  : never;
/** Spreads a list of object types into one. */
export declare type Spread<T extends readonly [...any]> = T extends readonly [infer Head, ...infer Tail]
  ? Obj<Head & Spread<Tail>>
  : unknown;
/** Narrows a given key type to string-accessible keys. */
export declare type OfString<K> = `${Extract<K, string | number>}`;
/** Narrows a given key type to literal keys. */
export declare type OfLiteral<K> = string extends K
  ? never
  : number extends K
  ? never
  : Exclude<K, keyof {} | keyof []>;
/** Narrows object type to only literal key fields. */
export declare type NamedFields<T> = Obj<{
  readonly [K in keyof T as OfLiteral<K>]: K extends OfString<K> ? T[K] : never;
}>;
/** Narrows object type to only variadic property-access fields. */
export declare type VariadicFields<T> = Obj<{
  readonly [K in Exclude<keyof T, keyof NamedFields<T> | number>]: T[K];
}>;
/** Turns a union type into an overload/intersection type. */
export declare type Overload<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/** Unwraps a promise type. */
export declare type TypeOfPromise<U> = U extends void ? any : U extends Promise<infer T> ? T : never;

/** A factory function asynchronously returns a one- or two-level deep dictionary when called. */
export declare type CacheFactory<T> = (...params: any) => Promise<T>;
/** Utility to derive the returned cache type of a given `CacheFactory`. */
export declare type TypeOfCacheFactory<T> = T extends CacheFactory<infer U> ? U : never;
/** In case no BentoUI.Cache types are set, the fallback takes arbitrary inputs. */
export declare type GetFromCacheFallback = (path: [string, string] | [string]) => Promise<unknown>;
/** @internal
 * A union of accessor functions per unnamed/variadic key available on a given object type.
 * The accessor functions can be nested once, i.e. in a depth of two. */
declare type VariadicFunction<T> = VariadicFields<T> extends infer U
  ? ObjValues<{
      [K in keyof U]: (path: [K]) => Promise<U[K]>;
    }>
  : never;
/** @internal
 * A union of accessor functions per named property available on a given object type.
 * The accessor functions can be nested once, i.e. in a depth of two. */
declare type PropFunction<T> = NamedFields<T> extends infer U
  ? ObjValues<{
      [K in keyof U]:
        | ((path: [K]) => Promise<U[K]>)
        | (NamedFields<U[K]> extends infer V
            ? ObjValues<{
                [L in keyof V]: (path: [K, L]) => Promise<V[L]>;
              }>
            : never)
        | (VariadicFields<U[K]> extends infer V
            ? ObjValues<{
                [L in keyof V]: (path: [K, L]) => Promise<V[L]>;
              }>
            : never);
    }>
  : never;
/** @internal
 * Combination of prop and variadic accessor functions or never. */
declare type AccessorFunction<T> = T extends Obj<T> ? PropFunction<T> | VariadicFunction<T> : never;
/** @internal
 * The unconstrained shape of BentoUI.Cache from the shared namespace. */
declare type Cache = {
  [K in keyof BentoUI.Cache as OfLiteral<K>]: BentoUI.Cache[K];
};
/** @internal
 * Remaps an array of cache factories to their returned, promisified values */
declare type TypeOfCacheFactoryArray<T extends readonly CacheFactory<any>[]> = {
  [K in keyof T]: TypeOfCacheFactory<T[K]>;
};
/** The combined "cache response" of all combined cache factory functions. */
export declare type CombinedCaches = Obj<Overload<Spread<TypeOfCacheFactoryArray<Cache[keyof Cache]>>>>;
/** Access data from the Bento Cache.
 * @remarks
 * Given a one- or two-length tuple, this function accesses the cache by its
 * keys, one or two levels deep, and returns a Promise of the accessed data. */

export declare type GetFromCache = AccessorFunction<CombinedCaches> extends never
  ? GetFromCacheFallback
  : Overload<AccessorFunction<CombinedCaches>>;
export interface Cookies {
  get(key: string): string | undefined;
}
export interface Preload {
  href: string;
  as: string;
}

export declare namespace BentoUI {
  interface __CacheConstraint {
    [key: string]: readonly CacheFactory<unknown>[];
  }

  export interface Cache extends __CacheConstraint {}

  export function globalState<GlobalState extends GlobalStateTemplate, CacheResponses = GetFromCache>(
    fn: (...params: InitGlobalStateParams<CacheResponses>) => Promise<GlobalState>,
  ): typeof fn;

  export type TypeOfGlobalState<T extends InitGlobalState> = ReturnType<T> extends Promise<infer R>
    ? R extends GlobalStateTemplate
      ? R
      : never
    : never;
  export type TypeOfGlobalProps<T extends InitGlobalState> = TypeOfGlobalState<T>['props'];
  export type TypeOfInitializationData<T extends InitGlobalState> = TypeOfGlobalState<T>['initializationData'];

  export {};
}

export declare type Preloads = Preload[];
export interface OutsmartlyRenderContext {
  country: string;
  city: string;
  region: string;
  cookies: Cookies;
  params: URLSearchParams;
  device: 'mobile' | 'tablet' | 'desktop';
  STATIC_DIR: string;
  getAssignment(featureId: string): string | null;
  assignments: {
    featureId: string;
    variationId: string;
  }[];
}
export interface RenderResult<Props = Record<string, any>> {
  html?: string;
  css?: string;
  src?: string;
  data?: any;
  props?: Props;
}
export interface GlobalStateTemplate<Props = Record<string, any>, InitializationData = any> {
  props: Props;
  initializationData: InitializationData;
}
export declare type InitGlobalStateParams<CacheResponses = GetFromCache> = [
  request: Request,
  cookies: Cookies,
  searchParams: URLSearchParams,
  context: OutsmartlyRenderContext,
  getFromCache: CacheResponses,
];
export declare type InitGlobalState<
  CacheResponses = GetFromCache,
  GlobalState extends Promise<GlobalStateTemplate> = Promise<GlobalStateTemplate>,
> = (...params: InitGlobalStateParams<CacheResponses>) => GlobalState;
