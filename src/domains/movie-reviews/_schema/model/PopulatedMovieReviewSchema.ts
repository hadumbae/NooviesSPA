/**
 * @fileoverview Schema and type definitions for movie reviews with populated user and movie relations.
 */

import {z} from "zod";
import {MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import {MovieWithGenresSchema} from "@/domains/movies/_schema/movie";
import {LeanUserSchema} from "@/domains/users/_schema/user/LeanUserSchema";

/** Zod schema for a movie review including full user and movie details. */
export const PopulatedMovieReviewSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithGenresSchema,
});

/** Type definition for a movie review with populated relations. */
export type PopulatedMovieReview = z.infer<typeof PopulatedMovieReviewSchema>;