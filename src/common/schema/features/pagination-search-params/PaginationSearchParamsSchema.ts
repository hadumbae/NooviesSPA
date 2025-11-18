import { z } from "zod";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for validating pagination search parameters.
 *
 * Both `page` and `perPage` are optional and must be positive numbers
 * if provided (validated using {@link CleanedPositiveNumberSchema}).
 *
 * Typically used to parse and validate pagination query parameters
 * from URL search params or API requests.
 *
 * @example
 * ```ts
 * import { PaginationSearchParamSchema } from "@/common/schema/features/pagination-search-params/PaginationSearchParamSchema";
 *
 * const queryParams = { page: 2, perPage: 50 };
 * const result = PaginationSearchParamSchema.safeParse(queryParams);
 *
 * if (result.success) {
 *   console.log(result.data.page, result.data.perPage);
 * }
 * ```
 */
export const PaginationSearchParamSchema = z.object({
    /** Optional page number, must be a positive integer if provided. */
    page: CleanedPositiveNumberSchema.optional(),

    /** Optional number of items per page, must be a positive integer if provided. */
    perPage: CleanedPositiveNumberSchema.optional(),
});

/**
 * Type representing validated pagination search parameters.
 *
 * Derived from {@link PaginationSearchParamSchema}.
 */
export type PaginationSearchParams = z.infer<typeof PaginationSearchParamSchema>;

