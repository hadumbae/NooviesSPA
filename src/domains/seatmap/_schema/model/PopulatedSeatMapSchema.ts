/**
 * @fileoverview Defines the schema for a seat map with its associated showing data populated.
 */

import {z} from "zod";
import {SeatMapWithSeatSchema} from "@/domains/seatmap/_schema/model/SeatMapWithSeatSchema.ts";
import {ShowingSchema} from "@/domains/showings";

/** Zod schema for a SeatMap with a populated showing field. */
export const PopulatedSeatMapSchema = SeatMapWithSeatSchema.extend({
    showing: z.lazy(() => ShowingSchema),
});

/** Type definition for a SeatMap with a populated showing. */
export type PopulatedSeatMap = z.infer<typeof PopulatedSeatMapSchema>;