/**
 * @fileoverview Review overview section for a movie including user and recent reviews.
 *
 */

import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ChevronRight, MessageCirclePlus} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {ReactElement, useState} from "react";
import {
    MovieReviewSummaryCard
} from "@/views/client/movie-reviews/_comp/review-summary-card/MovieReviewSummaryCard.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";

import {MovieReviewDetails} from "@/domains/movie-reviews/_schema";
import {PageSectionHeaderLink} from "@/views/common/_comp/page";
import {MovieReviewFormPopup} from "@/views/client/movie-reviews/_feat";

/** Props for the MovieOverviewReviews component. */
type RowProps = {
    movie: MovieDetails;
    userReview: MovieReviewDetails | null;
    reviews: MovieReviewDetails[];
    averageRating: number | null;
    className?: string;
};

/** Renders a summary of movie reviews and a submission trigger. */
export function MovieOverviewReviews(
    {movie, userReview, reviews, className}: RowProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex justify-between items-center">
                <PageSectionHeaderLink to={`/browse/movies/${movie.slug}/reviews`}>
                    Movie Reviews
                </PageSectionHeaderLink>

                {
                    !userReview && (
                        <MovieReviewFormPopup isOpen={isOpen} setIsOpen={setIsOpen} movieID={movie._id}>
                            <Button variant="primary" size="icon" type="button">
                                <MessageCirclePlus/>
                            </Button>
                        </MovieReviewFormPopup>
                    )
                }

            </div>

            {userReview && (
                <div className="space-y-4">
                    <h3 className="fieldset-header">User Review</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MovieReviewSummaryCard isUser={true} review={userReview}/>
                    </div>
                </div>
            )}

            {reviews.length > 0 && (
                <div className="space-y-4">
                    <h3 className="fieldset-header">Most Recent Reviews</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviews.map((review) => <MovieReviewSummaryCard key={review._id} review={review}/>)}
                    </div>

                    <div className="flex justify-end">
                        <LoggedHoverLink to={`/browse/movies/${movie.slug}/reviews`}>
                            <ChevronRight/> More Reviews
                        </LoggedHoverLink>
                    </div>
                </div>
            )}
        </section>
    );
}
