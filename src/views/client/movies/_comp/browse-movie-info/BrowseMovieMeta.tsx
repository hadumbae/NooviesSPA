/**
 * @fileoverview Renders textual metadata for a movie summary including title and runtime.
 */

import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {buildMovieContext} from "@/domains/movies/_feat/navigation";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";
import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the BrowseMovieSummaryMeta component. */
type SummaryProps = {
    movie: MovieDetails;
    className?: string;
};

/** Displays core movie metadata as part of a summary view. */
export function BrowseMovieMeta({movie, className}: SummaryProps): ReactElement {
    const {title, releaseDate, runtime, slug} = movie;
    const movieContext = buildMovieContext(movie);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: BrowseMovieMeta.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", ...movieContext},
    };

    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedDate = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const formattedMeta = buildString([formattedDate, formattedRuntime], " • ");

    return (
        <div className={className}>
            <LoggedLink{...navObject} className={cn(
                "primary-text font-extrabold text-base",
                "hover:underline hover:underline-offset-4",
            )}>
                {title}
            </LoggedLink>

            <h3 className="secondary-text text-sm">
                {formattedMeta}
            </h3>
        </div>
    );
}
