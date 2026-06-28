/**
 * @fileoverview Zod schema and type definition for showings with populated relations.
 */

import {z} from "zod";
import {MovieWithGenresSchema} from "@/domains/movies";
import {TheatreScreenSchema} from "@/domains/theatre-screens";
import {TheatreSchema} from "@/domains/theatres";
import {ShowingSchema} from "@/domains/showings/_schema/showing/ShowingSchema.ts";


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