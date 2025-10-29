import {z} from "zod";

/**
 * A Zod schema for validating a Unix timestamp in **seconds**.
 *
 * This schema enforces the following rules:
 * - **Must be a number**: Throws `"Must be a valid Unix timestamp number."` if the type is not a number.
 * - **Must be an integer**: Throws `"Must be an integer."` if the number has a decimal.
 * - **Must not be negative**: Throws `"Must not be negative."`.
 * - **Must be >= 946684800**: This is the Unix timestamp for Jan 1, 2000. Throws `"Timestamp is too old."`.
 * - **Must be <= current time + 60 seconds**: Throws `"Timestamp seems to be in the future!"` if too far ahead.
 *
 * @remarks
 * This schema is useful for validating input from systems that use Unix timestamps, such as
 * APIs, event logs, or tokens. It assumes timestamps are in seconds, not milliseconds.
 *
 * @example
 * ```ts
 * UnixTimestampSchema.parse(1609459200); // ✅ Jan 1, 2021
 * UnixTimestampSchema.parse(Date.now()); // ❌ Likely fails (ms instead of s)
 * ```
 */
export const UnixTimestampSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a valid Unix timestamp number."})
    .int({message: "Must be an integer."})
    .nonnegative({message: "Must not be negative."})
    .gte(946684800, {message: "Timestamp is too old."})
    .lte(Math.floor(Date.now() / 1000) + 60, {message: "Timestamp seems to be in the future!"});

/**
 * A TypeScript type inferred from {@link UnixTimestampSchema}.
 * Represents a validated Unix timestamp in seconds.
 */
export type UnixTimestamp = z.infer<typeof UnixTimestampSchema>;