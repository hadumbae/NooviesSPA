/**
 * @file Section placeholder for displaying featured movie reviews.
 * @filename MovieInfoUserReviewSection.tsx
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchFeaturedReviewsByMovie} from "@/pages/movies/fetch/movie-reviews/useFetchFeaturedReviewsByMovie.ts";
import {
    FeaturedReviewsByMovie,
    FeaturedReviewsByMovieSchema
} from "@/pages/review/schemas/models/FeaturedReviewsByMovieSchema.ts";

/**
 * Props for the featured reviews section.
 */
type SectionProps = {
    movieID: ObjectId;
};

/**
 * Scaffold section intended to display featured reviews for a movie.
 * Data fetching and review rendering will be added later.
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
            {({reviews, userReview}: FeaturedReviewsByMovie) => {

                console.log("User Review: ", userReview);
                console.log("Reviews: ", reviews);

                return (
                    <section>
                        <SectionHeader className={SectionHeaderCSS}>
                            Featured Reviews
                        </SectionHeader>

                        <div>
                            ID {movieID}
                        </div>
                    </section>
                );
            }}
        </ValidatedDataLoader>
    );
};

export default MovieInfoFeaturedReviewsSection;