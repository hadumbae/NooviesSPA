/**
 * @file Presentational content component for the Movie Reviews page.
 *
 * MovieInfoReviewsPageContent.tsx
 */

import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import { MovieReviewDetails } from "@/pages/review/schemas/models/MovieReview.types.ts";

/**
 * Props for MovieInfoReviewsPageContent.
 */
type ContentProps = {
    /**
     * Total number of reviews available for the movie.
     */
    totalItems: number;

    /**
     * Paginated list of movie reviews.
     */
    reviews: MovieReviewDetails[];

    /**
     * Review submitted by the currently authenticated user, if any.
     */
    userReview: MovieReviewDetails | null;

    /**
     * Aggregated average rating for the movie.
     */
    averageRating: number | null;

    /**
     * Movie metadata used for display context.
     */
    movie: MovieDetails;
};

/**
 * Renders the structured content for a movie's reviews page.
 *
 * This component is purely presentational and assumes that:
 * - Data has already been validated and loaded
 * - Pagination and aggregation logic are handled upstream
 *
 * It is responsible only for layout and rendering.
 */
const MovieInfoReviewsPageContent = ({ movie }: ContentProps) => {
    const { title } = movie;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Reviews</HeaderDescription>
            </header>
        </PageFlexWrapper>
    );
};

export default MovieInfoReviewsPageContent;