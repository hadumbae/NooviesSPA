/**
 * @fileoverview Horizontal row component that combines a clickable movie poster with textual movie metadata.
 */

import {cn} from "@/common/lib/utils.ts";
import {
    BrowseMovieSummaryMeta
} from "@/views/client/movies/browse-movies/browse-movie-summary/BrowseMovieSummaryMeta.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";

/** Props for the BrowseMovieMetaRow component. */
type SpanProps = {
    movie: MovieDetails;
    className?: string;
};

/**
 * Renders a compact movie metadata row containing a poster link and textual details.
 */
export function BrowseMovieMetaRow({movie, className}: SpanProps): ReactElement {
    const {title, slug, posterImage} = movie;

    return (
        <div className={cn("flex items-center space-x-4", className)}>
            <MoviePosterLink
                className="h-24"
                slug={slug}
                image={posterImage}
                alt={`'${title}' Poster Image`}
            />

            <BrowseMovieSummaryMeta
                movie={movie}
            />
        </div>
    );
}


