/**
 * @fileoverview Zod schema and type definitions for sorting theatre query results.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/_schemas/enums/MongooseSortOrderSchema.ts";
import {preprocessOptionalField} from "@/common/_feat";

/** Zod schema defining sorting parameters for theatre queries. */
export const TheatreQueryMatchSortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortBySeatCapacity: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCity: preprocessOptionalField(MongooseSortOrderSchema),
    sortByState: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCountry: preprocessOptionalField(MongooseSortOrderSchema),
    sortByPostalCode: preprocessOptionalField(MongooseSortOrderSchema),
    sortByTimezone: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Inferred type for validated theatre match sort parameters. */
export type TheatreQueryMatchSorts = z.infer<typeof TheatreQueryMatchSortSchema>;