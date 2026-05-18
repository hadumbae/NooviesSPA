/**
 * @fileoverview Utility type for mapping object keys to any values.
 */

/** A type that mirrors the keys of TValues but allows any value for each property. */
export type AnyValues<TValues> = { [K in keyof TValues]: any }