/**
 * @fileoverview Zod schema and type definitions for the theatre showing list view data.
 */

import {z} from "zod";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";

/**
 * Schema for validating the aggregated data used in the theatre showing list view.
 */
export const TheatreShowingListViewDataSchema = z.object({
    theatre: TheatreDetailsSchema,
    showings: generatePaginationSchema(ShowingDetailsSchema),
});

/** Aggregated theatre and paginated showing data for administrative views. */
export type TheatreShowingListViewData = z.infer<typeof TheatreShowingListViewDataSchema>;