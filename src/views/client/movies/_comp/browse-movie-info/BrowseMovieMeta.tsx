/**
 * @fileoverview Renders textual metadata for a movie summary including title and runtime.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";

import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";

/** Props for the BrowseMovieSummaryMeta component. */
type SummaryProps = {
    movie: MovieDetails;
    className?: string;
};

/** Displays core movie metadata as part of a summary view. */
export function BrowseMovieMeta({movie, className}: SummaryProps): ReactElement {
    const {title, releaseDate, runtime} = movie;

    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedDate = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const formattedMeta = buildString([formattedDate, formattedRuntime], " • ");

    return (
        <div className={className}>
            <h2 className={cn(
                "primary-text font-extrabold text-base",
                "hover:underline hover:underline-offset-4",
            )}>
                {title}
            </h2>

            <h3 className="secondary-text text-sm">
                {formattedMeta}
            </h3>
        </div>
    );
}
