/**
 * @fileoverview Displays featured and user reviews for a movie.
 */

import {ReactElement} from "react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieReviewDetailsCard} from "@/views/client/movie-reviews/_feat";
import {
    FeaturedReviewsByMovie,
    FeaturedReviewsByMovieSchema,
    useFetchFeaturedReviewsByMovie
} from "@/domains/movieReviews/_feat";

/** Props for the MovieInfoFeaturedReviewsSection component. */
type SectionProps = {
    movieID: ObjectId;
};

/**
 * Renders a list of featured reviews and prioritizes the current user's review if it exists.
 */
export function MovieInfoFeaturedReviewsSection(
    {movieID}: SectionProps
): ReactElement {
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
}