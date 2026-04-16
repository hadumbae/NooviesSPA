/**
 * @fileoverview Zod schema and type definitions for Genre filtering options.
 * Handles validation for search criteria used in genre collection queries.
 */

import {z} from "zod";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";

/**
 * Schema representing valid filter parameters for a genre query.
 */
export const GenreQueryFilterSchema = z.object({
    name: preprocessEmptyStringToUndefined(
        StringValueSchema
            .max(50, "Must be 255 characters or less.")
            .optional()
    ),
});

/**
 * Type representing valid filter parameters for genre queries.
 */
export type GenreQueryFilters = z.infer<typeof GenreQueryFilterSchema>;