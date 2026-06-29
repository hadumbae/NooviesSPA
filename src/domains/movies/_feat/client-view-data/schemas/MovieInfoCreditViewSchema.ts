/**
 * @fileoverview Defines the schema for movie information and its associated cast and crew credits.
 */

import {z} from "zod";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {GroupedCrewCreditsExceptMovieSchema} from "@/domains/movie-credits/_schemas";
import {CastCreditExceptMovieSchema} from "@/domains/movie-credits/_feat/movie-info-credits/schema/CreditExceptMovieSchema.ts";
import { MovieDetailsSchema } from "@/domains/movies/_schema/movie";

/** Zod schema for validating the composite movie and credits view data. */
export const MovieInfoCreditViewSchema = z.object({
    movie: MovieDetailsSchema,
    creditDetails: z.object({
        castCredits: generateArraySchema(CastCreditExceptMovieSchema),
        crewCredits: generateArraySchema(GroupedCrewCreditsExceptMovieSchema),
    }),
});

/** Type definition for the movie and credits view data. */
export type MovieInfoCreditViewData = z.infer<typeof MovieInfoCreditViewSchema>;