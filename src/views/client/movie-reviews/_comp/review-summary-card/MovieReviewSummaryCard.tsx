/**
 * @file Displays a condensed movie review inside a styled card.
 *
 * MovieReviewSummaryCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import {
    MovieReviewRatingStars
} from "@/views/client/movie-reviews/_comp/display/MovieReviewRatingStars.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {MovieReviewText} from "@/views/client/movie-reviews/_comp/display/MovieReviewText.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";

import {MovieReviewDetails} from "@/domains/review/schemas/models/MovieReviewDetailsSchema";
import {ReactElement} from "react";

/**
 * Props for MovieReviewSummaryCard.
 */
type CardProps = {
    review: MovieReviewDetails;
    isUser?: boolean;
    className?: string;
};

/**
 * Renders a compact movie review summary.
 */
export function MovieReviewSummaryCard(
    {review, isUser, className}: CardProps
): ReactElement{
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
}