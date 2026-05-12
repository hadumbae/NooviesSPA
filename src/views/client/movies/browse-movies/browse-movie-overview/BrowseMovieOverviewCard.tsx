/**
 * @file BrowseMovieOverviewCard.tsx
 * @description
 * Card component displaying a compact movie overview with
 * poster navigation and summary metadata.
 */

import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import {
    BrowseMovieSummaryMeta
} from "@/views/client/movies/browse-movies/browse-movie-summary/BrowseMovieSummaryMeta.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";

/**
 * Props for {@link BrowseMovieOverviewCard}.
 */
type CardProps = {
    /**
     * Movie data used for rendering poster and metadata.
     */
    movie: MovieDetails;

    /**
     * Optional class name (reserved for future layout control).
     */
    className?: string;
};

/**
 * Renders a movie overview card with:
 * - Clickable poster linking to movie details
 * - Summary metadata layout
 *
 * @param props Component props
 */
export function BrowseMovieOverviewCard({movie}: CardProps): ReactElement {
    const {title, slug, posterImage} = movie;

    return (
        <Card>
            <CardHeader className="p-0">
                <MoviePosterLink
                    className="w-full h-72 rounded-b-none"
                    url={posterImage?.secure_url}
                    slug={slug}
                    alt={title}
                />
            </CardHeader>

            <CardContent className="px-3 py-3">
                <BrowseMovieSummaryMeta
                    className="h-full justify-between"
                    movie={movie}
                />
            </CardContent>
        </Card>
    );
}


