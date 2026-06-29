/**
 * @fileoverview Zod schemas and types for filtering and sorting seat map data.
 */

import {z} from "zod";
import {SeatMapReferenceFilterSchema} from "@/domains/seatmaps/_feat/handle-query-options/SeatMapReferenceParams.ts";
import {SeatMapMatchFilterSchema, SeatMapMatchSortSchema} from "@/domains/seatmaps/_feat/handle-query-options/SeatMapMatchOptionsSchema.ts";

/** Combined Zod schema merging reference filters, match filters, and sort parameters. */
export const SeatMapQueryOptionSchema =
    SeatMapReferenceFilterSchema
        .merge(SeatMapMatchFilterSchema)
        .merge(SeatMapMatchSortSchema);

/** TypeScript type representing the merged seat map query options. */
export type SeatMapQueryOptions = z.infer<typeof SeatMapQueryOptionSchema>;