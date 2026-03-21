/**
 * @file Card component for displaying a detailed summary of a user's movie review.
 * @filename MovieReviewIndexCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {
    MovieReviewIndexCardMovieSection
} from "@/views/client/movie-reviews/components/cards/index-card/MovieReviewIndexCardMovieSection.tsx";
import MovieReviewText from "@/views/client/movie-reviews/components/text/MovieReviewText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import PrimarySpan from "@/views/common/components/text/PrimarySpan.tsx";
import IsRecommendedBadge from "@/views/client/movie-reviews/components/badges/IsRecommendedBadge.tsx";
import SecondarySpan from "@/views/common/components/text/SecondarySpan.tsx";
import MovieReviewRatingStars from "@/views/client/movie-reviews/components/MovieReviewRatingStars.tsx";
import {
    MovieReviewIndexCardActions
} from "@/views/client/movie-reviews/components/cards/index-card/MovieReviewIndexCardActions.tsx";
import {MyMovieReview} from "@/domains/review/schemas/models/my-reviews";
import {
    MovieReviewPopupForm
} from "@/views/client/movie-reviews/components/forms/review-form-popup/MovieReviewPopupForm.tsx";
import {simplifyMovieReview} from "@/domains/review/utilities/formatters/simplifyMovieReview.ts";
import {useState} from "react";

/**
 * Props for the {@link MovieReviewIndexCard} component.
 */
type CardProps = {
    /** The review data object belonging to the current user. */
    review: MyMovieReview;
    /** Optional CSS classes for container styling. */
    className?: string;
};

/**
 * Renders a comprehensive review card including movie details, review text, and management actions.
 * @param props - Component {@link CardProps}.
 */
export const MovieReviewIndexCard = (
    {review}: CardProps,
) => {
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    const {_id, movie, rating, summary, reviewText, isRecommended, createdAt, helpfulCount} = review;
    const dateWritten = createdAt.toFormat("MMM dd, yyyy");

    const simplifiedReview = simplifyMovieReview(review);

    return (
        <Card>
            <CardContent className="h-full flex flex-col p-4 space-y-3">
                <MovieReviewIndexCardMovieSection movie={movie}/>

                <Separator/>

                <section className="flex-1 space-y-5">
                    <div>
                        <PrimaryHeaderText as="h2">{summary}</PrimaryHeaderText>
                        <SecondarySpan className="italic">{dateWritten}</SecondarySpan>
                    </div>

                    {reviewText && <MovieReviewText>{reviewText}</MovieReviewText>}
                </section>

                <Separator/>

                <section className="flex items-center justify-between">
                    <div className="flex space-x-3 items-center">
                        <MovieReviewRatingStars size={15} rating={rating}/>
                        <SecondarySpan>{rating}/5</SecondarySpan>
                    </div>

                    <div>
                        {isRecommended && <IsRecommendedBadge/>}
                    </div>

                    <div className="space-x-2">
                        <PrimarySpan>Helpful • {helpfulCount}</PrimarySpan>

                        <MovieReviewIndexCardActions
                            reviewID={_id}
                            toggleEdit={(val: boolean) => setIsEditOpen(val)}
                        />
                    </div>
                </section>
            </CardContent>

            <MovieReviewPopupForm
                movieID={movie._id}
                reviewToEdit={simplifiedReview}
                successMessage="Review Updated"
                presetOpen={isEditOpen}
                setPresetOpen={setIsEditOpen}
            />
        </Card>
    );
};