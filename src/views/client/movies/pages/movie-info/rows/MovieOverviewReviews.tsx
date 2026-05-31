/**
 * @fileoverview Review overview section for a movie including user and recent reviews.
 *
 */

import {cn} from "@/common/lib/utils.ts";
import {
    SubmitMovieReviewPopup
} from "@/views/client/movie-reviews/_feat/submit-form/SubmitMovieReviewPopup.tsx";
import {ChevronRight, MessageCirclePlus} from "lucide-react";
import {
    MovieReviewSubmitFormContainer
} from "@/views/client/movie-reviews/_feat/submit-form/MovieReviewSubmitFormContainer.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ReactElement, useState} from "react";
import {MovieReviewSummaryCard} from "@/views/client/movie-reviews/_comp/review-summary-card/MovieReviewSummaryCard.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

import {MovieReviewDetails} from "@/domains/movieReviews/schemas/model/MovieReviewDetailsSchema";
import {PageSectionHeaderLink} from "@/views/common/_comp/page";

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
    const onSubmit = () => setIsOpen(false);

    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex justify-between items-center">
                <PageSectionHeaderLink to={`/browse/movies/${movie.slug}/reviews`}>
                    Movie Reviews
                </PageSectionHeaderLink>

                <MovieReviewSubmitFormContainer movieID={movie._id} onSubmitSuccess={onSubmit}>
                    <SubmitMovieReviewPopup isHidden={!!userReview} presetOpen={isOpen} setPresetOpen={setIsOpen}>
                        <Button variant="primary" size="icon" type="button">
                            <MessageCirclePlus/>
                        </Button>
                    </SubmitMovieReviewPopup>
                </MovieReviewSubmitFormContainer>
            </div>

            {userReview && (
                <div className="space-y-4">
                    <PrimaryHeaderText>User Review</PrimaryHeaderText>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MovieReviewSummaryCard isUser={true} review={userReview}/>
                    </div>
                </div>
            )}

            {reviews.length > 0 && (
                <div className="space-y-4">
                    <PrimaryHeaderText>Most Recent Reviews</PrimaryHeaderText>

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
