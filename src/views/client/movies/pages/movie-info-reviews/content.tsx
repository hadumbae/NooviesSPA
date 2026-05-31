/**
 * @fileoverview Presentational layout for the movie reviews page.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {MovieReviewDetails} from "@/domains/review/schemas";
import {MovieInfoReviewsPageHeader} from "@/views/client/movies/pages/movie-info-reviews/header";
import {
    MovieInfoFeaturedReviewsSection,
    MovieInfoReviewAction,
    MovieInfoReviewListSection
} from "@/views/client/movies/pages/movie-info-reviews/sections";

/** Props for the MovieInfoReviewsPageContent component. */
type ContentProps = {
    totalItems: number;
    reviews: MovieReviewDetails[];
    userReview: MovieReviewDetails | null;
    averageRating: number | null;
    movie: MovieDetails;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/** Renders the structured layout and sections for the movie reviews view. */
export function MovieInfoReviewsPageContent(
    {movie, totalItems, reviews, userReview, ...paginationProps}: ContentProps
): ReactElement {
    const {_id: movieID, title: movieTitle, posterImage, slug: movieSlug} = movie;

    return (
        <PageFlexWrapper>
            <MovieInfoReviewsPageHeader
                posterURL={posterImage?.secure_url}
                movieTitle={movieTitle}
                movieSlug={movieSlug}
            />

            <MovieInfoReviewAction
                userReview={userReview}
                totalReviews={totalItems}
                movieID={movieID}
            />

            <MovieInfoFeaturedReviewsSection
                movieID={movieID}
            />

            <MovieInfoReviewListSection
                reviews={reviews}
                totalItems={totalItems}
                {...paginationProps}
            />
        </PageFlexWrapper>
    );
}