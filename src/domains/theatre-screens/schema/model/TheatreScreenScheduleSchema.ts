/**
 * @fileoverview Zod schema and TypeScript type for a theatre screen with showings.
 */

import {z} from "zod";
import {ShowingWithMovieSchema} from "@/domains/showings/schema/showing";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {TheatreScreenSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenSchema.ts";

/** Zod schema representing a Theatre Screen that includes both its parent Theatre and its scheduled Showings. */
export const TheatreScreenScheduleSchema = TheatreScreenSchema.extend({
    showings: generateArraySchema(ShowingWithMovieSchema),
});

/** TypeScript type representing a Theatre Screen enriched with parent Theatre metadata and a list of Showings. */
export type TheatreScreenSchedule = z.infer<typeof TheatreScreenScheduleSchema>;