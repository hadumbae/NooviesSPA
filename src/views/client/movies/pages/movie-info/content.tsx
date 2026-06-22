/**
 * @fileoverview Layout composition for the movie overview page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {
    MovieOverviewCredits,
    MovieOverviewEditorialInfo,
    MovieOverviewFavouriteToggle,
    MovieOverviewHeader,
    MovieOverviewReviews,
    MovieOverviewShowings
} from "@/views/client/movies/pages/movie-info/sections";

import {MovieReviewSummaryData} from "@/domains/movieReviews";
import {MovieDetails} from "@/domains/movies";
import {MovieCreditDetails} from "@/domains/moviecredit";

/** Props for the MovieInfoPageContent component. */
type ContentProps = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
    reviewDetails: MovieReviewSummaryData;
};

/**
 * Renders the movie overview page sections including header, credits, and reviews.
 */
export function MovieInfoPageContent(
    {movie, credits, reviewDetails: {averageRating, userReview, items: reviews}}: ContentProps
): ReactElement {
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
                movieSlug={movie.slug}
            />
        </PageFlexWrapper>
    );
}