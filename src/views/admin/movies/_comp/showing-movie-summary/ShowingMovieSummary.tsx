/**
 * @fileoverview Component that displays a summary of a movie including its poster and metadata.
 */

import {ReactElement} from "react";
import {MovieDetails, MovieWithGenres} from "@/domains/movies/_schema/movie";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {ShowingMovieSummaryMeta} from "@/views/admin/movies/_comp/showing-movie-summary/ShowingMovieSummaryMeta.tsx";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {To} from "react-router-dom";

/** Props for the ShowingMovieSummary component. */
type SummaryProps = {
    movie: MovieDetails | MovieWithGenres;
    to: To;
};

/**
 * Renders a horizontal layout containing a movie poster and its associated metadata.
 */
export function ShowingMovieSummary(
    {movie, to}: SummaryProps
): ReactElement {
    const {posterImage} = movie;

    return (
        <div className="flex items-center gap-4">
            <LoggedLink to={to}>
                <MoviePosterImage
                    className="w-14 xl:w-14"
                    url={posterImage?.secure_url}
                />
            </LoggedLink>

            <ShowingMovieSummaryMeta to={to} movie={movie}/>
        </div>
    );
}