/**
 * @fileoverview Component that displays a summary of movie metadata and genre badges.
 */

import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {cn} from "@/common/lib/utils.ts";
import {MovieMetaGenreBadges} from "@/views/admin/movies/_comp/movie-details";
import {BrowseMovieMeta} from "@/views/client/movies/_comp/browse-movie-info/BrowseMovieMeta.tsx";

/** Props for the BrowseMovieSummary component. */
type SummaryProps = {
    movie: MovieDetails;
    className?: string;
};

/**
 * Renders a summary layout containing movie metadata and genre tags for the browse view.
 */
export function BrowseMovieSummary(
    {movie, className}: SummaryProps
): ReactElement {
    return (
        <div className={cn("space-y-2", className)}>
            <BrowseMovieMeta movie={movie}/>
            <MovieMetaGenreBadges genres={movie.genres} />
        </div>
    );
}