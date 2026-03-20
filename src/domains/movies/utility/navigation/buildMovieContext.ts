/**
 * @file buildMovieContext.ts
 * @description
 * Utility function for constructing a standardized logging context
 * from a {@link MovieDetails} object.
 */

import {LogContext} from "@/common/utility/features/logger/Logger.types.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Builds a logging context object for a movie.
 *
 * Extracts commonly used identifying and descriptive fields from
 * {@link MovieDetails} to ensure consistent logging across
 * navigation and interaction events.
 *
 * @param movie - Movie details used to populate the log context.
 * @returns A {@link LogContext} containing movie-related metadata.
 *
 * @example
 * ```ts
 * const context = buildMovieContext(movie);
 * logger.info("Movie clicked", context);
 * ```
 */
export default function buildMovieContext(movie: MovieDetails): LogContext {
    const {_id, title, originalTitle, country, slug, tagline} = movie;

    return {
        _id,
        title,
        originalTitle,
        tagline,
        country,
        slug,
    };
}
