/**
 * @fileoverview Displays featured and user reviews for a movie.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp";
import {ObjectId} from "@/common/_schemas";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {MovieReviewDetailsCard} from "@/views/client/movie-reviews/_feat";
import {FeaturedReviewsByMovie, useFetchFeaturedReviewsByMovie} from "@/domains/movie-reviews/_feat";

/** Props for the MovieInfoFeaturedReviewsSection component. */
type SectionProps = {
    movieID: ObjectId;
};

/**
 * Renders a list of featured reviews and prioritises the current user's review if it exists.
 */
export function MovieInfoFeaturedReviewsSection(
    {movieID}: SectionProps
): ReactElement {
    const query = useFetchFeaturedReviewsByMovie({
        movieID,
        config: {limit: 3},
    });

    return (
        <QueryDataLoader query={query}>
            {({reviews, userReview}: FeaturedReviewsByMovie) => (
                <section className="space-y-4">
                    <PageSectionHeader>Featured Reviews</PageSectionHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {userReview && <MovieReviewDetailsCard isUser={true} review={userReview} canDelete={true}/>}
                        {reviews.map((review) => (<MovieReviewDetailsCard key={review._id} review={review}/>))}
                    </div>
                </section>
            )}
        </QueryDataLoader>
    );
}