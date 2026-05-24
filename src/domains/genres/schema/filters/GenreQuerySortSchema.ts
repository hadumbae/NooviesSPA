/**
 * @fileoverview Zod schema and type definitions for Genre sorting options.
 * Specifically handles the validation and transformation of numeric sort orders
 * (e.g., 1 for Ascending, -1 for Descending).
 */

import {z} from "zod";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";
import {MongooseNumericSortOrderSchema} from "@/common/schema/enums/MongooseNumericSortOrderSchema.ts";

/**
 * Schema representing sorting options for a genre query.
 */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessEmptyStringToUndefined(
        MongooseNumericSortOrderSchema.optional()
    ),
});

/**
 * Type representing valid sorting parameters for genre queries.
 */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;