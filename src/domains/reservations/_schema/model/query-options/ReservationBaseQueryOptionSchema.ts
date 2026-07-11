/**
 * @fileoverview Zod schema for reservation base query options combining filtering and sorting.
 */

import {z} from "zod";
import {
    ReservationBaseQueryFilterSchema
} from "@/domains/reservations/_schema/model/query-options/ReservationBaseQueryFilterSchema.ts";
import {
    ReservationBaseQuerySortSchema
} from "@/domains/reservations/_schema/model/query-options/ReservationBaseQuerySortSchema.ts";

/** Zod schema that merges reservation filter and sort schemas. */
export const ReservationBaseQueryOptionSchema = ReservationBaseQueryFilterSchema.merge(ReservationBaseQuerySortSchema);

/** Type definition for reservation base query options inferred from the schema. */
export type ReservationBaseQueryOptions = z.infer<typeof ReservationBaseQueryOptionSchema>;
