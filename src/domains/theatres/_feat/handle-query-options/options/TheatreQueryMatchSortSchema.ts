/**
 * @fileoverview Zod schema and type definitions for sorting theatre query results.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/_schemas/enums/MongooseSortOrderSchema.ts";

/** Zod schema defining sorting parameters for theatre queries. */
export const TheatreQueryMatchSortSchema = z.object({
    sortByName: MongooseSortOrderSchema.optional(),
    sortBySeatCapacity: MongooseSortOrderSchema.optional(),
    sortByCity: MongooseSortOrderSchema.optional(),
    sortByState: MongooseSortOrderSchema.optional(),
    sortByCountry: MongooseSortOrderSchema.optional(),
    sortByPostCode: MongooseSortOrderSchema.optional(),
    sortByTimezone: MongooseSortOrderSchema.optional(),
});

/** Inferred type for validated theatre match sort parameters. */
export type TheatreQueryMatchSorts = z.infer<typeof TheatreQueryMatchSortSchema>;