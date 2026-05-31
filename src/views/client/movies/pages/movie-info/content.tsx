/**
 * @fileoverview Layout composition for the movie overview page.
 *
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieOverviewEditorialInfo} from "@/views/client/movies/pages/movie-info/rows/MovieOverviewEditorialInfo.tsx";
import {MovieOverviewCredits} from "@/views/client/movies/pages/movie-info/rows/MovieOverviewCredits.tsx";
import {
    MovieOverviewFavouriteToggle
} from "@/views/client/movies/pages/movie-info/rows/MovieOverviewFavouriteToggle.tsx";
import {MovieOverviewReviews} from "@/views/client/movies/pages/movie-info/rows/MovieOverviewReviews.tsx";
import {MovieReviewSummaryData} from "@/domains/review/schemas/model";
import {
    MovieOverviewShowings
} from "@/views/client/movies/pages/movie-info/rows/MovieOverviewShowings.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {ReactElement} from "react";
import {MovieOverviewHeader} from "@/views/client/movies/pages/movie-info/header.tsx";

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
    {movie, credits, reviewDetails}: ContentProps
): ReactElement {
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
}