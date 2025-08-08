import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for validating pagination search parameters.
 *
 * Validates that both `page` and `perPage` are positive numbers,
 * using `CleanedPositiveNumberSchema` which:
 * - Accepts numeric values and numeric strings only.
 * - Does NOT coerce null, undefined, or empty strings to zero.
 * - Ensures values are strictly positive (e.g., `> 0`).
 *
 * Expected shape:
 * ```ts
 * {
 *   page: number;    // positive integer representing current page
 *   perPage: number; // positive integer representing items per page
 * }
 * ```
 */
export const paginationSearchParamSchema = z.object({
    page: CleanedPositiveNumberSchema,
    perPage: CleanedPositiveNumberSchema,
});

