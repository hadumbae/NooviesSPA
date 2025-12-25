import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Pagination values schema.
 *
 * @remarks
 * Represents validated pagination parameters parsed from requests,
 * typically originating from query parameters.
 */
export const PaginationValuesSchema = z.object({
    /** Current page index (1-based). */
    page: CleanedPositiveNumberSchema,

    /** Number of items per page. */
    perPage: CleanedPositiveNumberSchema,
});

/**
 * Inferred pagination values type.
 *
 * @remarks
 * Reflects the validated shape produced by {@link PaginationValuesSchema}.
 */
export type PaginationValues = z.infer<typeof PaginationValuesSchema>;
