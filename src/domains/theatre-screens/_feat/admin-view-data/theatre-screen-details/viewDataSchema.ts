/**
 * @fileoverview Zod schema for validating the aggregated data used in the Screen Details admin view.
 * Ensures strict typing for the combined payload of theatre, screen, and seat metadata.
 */

import {z} from "zod";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {TheatreScreenWithVirtualsSchema} from "@/domains/theatre-screens/schema/model";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {SeatSchema} from "@/domains/seats/schema/seat/Seat.schema.ts";

/**
 * Validates the full data package required to render the Theatre Screen management interface.
 */
export const TheatreScreenDetailsViewDataSchema = z.object({
    theatre: TheatreDetailsSchema,
    screen: TheatreScreenWithVirtualsSchema,
    seats: generateArraySchema(SeatSchema),
});

/**
 * TypeScript type inferred from {@link TheatreScreenDetailsViewDataSchema}.
 */
export type TheatreScreenDetailsViewData = z.infer<typeof TheatreScreenDetailsViewDataSchema>;