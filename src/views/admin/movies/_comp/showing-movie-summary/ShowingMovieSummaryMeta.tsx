/**
 * @fileoverview Component that displays metadata for a movie in the showing summary view.
 */

import {ReactElement} from "react";
import {MovieDetails, MovieWithGenres} from "@/domains/movies/_schema/movie";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {MovieMetaGenreBadges} from "@/views/admin/movies/_comp/movie-details";
import {To} from "react-router-dom";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the ShowingMovieSummaryMeta component. */
type MetaProps = {
    to: To;
    movie: MovieWithGenres | MovieDetails;
};

/**
 * Renders the title, release year, runtime, and genres for a specific movie.
 */
export function ShowingMovieSummaryMeta(
    {to, movie}: MetaProps
): ReactElement {
    const {title, releaseDate, runtime, genres} = movie;

    const releaseYear = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";
    const runtimeString = formatMovieRuntime(runtime);

    return (
        <div className="flex flex-col gap-2">
            <div>
                <LoggedLink to={to} className="w-fit">
                    <h1 className="subsection-title hover:underline hover:underline-offset-4">
                        {title}
                    </h1>
                </LoggedLink>

                <h2 className="subsection-subtitle">{releaseYear} • {runtimeString}</h2>
            </div>

            <MovieMetaGenreBadges genres={genres}/>
        </div>
    );
}