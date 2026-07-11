/**
 * @fileoverview Zod schema for defining sort options in reservation base queries.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {preprocessOptionalField} from "@/common/_feat/validation-preprocessors";

/** Zod schema for reservation sorting parameters. */
export const ReservationBaseQuerySortSchema = z.object({
    sortByStatus: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateReserved: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDatePaid: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateCancelled: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateRefunded: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateExpired: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type definition for reservation sorting options. */
export type ReservationBaseQuerySorts = z.infer<typeof ReservationBaseQuerySortSchema>;