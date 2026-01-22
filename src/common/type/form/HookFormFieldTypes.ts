/**
 * Extracts a single key from an object type that can be disabled.
 *
 * @typeParam TObj - Target object type
 */
export type DisableKey<TObj extends Record<string, unknown>> = keyof TObj;

/**
 * Represents a list of object keys that should be disabled.
 *
 * Commonly used for:
 * - Form field disabling
 * - Feature flag exclusion
 * - Conditional UI logic
 *
 * @typeParam TObj - Target object type
 */
export type DisableKeys<TObj extends Record<string, unknown>> = DisableKey<TObj>[];
