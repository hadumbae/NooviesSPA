/**
 * @fileoverview Displays the primary title, release year, and runtime for a movie.
 */

import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {buildString} from "@/common/_feat/formatters/buildString.ts"
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";

/** Props for the MovieOverviewHeadline component. */
type HeadlineProps = {
    movie: MovieDetails;
};

/**
 * Renders the movie title and a subtitle containing the release year and duration.
 */
export function MovieOverviewHeadline(
    {movie: {title, releaseDate, runtime}}: HeadlineProps
): ReactElement {
    const formattedReleaseDate = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";
    const formattedRuntime = formatMovieRuntime(runtime, true);
    const subtitle = buildString([formattedReleaseDate, formattedRuntime], " • ");

    return (
        <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-description">{subtitle}</p>
        </div>
    );
}
