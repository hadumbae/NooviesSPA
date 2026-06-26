/**
 * @fileoverview Utility types for converting and flattening discriminated union types.
 */

/** Converts a union type into an intersection type. */
export type UnionToIntersection<TUnion> =
    (TUnion extends unknown ? (x: TUnion) => void : never) extends (x: infer I) => void ? I : never;

/** Creates a partial type containing all properties from every member of a discriminated union. */
export type UnionFields<TUnion> = Partial<UnionToIntersection<TUnion>>

/** Extracts all keys from every member of a discriminated union type. */
export type UnionKeys<TUnion> = TUnion extends unknown ? keyof TUnion : never;