/**
 * @file Displays featured and user reviews for a movie.
 * @filename MovieInfoUserReviewSection.tsx
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchFeaturedReviewsByMovie} from "@/domains/movies/fetch/movie-reviews/useFetchFeaturedReviewsByMovie.ts";
import {
    FeaturedReviewsByMovie,
    FeaturedReviewsByMovieSchema
} from "@/domains/review/schemas/models/FeaturedReviewsByMovieSchema.ts";
import MovieReviewDetailsCard from "@/views/client/movie-reviews/components/cards/review-card/MovieReviewDetailsCard.tsx";

/**
 * Props for MovieInfoFeaturedReviewsSection.
 */
type SectionProps = {
    /** Movie identifier used to fetch reviews */
    movieID: ObjectId;
};

/**
 * Renders featured reviews and prioritizes the current user's review.
 */
const MovieInfoFeaturedReviewsSection = (
    {movieID}: SectionProps
) => {
    const query = useFetchFeaturedReviewsByMovie({
        movieID,
        config: {populate: true, virtuals: true, limit: 3},
    });

    return (
        <ValidatedDataLoader query={query} schema={FeaturedReviewsByMovieSchema}>
            {({reviews, userReview}: FeaturedReviewsByMovie) => (
                <section className="space-y-4">
                    <SectionHeader className={SectionHeaderCSS}>
                        Featured Reviews
                    </SectionHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {
                            userReview &&
                            <MovieReviewDetailsCard
                                isUser={true}
                                review={userReview}
                                canDelete={true}
                            />
                        }

                        {
                            reviews.map((review) => (
                                <MovieReviewDetailsCard
                                    key={review._id}
                                    review={review}
                                />
                            ))
                        }
                    </div>
                </section>
            )}
        </ValidatedDataLoader>
    );
};

export default MovieInfoFeaturedReviewsSection;