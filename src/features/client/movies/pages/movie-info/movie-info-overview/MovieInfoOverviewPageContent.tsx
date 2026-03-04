/**
 * @file Movie info overview page content.
 * MovieInfoPageContent.tsx
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import MovieInfoOverview
    from "@/features/client/movies/pages/movie-info/movie-info-overview/rows/movie-info-overview/MovieInfoOverview.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import MovieEditorialInfoRow
    from "@/features/client/movies/pages/movie-info/movie-info-overview/rows/movie-editorial-info/MovieEditorialInfoRow.tsx";
import MovieCreditInfoRow
    from "@/features/client/movies/pages/movie-info/movie-info-overview/rows/movie-credit-info/MovieCreditInfoRow.tsx";
import MovieFavouriteSelector
    from "@/features/client/movies/pages/movie-info/movie-info-overview/rows/movie-favourite-selector/MovieFavouriteSelector.tsx";
import MovieReviewSummarySection
    from "@/features/client/movies/pages/movie-info/movie-info-overview/rows/movie-review-summary/MovieReviewSummarySection.tsx";
import {ReviewDetailsByMovie} from "@/pages/review/schemas/models/ReviewDetailsByMovieSchema.ts";

/**
 * Props for overview page content.
 */
type ContentProps = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
    reviewDetails: ReviewDetailsByMovie;
};

/**
 * Renders overview page layout sections.
 */
const MovieInfoOverviewPageContent = ({movie, credits, reviewDetails}: ContentProps) => {
    const {slug} = movie;
    const {averageRating, userReview, items: reviews} = reviewDetails;

    return (
        <PageFlexWrapper className="space-y-10">
            <MovieInfoOverview movie={movie} credits={credits}/>

            <MovieFavouriteSelector movieID={movie._id}/>

            <MovieEditorialInfoRow movie={movie}/>

            <MovieCreditInfoRow movie={movie} credits={credits}/>

            <LoggedHoverLink to={`/browse/movies/${slug}/showings`}>
                Showings
            </LoggedHoverLink>

            <MovieReviewSummarySection
                movie={movie}
                averageRating={averageRating}
                userReview={userReview}
                reviews={reviews}
            />
        </PageFlexWrapper>
    );
};

export default MovieInfoOverviewPageContent;