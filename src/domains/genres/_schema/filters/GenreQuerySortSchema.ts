/**
 * @fileoverview Zod schema and type definitions for Genre sorting options.
 */

import {z} from "zod";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {MongooseNumericSortOrderSchema} from "@/common/_schemas/enums/MongooseNumericSortOrderSchema.ts";

/**
 * Zod schema for validating genre query sorting parameters.
 */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessEmptyStringToUndefined(MongooseNumericSortOrderSchema.optional()).optional(),
});

/** Sorting parameters for genre queries. */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;