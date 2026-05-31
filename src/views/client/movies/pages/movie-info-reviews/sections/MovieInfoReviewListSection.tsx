/**
 * @fileoverview Section component that displays a paginated list of movie reviews.
 */

import {ReactElement} from "react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {MovieReviewDetailsCard} from "@/views/client/movie-reviews/_feat";
import {MovieReviewDetails} from "@/domains/movieReviews/schemas";

/** Props for the MovieInfoReviewListSection component. */
type SectionProps = {
    reviews: MovieReviewDetails[];
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: number) => void;
}

/** Displays a grid of movie review cards with integrated pagination controls. */
export function MovieInfoReviewListSection(
    {reviews, ...paginationProps}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Reviews
            </SectionHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {reviews.map(review => (
                    <MovieReviewDetailsCard
                        key={review._id}
                        review={review}
                        isHighlighted={false}
                        isUser={review.isUserReview}
                    />
                ))}
            </div>

            <PaginationRangeButtons
                {...paginationProps}
            />
        </section>
    );
}
