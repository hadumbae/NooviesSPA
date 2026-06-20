/**
 * @fileoverview Zod schemas and types for sorting Person query results.
 */

import {z} from "zod";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/** Zod schema for defining sort order on Person fields. */
export const PersonQuerySortSchema = z.object({
    sortByName: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByDOB: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByNationality: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
});

/** Type for Person query sorting options. */
export type PersonQuerySorts = z.infer<typeof PersonQuerySortSchema>;