/**
 * @file BrowseMovieOverviewCard.tsx
 * @description
 * Card component displaying a compact movie overview with
 * poster navigation and summary metadata.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import BrowseMovieSummaryMeta
    from "@/views/client/movies/browse-movies/browse-movie-summary/BrowseMovieSummaryMeta.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterLink} from "@/views/admin/movies/_comp/poster-image";

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
const BrowseMovieOverviewCard = ({movie}: CardProps) => {
    return (
        <Card>
            <CardContent className="px-5 py-5 flex space-x-4 items-stretch">
                <div>
                    <MoviePosterLink className="h-24" movie={movie}/>
                </div>

                <div className="flex-1">
                    <BrowseMovieSummaryMeta
                        className="h-full justify-between"
                        movie={movie}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default BrowseMovieOverviewCard;
