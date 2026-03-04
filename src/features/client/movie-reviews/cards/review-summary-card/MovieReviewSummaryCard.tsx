/**
 * @file Displays a condensed movie review inside a styled card.
 *
 * MovieReviewSummaryCard.tsx
 */

import {MovieReviewDetails} from "@/pages/review/schemas/models/MovieReview.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import MovieReviewRatingStars from "@/features/client/movie-reviews/MovieReviewRatingStars.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import MovieReviewText from "@/features/client/movie-reviews/text/MovieReviewText.tsx";
import SecondarySpan from "@/features/common/text/SecondarySpan.tsx";

/**
 * Props for MovieReviewSummaryCard.
 */
type CardProps = {
    /**
     * Review data to render.
     */
    review: MovieReviewDetails;

    /**
     * Highlights the card as the current user's review.
     */
    isUser?: boolean;

    /**
     * Additional classes applied to the card content.
     */
    className?: string;
};

/**
 * Renders a compact movie review summary.
 */
const MovieReviewSummaryCard = (
    {review, isUser, className}: CardProps
) => {
    const {rating, displayName, summary, reviewText} = review;

    return (
        <Card className={cn(
            isUser && "border-primary border-2",
            "p-2"
        )}>
            <CardContent className={cn("p-4 space-y-3", className)}>
                <div className="flex justify-between items-center">
                    <SecondarySpan className={cn(
                        isUser && "text-primary",
                        "font-bold italic"
                    )}>
                        {isUser ? "My Review" : displayName}
                    </SecondarySpan>

                    <MovieReviewRatingStars size={15} rating={rating}/>
                </div>

                <PrimaryHeaderText as="h3">{summary}</PrimaryHeaderText>
                <MovieReviewText className="line-clamp-3">{reviewText}</MovieReviewText>
            </CardContent>
        </Card>
    );
};

export default MovieReviewSummaryCard;