/**
 * @fileoverview Zod schema and type definitions for movie query sorting parameters.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";

/** Zod schema defining available sorting parameters for movie queries. */
export const MovieQuerySortSchema = z.object({
    sortByReleaseDate: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByTitle: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByOriginalTitle: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByIsReleased: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByIsAvailable: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByCountry: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
});

/** Type representing movie query sort preferences. */
export type MovieQuerySorts = z.infer<typeof MovieQuerySortSchema>;