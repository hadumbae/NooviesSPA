/**
 * @fileoverview Zod schema for defining sort options in reservation base queries.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/** Zod schema for reservation sorting parameters. */
export const ReservationBaseQuerySortSchema = z.object({
    sortByStatus: MongooseSortOrderSchema.optional(),
    sortByDateReserved: MongooseSortOrderSchema.optional(),
    sortByDatePaid: MongooseSortOrderSchema.optional(),
    sortByDateCancelled: MongooseSortOrderSchema.optional(),
    sortByDateRefunded: MongooseSortOrderSchema.optional(),
    sortByDateExpired: MongooseSortOrderSchema.optional(),
});

/** Type definition for reservation sorting options. */
export type ReservationBaseQuerySorts = z.infer<typeof ReservationBaseQuerySortSchema>;