/**
 * @fileoverview Displays the primary title, release year, and runtime for a movie.
 */

import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts"
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import { ReactElement } from "react";

/** Props for the MovieOverviewHeadline component. */
type HeadlineProps = {
    movie: MovieDetails;
};

/**
 * Renders the movie title and a subtitle containing the release year and duration.
 */
export function MovieOverviewHeadline({ movie }: HeadlineProps): ReactElement {
    const { title, releaseDate, runtime } = movie;

    const formattedReleaseDate =
        releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";

    const formattedRuntime = formatMovieRuntime(runtime, true);

    const subtitle = buildString(
        [formattedReleaseDate, formattedRuntime],
        " • ",
    );

    return (
        <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-description">{subtitle}</p>
        </div>
    );
}
