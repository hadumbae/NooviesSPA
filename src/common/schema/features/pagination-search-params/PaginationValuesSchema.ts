import { z } from "zod";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for validating pagination values.
 *
 * Ensures that both `page` and `perPage` are positive numbers,
 * using {@link CleanedPositiveNumberSchema} for validation.
 *
 * Can be used for:
 * - Default pagination values from configuration or environment
 * - Pagination parameters in API requests
 * - Any general scenario where pagination values need validation
 *
 * @example
 * ```ts
 * import { PaginationValuesSchema } from "@/common/schema/features/pagination-search-params/PaginationDefaultValuesSchema";
 *
 * const pagination = { page: 2, perPage: 50 };
 * const result = PaginationValuesSchema.safeParse(pagination);
 *
 * if (result.success) {
 *   console.log(result.data.page, result.data.perPage);
 * }
 * ```
 */
export const PaginationValuesSchema = z.object({
    /** Page number; must be a positive integer. */
    page: CleanedPositiveNumberSchema,

    /** Number of items per page; must be a positive integer. */
    perPage: CleanedPositiveNumberSchema,
});

/**
 * Type representing validated pagination values.
 *
 * Derived from {@link PaginationValuesSchema}.
 */
export type PaginationValues = z.infer<typeof PaginationValuesSchema>;
