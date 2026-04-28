/** @fileoverview Utility for constructing a standardized logging context from a MovieDetails object. */

import {LogContext} from "@/common/utility/features/logger/Logger.types.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Builds a logging context object for a movie using identifying and descriptive fields.
 */
export function buildMovieContext(movie: MovieDetails): LogContext {
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