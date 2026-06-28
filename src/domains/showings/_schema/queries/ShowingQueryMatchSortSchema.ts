/**
 * @fileoverview Zod schema and TypeScript type for Showing match sort criteria.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/** Zod schema for validating sort criteria for Showing query fields. */
export const ShowingQueryMatchSortSchema = z.object({
    sortByStartTime: MongooseSortOrderSchema.optional(),
    sortByEndTime: MongooseSortOrderSchema.optional(),
});

/** Sort criteria for querying Showings. */
export type ShowingQueryMatchSorts = z.infer<typeof ShowingQueryMatchSortSchema>;