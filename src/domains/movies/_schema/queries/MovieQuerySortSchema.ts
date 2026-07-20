/**
 * @fileoverview Zod schema and type definitions for movie query sorting parameters.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/_schemas/enums/MongooseSortOrderSchema.ts";
import {preprocessOptionalField} from "@/common/_feat/validation-preprocessors";

/** Zod schema defining available sorting parameters for movie queries. */
export const MovieQuerySortSchema = z.object({
    sortByReleaseDate: preprocessOptionalField(MongooseSortOrderSchema),
    sortByTitle: preprocessOptionalField(MongooseSortOrderSchema),
    sortByOriginalTitle: preprocessOptionalField(MongooseSortOrderSchema),
    sortByIsReleased: preprocessOptionalField(MongooseSortOrderSchema),
    sortByIsAvailable: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCountry: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type representing movie query sort preferences. */
export type MovieQuerySorts = z.infer<typeof MovieQuerySortSchema>;