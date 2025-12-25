import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Pagination value schema.
 *
 * @remarks
 * Validates a single, cleaned pagination number.
 * Commonly used for parsing individual pagination-related
 * search parameters such as `page` or `perPage`.
 */
export const PaginationValueSchema = z.object({
    /** Cleaned, positive pagination value. */
    value: CleanedPositiveNumberSchema,
});

/**
 * Inferred pagination value type.
 *
 * @remarks
 * Represents the validated output of {@link PaginationValueSchema}.
 */
export type PaginationValue = z.infer<typeof PaginationValueSchema>;
