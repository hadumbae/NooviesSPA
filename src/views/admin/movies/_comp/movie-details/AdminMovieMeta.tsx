/**
 * @fileoverview Component for displaying a movie's title and metadata in a row format.
 */

import {ReactElement} from "react";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {cn} from "@/common/_feat";
import {Movie, MovieDetails, MovieWithGenres} from "@/domains/movies";

/** Props for the MovieMetaRow component. */
type MetaProps = {
    movie: Movie | MovieWithGenres | MovieDetails;
};

/**
 * Renders a movie title link and a subtitle containing release year and runtime.
 */
export function AdminMovieMeta(
    {movie}: MetaProps
): ReactElement {
    const {_id, slug, title, releaseDate, runtime} = movie;

    const navObject = {
        to: `/admin/movies/get/${slug}`,
        component: AdminMovieMeta.name,
        message: "Navigate to movie details view.",
        context: {system: "ADMIN", _id, slug, title},
    };

    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedDate = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const formattedMeta = buildString([formattedDate, formattedRuntime], " • ");

    return (
        <div>
            <LoggedLink {...navObject} className={cn(
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