/**
 * @file BrowseMovieMetaRow.tsx
 * @description
 * Horizontal row component that combines a clickable movie poster
 * with textual movie metadata.
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {cn} from "@/common/lib/utils.ts";
import BrowseMovieSummaryMeta
    from "@/pages/movies/components/client/browse-movies/browse-movie-summary/BrowseMovieSummaryMeta.tsx";
import MoviePosterLink from "@/pages/movies/components/MoviePosterLink.tsx";

/**
 * Props for {@link BrowseMovieMetaRow}.
 */
type SpanProps = {
    /**
     * Movie data used to render the meta row.
     */
    movie: MovieDetails;

    /**
     * Optional class name applied to the root container.
     */
    className?: string;
};

/**
 * Renders a compact movie metadata row composed of:
 * - {@link MoviePosterLink} for poster-based navigation
 * - {@link BrowseMovieSummaryMeta} for textual movie details
 *
 * This component serves as a lightweight, reusable layout primitive
 * for browse and list views.
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <BrowseMovieMetaRow movie={movie} />
 * ```
 */
const BrowseMovieMetaRow = ({movie, className}: SpanProps) => {
    return (
        <div className={cn("flex items-center space-x-4", className)}>
            <MoviePosterLink movie={movie} className="h-24"/>
            <BrowseMovieSummaryMeta movie={movie}/>
        </div>
    );
};

export default BrowseMovieMetaRow;
