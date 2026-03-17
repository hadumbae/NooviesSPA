/**
 * @file Showing schema with populated relations.
 * @filename PopulatedShowingSchema.ts
 */

import {ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {z} from "zod";
import {TheatreSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {ScreenSchema} from "@/domains/screens/schema/screen/Screen.schema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/Movie.schema.ts";

/**
 * Extends {@link ShowingSchema} with populated relations.
 */
export const PopulatedShowingSchema = ShowingSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
    movie: z.lazy(() => MovieWithGenresSchema),
});

/**
 * Inferred populated showing type.
 */
export type PopulatedShowing = z.infer<typeof PopulatedShowingSchema>;