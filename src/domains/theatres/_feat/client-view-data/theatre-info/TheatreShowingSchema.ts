/**
 * @fileoverview Zod schema and type definitions for theatre showing entities with movie and screen summaries.
 */

import {z} from "zod";
import {ShowingSchema} from "@/domains/showings/_schema/showing";
import {MovieSummarySchema} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {TheatreScreenSummarySchema} from "@/domains/theatre-screens/_schema/model";

/** Schema for validating theatre showing details including associated movie and screen summary objects. */
export const TheatreShowingSchema = ShowingSchema.pick({
    _id: true,
    slug: true,
    startTime: true,
    endTime: true,
    ticketPrice: true,
    status: true,
    config: true,
    language: true,
    subtitleLanguages: true,
    theatreSnapshot: true,
}).extend({
    movie: MovieSummarySchema,
    screen: TheatreScreenSummarySchema,
});

/** Inferred TypeScript type representing a theatre showing. */
export type TheatreShowing = z.infer<typeof TheatreShowingSchema>;