/**
 * @file Zod validation schema and type definitions for a Theatre Screen populated with its associated showings.
 * @filename ScreenWithShowingsSchema.ts
 */

import {z} from "zod";
import {ShowingDetailsArraySchema} from "@/domains/showings/schema/showing/ShowingArraySchemas.ts";
import {PopulatedTheatreScreenSchema} from "@/domains/theatre-screens/schema/model/PopulatedTheatreScreenSchema.ts";

/**
 * Zod schema representing a Theatre Screen that includes both its parent Theatre and its scheduled Showings.
 */
export const ScreenWithShowingsSchema = PopulatedTheatreScreenSchema.extend({
    /** * The collection of validated showing records currently scheduled for this specific screen.
     * Includes movie details, start/end times, and status.
     */
    showings: ShowingDetailsArraySchema,
});

/**
 * TypeScript type representing a Theatre Screen enriched with parent Theatre metadata and a list of Showings.
 * Inferred directly from {@link ScreenWithShowingsSchema}.
 */
export type ScreenWithShowings = z.infer<typeof ScreenWithShowingsSchema>;