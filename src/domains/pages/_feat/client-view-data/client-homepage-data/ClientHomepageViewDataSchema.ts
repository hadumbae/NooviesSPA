/**
 * @fileoverview Zod schema and type definitions for validated client homepage view data.
 */

import {z} from "zod";
import {MovieSummarySchema} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {GenreSummarySchema} from "@/domains/genres/_schema/genre/GenreSummarySchema.ts";
import {TheatreDetailsSchema} from "@/domains/theatres";
import {ShowingSummarySchema} from "@/domains/showings";
import {ReservationSummarySchema} from "@/domains/reservations";

/** Zod schema for validating composite client homepage view data. */
export const ClientHomepageViewDataSchema = z.object({
    movies: z.array(MovieSummarySchema),
    genres: z.array(GenreSummarySchema),
    theatres: z.array(TheatreDetailsSchema),
    showings: z.array(ShowingSummarySchema),
    reservations: z.array(ReservationSummarySchema),
});

/** Inferred type for validated client homepage view data. */
export type ClientHomepageViewData = z.infer<typeof ClientHomepageViewDataSchema>;