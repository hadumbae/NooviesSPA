/**
 * @fileoverview Schema definition for a seat map with its populated layout structure.
 */

import {z} from "zod";
import {SeatMapSchema} from "@/domains/seatmaps/_schema/model/SeatMapSchema.ts";
import {SeatingStructureSchema} from "@/domains/seats/_schema/model/SeatSchema.ts";

/** Zod schema for a SeatMap with a populated seat layout. */
export const SeatMapWithSeatSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatingStructureSchema),
});

/** Type definition for a SeatMap with a populated seat layout. */
export type SeatMapWithSeat = z.infer<typeof SeatMapWithSeatSchema>;