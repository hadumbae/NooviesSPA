/**
 * @fileoverview Zod schemas for validating genre query parameters.
 * These schemas define the shape and validation rules for both filtering
 * and sorting options used in genre-related queries.
 */

import {z} from "zod";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {MongooseNumericSortOrderSchema} from "@/common/schema/enums/MongooseNumericSortOrderSchema.ts";

/**
 * Schema representing valid filter parameters for a genre query.
 */
export const GenreQueryFilterSchema = z.object({
    name: preprocessEmptyStringToUndefined(
        StringValueSchema
            .max(255, "Must be 255 characters or less.")
            .optional()
    ),
});

/**
 * Schema representing sorting options for a genre query.
 */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessEmptyStringToUndefined(
        MongooseNumericSortOrderSchema.optional()
    ),
});

/**
 * Combined schema including both filter and sorting options for genre queries.
 */
export const GenreQueryOptionSchema = GenreQueryFilterSchema.merge(GenreQuerySortSchema);