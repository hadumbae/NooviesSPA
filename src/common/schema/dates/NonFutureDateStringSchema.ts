import { DateTime } from "luxon";
import { DateOnlyStringSchema } from "@/common/schema/dates/DateOnlyStringSchema.ts";

/**
 * **Non-Future Date String Schema**
 *
 * A Zod schema that extends {@link DateOnlyStringSchema} to ensure the date:
 * - Is a valid string in the **`yyyy-MM-dd`** format.
 * - Represents a date that is **today or in the past** (i.e., not in the future).
 *
 * ### Validation Rules
 * 1. The string must conform to the pattern `yyyy-MM-dd`.
 * 2. The parsed date must be valid according to the ISO calendar system.
 * 3. The date must not be after the current UTC time (`DateTime.now()`).
 *
 * ### Example
 * ```ts
 * NonFutureDateStringSchema.parse("2025-10-29"); // ✅ valid if today is Oct 29, 2025 or later
 * NonFutureDateStringSchema.parse("2025-11-01"); // ❌ invalid if today < Nov 1, 2025
 * ```
 *
 * ### Notes
 * - The schema uses Luxon’s {@link DateTime.fromFormat} for date parsing.
 * - Validation issues are added via `ctx.addIssue()` with `fatal: true` for hard failures.
 * - Timezones are not included — validation is based solely on the **local system date**.
 */
export const NonFutureDateStringSchema = DateOnlyStringSchema.superRefine((value, ctx) => {
    const parsedDate = DateTime.fromFormat(value, "yyyy-MM-dd");

    if (!parsedDate.isValid) {
        ctx.addIssue({
            code: "custom",
            path: [],
            message: "Must be a valid date string in the `yyyy-MM-dd` format.",
            fatal: true,
        });
    }

    if (parsedDate > DateTime.now()) {
        ctx.addIssue({
            code: "custom",
            path: [],
            message: "Must be a current or past date.",
            fatal: true,
        });
    }
});
