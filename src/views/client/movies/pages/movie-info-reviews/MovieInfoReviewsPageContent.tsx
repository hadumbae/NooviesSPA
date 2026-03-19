/**
 * @file Presentational layout for the movie reviews page.
 * @filename MovieInfoReviewsPageContent.tsx
 */

import {MovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {MovieReviewDetails} from "@/domains/review/schemas/models/MovieReview.types.ts";
import MovieInfoReviewsPageHeader
    from "@/views/client/movies/pages/movie-info-reviews/sections/MovieInfoReviewsPageHeader.tsx";
import MovieInfoReviewAction
    from "@/views/client/movies/pages/movie-info-reviews/sections/MovieInfoReviewAction.tsx";
import MovieInfoFeaturedReviewsSection
    from "@/views/client/movies/pages/movie-info-reviews/sections/MovieInfoFeaturedReviewsSection.tsx";
import MovieInfoReviewListSection
    from "@/views/client/movies/pages/movie-info-reviews/sections/MovieInfoReviewListSection.tsx";

/**
 * Props for MovieInfoReviewsPageContent.
 */
type ContentProps = {
    /** Total available reviews */
    totalItems: number;

    /** Paginated review list */
    reviews: MovieReviewDetails[];

    /** Review authored by the current user */
    userReview: MovieReviewDetails | null;

    /** Average movie rating */
    averageRating: number | null;

    /** Movie metadata for page context */
    movie: MovieDetails;

    /** Active pagination page */
    page: number;

    /** Items displayed per page */
    perPage: number;

    /** Updates the active page */
    setPage: (page: number) => void;
};

/**
 * Renders structured sections for the movie reviews view.
 */
const MovieInfoReviewsPageContent = (
    {movie, totalItems, reviews, userReview, ...paginationProps}: ContentProps
) => {
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
};

export default MovieInfoReviewsPageContent;