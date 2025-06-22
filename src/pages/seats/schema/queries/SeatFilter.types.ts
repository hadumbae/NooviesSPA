import {z} from "zod";
import {SeatQueryFilterSchema, SeatQuerySortSchema} from "@/pages/seats/schema/queries/SeatFilter.schema.ts";

/**
 * Inferred TypeScript type from `SeatQuerySortSchema`.
 *
 * Represents the structure of validated sort parameters used when querying seat data.
 */
export type SeatQuerySort = z.infer<typeof SeatQuerySortSchema>;

/**
 * Inferred TypeScript type from `SeatFilterQuerySchema`.
 *
 * Represents the structure of validated filter parameters used when querying seat data.
 */
export type SeatQueryFilters = z.infer<typeof SeatQueryFilterSchema>;