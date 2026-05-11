/**
 * @fileoverview Renders textual metadata for a movie summary including title, genres, and runtime.
 */
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {buildMovieContext} from "@/domains/movies/_feat/navigation";
import {Badge} from "@/common/components/ui/badge.tsx";
import {ReactElement} from "react";

/** Props for the BrowseMovieSummaryMeta component. */
type SummaryProps = {
    movie: MovieDetails;
    className?: string;
};

/** Displays core movie metadata as part of a summary view. */
export function BrowseMovieSummaryMeta({movie, className}: SummaryProps): ReactElement {
    const {
        title,
        releaseDate,
        runtime,
        genres,
        slug,
    } = movie;

    const movieContext = buildMovieContext(movie);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: BrowseMovieSummaryMeta.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", ...movieContext},
    };

    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedDate = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const formattedMeta = buildString([formattedDate, formattedRuntime], " • ");

    return (
        <div className={cn("flex flex-col justify-center space-y-4", className)}>
            <div>
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

            <div className="space-x-2">
                {
                    genres.map((genre) => (
                        <Badge key={genre._id} variant="outline" className="text-xs">
                            {genre.name}
                        </Badge>
                    ))
                }
            </div>
        </div>
    );
}
