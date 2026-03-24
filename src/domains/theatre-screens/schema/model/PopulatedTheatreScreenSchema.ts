/**
 * @file Zod validation schema and type definitions for a Theatre Screen with populated relational data.
 * @filename PopulatedTheatreScreenSchema.ts
 */

import {TheatreScreenSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenSchema.ts";
import {z} from "zod";
import {TheatreSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";

/**
 * Zod schema for a Theatre Screen that includes the full Theatre object instead of just an ID.
 */
export const PopulatedTheatreScreenSchema = TheatreScreenSchema.extend({
    /** The full theatre entity object that this screen is associated with. */
    theatre: z.lazy(() => TheatreSchema),
});

/**
 * TypeScript type representing a validated Theatre Screen with its parent theatre fully populated.
 * * Inferred directly from {@link PopulatedTheatreScreenSchema}.
 * * Useful for "Screen Detail" pages or "Upcoming Showings" components.
 */
export type PopulatedTheatreScreen = z.infer<typeof PopulatedTheatreScreenSchema>;