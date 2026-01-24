/**
 * @file TheatreWithRecentShowings.schema.ts
 *
 * Zod schema for a theatre entity augmented with recent showings.
 *
 * Used in browse and search contexts where theatres are returned
 * alongside a limited, pre-populated set of showings.
 */

import {TheatreSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {z} from "zod";

/**
 * Theatre schema extended with populated showing details.
 */
export const TheatreWithRecentShowingsSchema = TheatreSchema.extend({
    /** Recent or filtered showings associated with the theatre */
    showings: ShowingDetailsSchema,
});

/**
 * Inferred type for {@link TheatreWithRecentShowingsSchema}.
 */
export type TheatreWithRecentShowings = z.infer<
    typeof TheatreWithRecentShowingsSchema
>;
