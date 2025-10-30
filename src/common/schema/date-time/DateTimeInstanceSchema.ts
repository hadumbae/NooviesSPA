import {z} from "zod";
import {DateTime} from "luxon";

/**
 * A Zod schema that validates whether a value is a Luxon `DateTime` instance.
 *
 * @remarks
 * - Uses `z.custom` to perform a runtime check with `instanceof DateTime`.
 * - Useful for validating objects that must be Luxon `DateTime` instances rather than plain
 *   JavaScript `Date` objects or ISO strings.
 * - Provides a clear validation message when the value is not a `DateTime`.
 *
 * @example
 * ```ts
 * import { DateTime } from "luxon";
 * import { DateTimeInstanceSchema } from "./schemas";
 *
 * const dt = DateTime.now();
 * DateTimeInstanceSchema.parse(dt); // ✅ succeeds
 *
 * const invalid = new Date();
 * DateTimeInstanceSchema.parse(invalid); // ❌ throws validation error
 * ```
 *
 * @see {@link DateTime} for Luxon `DateTime` documentation.
 */
export const DateTimeInstanceSchema = z.custom<DateTime>(
    date => date instanceof DateTime,
    {message: "Must be an instance of Luxon's DateTime."},
);