/**
 * @fileoverview Displays metadata and a link for a movie within the showing information view.
 */

import {ReactElement} from "react";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {Movie, MovieDetails, MovieWithGenres} from "@/domains/movies/schema/movie";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";

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
                to={`/browse/movies/${slug}`}
                className={cn(
                    "primary-text font-bold max-md:text-sm",
                    "hover:underline underline-offset-4 line-clamp-2",
                )}
            >
                {formattedMovieTitle}
            </LoggedLink>

            <SecondaryHeaderText className="max-md:text-sm">
                {metaString}
            </SecondaryHeaderText>
        </div>
    );
}