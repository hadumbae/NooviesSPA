/**
 * @fileoverview Displays metadata and a link for a movie within the showing information view.
 */

import {ReactElement} from "react";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";
import {Movie, MovieDetails, MovieWithGenres} from "@/domains/movies";

/** Props for the ShowingInfoMovieMeta component. */
type MetaProps = {
    movie: Movie | MovieDetails | MovieWithGenres;
    isSpecialEvent?: boolean;
    canReserveSeats?: boolean;
};

/** Renders the movie title, release year, runtime, and admission type. */
export function ShowingInfoMovieMeta(
    {movie, isSpecialEvent, canReserveSeats}: MetaProps
): ReactElement {
    const {title, runtime, releaseDate, slug} = movie;

    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const formattedMovieTitle = `${title} (${releaseYear})`;

    const movieRuntime = formatMovieRuntime(runtime, true);
    const showingType = canReserveSeats ? "Seat Reservation" : "General Admission";

    const metaString = buildString([
        movieRuntime,
        showingType,
        isSpecialEvent && "Special",
    ], " • ");

    return (
        <div>
            <LoggedLink
                className="primary-text font-bold max-md:text-sm hover:underline underline-offset-4 line-clamp-2"
                to={`/browse/movies/${slug}`}
            >
                {formattedMovieTitle}
            </LoggedLink>

            <h3 className="max-md:text-sm font-semibold fieldset-header">
                {metaString}
            </h3>
        </div>
    )
        ;
}