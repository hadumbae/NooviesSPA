/**
 * @fileoverview Card component presenting movie review content with metadata and actions.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import {
    MovieReviewRatingStars
} from "@/views/client/movie-reviews/_comp/display/MovieReviewRatingStars.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {MovieReviewText} from "@/views/client/movie-reviews/_comp/display/MovieReviewText.tsx";
import {
    MovieReviewHelpfulButton
} from "@/views/client/movie-reviews/_comp/buttons/MovieReviewHelpfulButton.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import {MovieReviewDetails} from "@/domains/movie-reviews/_schema/model/MovieReviewDetailsSchema";
import {ReactElement} from "react";
import {IsRecommendedBadge} from "@/views/client/movie-reviews/_comp";
import {DeleteMovieReviewButton} from "@/views/client/movie-reviews/_feat/delete-button";

/** Props for the MovieReviewDetailsCard component. */
type CardProps = {
    review: MovieReviewDetails;
    isUser?: boolean;
    isHighlighted?: boolean;
    canDelete?: boolean;
};

/** Displays rating, review content, author info, and engagement controls. */
export function MovieReviewDetailsCard(
    {review, isUser, isHighlighted, canDelete}: CardProps
): ReactElement {
    const {
        _id,
        rating,
        summary,
        reviewText,
        displayName,
        helpfulCount,
        movie: {_id: movieID},
        isRecommended,
        isLikedByUser,
        isUserReview,
        createdAt,
    } = review;

    const dateWritten = createdAt.toFormat("MMM dd, yyyy");

    return (
        <Card className={cn(
            isHighlighted && "border-primary dark:border-purple-400 border-2",
        )}>
            <CardContent className="p-4 h-full flex flex-col space-y-4">
                <section className="flex justify-between items-center">
                    <div className="flex space-x-3 items-center">
                        <MovieReviewRatingStars size={15} rating={rating}/>
                        <SecondarySpan>{rating}/5</SecondarySpan>
                    </div>

                    <div className="flex items-center">
                        {isRecommended && <IsRecommendedBadge/>}
                        {canDelete && <DeleteMovieReviewButton movieID={movieID} reviewID={_id}/>}
                    </div>
                </section>

                <section className="flex-1 space-y-2">
                    <PrimaryHeaderText as="h2">{summary}</PrimaryHeaderText>
                    {reviewText && <MovieReviewText>{reviewText}</MovieReviewText>}
                </section>

                <Separator/>

                <section className="flex items-center justify-between">
                    <PrimarySpan className={cn(
                        isHighlighted && "text-primary dark:text-purple-400",
                        "italic"
                    )}>
                        {displayName} • {dateWritten}
                    </PrimarySpan>

                    <MovieReviewHelpfulButton
                        likeCount={helpfulCount}
                        isLikedByUser={isLikedByUser}
                        textOnly={isUser || isUserReview}
                    />
                </section>
            </CardContent>
        </Card>
    );
}