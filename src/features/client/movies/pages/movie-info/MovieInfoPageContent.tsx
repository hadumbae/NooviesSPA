/**
 * @file Layout composition for the movie overview page.
 *
 * MovieInfoPageContent.tsx
 */

import {MovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieOverviewHeader
    from "@/features/client/movies/pages/movie-info/rows/MovieOverviewHeader.tsx";
import MovieOverviewEditorialInfo
    from "@/features/client/movies/pages/movie-info/rows/MovieOverviewEditorialInfo.tsx";
import MovieOverviewCredits
    from "@/features/client/movies/pages/movie-info/rows/MovieOverviewCredits.tsx";
import MovieOverviewFavouriteToggle
    from "@/features/client/movies/pages/movie-info/rows/MovieOverviewFavouriteToggle.tsx";
import MovieOverviewReviews
    from "@/features/client/movies/pages/movie-info/rows/MovieOverviewReviews.tsx";
import {ReviewDetailsByMovie} from "@/domains/review/schemas/models/ReviewDetailsByMovieSchema.ts";
import MovieOverviewShowings from "@/features/client/movies/pages/movie-info/rows/MovieOverviewShowings.tsx";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.types.ts";

/**
 * Props for MovieInfoPageContent.
 */
type ContentProps = {
    /**
     * Movie details.
     */
    movie: MovieDetails;

    /**
     * Associated credits.
     */
    credits: MovieCreditDetails[];

    /**
     * Review summary data.
     */
    reviewDetails: ReviewDetailsByMovie;
};

/**
 * Renders the movie overview page sections.
 */
const MovieInfoPageContent = (
    {movie, credits, reviewDetails}: ContentProps
) => {
    const {slug} = movie;
    const {
        averageRating,
        userReview,
        items: reviews
    } = reviewDetails;

    return (
        <PageFlexWrapper className="space-y-10">
            <MovieOverviewHeader
                movie={movie}
                credits={credits}
            />

            <MovieOverviewFavouriteToggle
                movieID={movie._id}
            />

            <MovieOverviewEditorialInfo
                movie={movie}
            />

            <MovieOverviewCredits
                movie={movie}
                credits={credits}
            />

            <MovieOverviewReviews
                movie={movie}
                averageRating={averageRating}
                userReview={userReview}
                reviews={reviews}
            />

            <MovieOverviewShowings
                movieSlug={slug}
            />
        </PageFlexWrapper>
    );
};

export default MovieInfoPageContent;