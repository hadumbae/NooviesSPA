/**
 * @file Section placeholder for displaying featured movie reviews.
 * @filename MovieInfoUserReviewSection.tsx
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { SectionHeaderCSS } from "@/common/constants/css/TextCSS.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

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
    { movieID }: SectionProps
) => {
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
};

export default MovieInfoFeaturedReviewsSection;