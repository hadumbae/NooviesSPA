/**
 * @file Showing schema with populated relations.
 * @filename PopulatedShowingSchema.ts
 */

import {ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {z} from "zod";

import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {TheatreScreenSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenSchema.ts";
import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";

/**
 * Extends {@link ShowingSchema} with populated relations.
 */
export const PopulatedShowingSchema = ShowingSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => TheatreScreenSchema),
    movie: z.lazy(() => MovieWithGenresSchema),
});

/**
 * Inferred populated showing type.
 */
export type PopulatedShowing = z.infer<typeof PopulatedShowingSchema>;