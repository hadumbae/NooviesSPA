/**
 * @fileoverview Utility for simplifying complex MovieDetails objects into storage-ready Movie objects.
 */

import { ParseError } from "@/common/_err/ParseError.ts";
import {Movie, MovieSchema} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";

/** Transforms a MovieDetails object into a Movie object and validates it against MovieSchema. */
export function simplifyMovieDetails(movieDetails: MovieDetails): Movie {
    const { genres, releaseDate, ...rem } = movieDetails;

    const simplifiedGenres = genres.map(({ _id }) => _id);

    const dateString = releaseDate
        ? releaseDate.toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
        : undefined;

    const movie = { ...rem, genres: simplifiedGenres, releaseDate: dateString };

    const { data: parsedMovie, success, error } = MovieSchema.safeParse(movie);
    if (success && !error) return parsedMovie;

    throw new ParseError({
        message: "Failed to simplify movie details.",
        errors: error.errors,
        raw: movie,
    });
}