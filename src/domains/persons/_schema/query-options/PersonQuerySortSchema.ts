/**
 * @fileoverview Zod schemas and types for sorting Person query results.
 */

import {z} from "zod";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";
import {MongooseSortOrderSchema} from "@/common/_schemas/enums/MongooseSortOrderSchema.ts";

/** Zod schema for defining sort order on Person fields. */
export const PersonQuerySortSchema = z.object({
    sortByName: preprocessEmptyToUndefined(MongooseSortOrderSchema.optional()).optional(),
    sortByDOB: preprocessEmptyToUndefined(MongooseSortOrderSchema.optional()).optional(),
    sortByNationality: preprocessEmptyToUndefined(MongooseSortOrderSchema.optional()).optional(),
});

/** Type for Person query sorting options. */
export type PersonQuerySorts = z.infer<typeof PersonQuerySortSchema>;