/**
 * @fileoverview Displays a condensed movie review inside a styled card.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui";
import {cn} from "@/common/_feat";
import {MovieReviewRatingStars, MovieReviewText} from "@/views/client/movie-reviews/_comp/display";
import {MovieReviewDetails} from "@/domains/movie-reviews";
import {SubsectionTitle} from "@/views/common/_comp";

/** Props for the MovieReviewSummaryCard component. */
type CardProps = {
    review: MovieReviewDetails;
    isUser?: boolean;
    className?: string;
};

/** Renders a compact movie review summary. */
export function MovieReviewSummaryCard(
    {review, isUser, className}: CardProps
): ReactElement {
    const {rating, displayName, summary, reviewText} = review;

    return (
        <Card className={cn("p-2", isUser && "border-primary border-2")}>
            <CardContent className={cn("p-4 space-y-3", className)}>
                <div className="flex justify-between items-center">
                    <span className={cn("secondary-text font-bold italic", isUser && "text-primary")}>
                        {isUser ? "My Review" : displayName}
                    </span>

                    <MovieReviewRatingStars size={15} rating={rating}/>
                </div>

                <SubsectionTitle as="h3">{summary}</SubsectionTitle>
                <MovieReviewText className="line-clamp-3">{reviewText}</MovieReviewText>
            </CardContent>
        </Card>
    );
}