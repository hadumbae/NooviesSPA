/**
 * @file BrowseMovieOverviewCard.tsx
 * @description
 * Card component displaying a compact movie overview with
 * poster navigation and summary metadata.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MoviePosterLink from "@/pages/movies/components/MoviePosterLink.tsx";
import BrowseMovieSummaryMeta
    from "@/pages/movies/components/client/browse-movies/browse-movie-summary/BrowseMovieSummaryMeta.tsx";

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
