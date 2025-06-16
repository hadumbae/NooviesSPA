/**
 * Extracts the union of all keys from a discriminated union type.
 *
 * This utility distributes over the union members and gathers all possible keys
 * into a single union of string (or symbol) literals.
 *
 * @template T - A union of object types.
 *
 * @example
 * ```ts
 * type A = { type: "a"; value: number };
 * type B = { type: "b"; name: string };
 * type AB = A | B;
 *
 * type Keys = UnionKeys<AB>; // "type" | "value" | "name"
 * ```
 */
type UnionKeys<T> = T extends any ? keyof T : never;

export default UnionKeys;