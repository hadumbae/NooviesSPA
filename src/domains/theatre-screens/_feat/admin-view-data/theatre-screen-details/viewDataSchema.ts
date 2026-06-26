/**
 * @fileoverview Zod schema for validating the aggregated data used in the Screen Details admin view.
 */

import {z} from "zod";
import {TheatreScreenWithVirtualsSchema} from "@/domains/theatre-screens/_schema/model";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {SeatDetailsSchema} from "@/domains/seats/_schema/model";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";

/**
 * Validates the full data package required to render the Theatre Screen management interface.
 */
export const TheatreScreenDetailsViewDataSchema = z.object({
    theatre: TheatreDetailsSchema,
    screen: TheatreScreenWithVirtualsSchema,
    seats: generateArraySchema(SeatDetailsSchema),
});

/**
 * TypeScript type inferred from {@link TheatreScreenDetailsViewDataSchema}.
 */
export type TheatreScreenDetailsViewData = z.infer<typeof TheatreScreenDetailsViewDataSchema>;