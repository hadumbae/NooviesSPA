/**
 * @fileoverview Card component presenting movie review content with metadata and actions.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {Card, CardContent, Separator} from "@/common/components/ui";
import {MovieReviewDetails} from "@/domains/movie-reviews";
import {DeleteMovieReviewButton} from "@/views/client/movie-reviews/_feat/delete-button";
import {
    IsRecommendedBadge,
    MovieReviewHelpfulButton,
    MovieReviewRatingStars,
    MovieReviewText
} from "@/views/client/movie-reviews/_comp";
import {SubsectionTitle} from "@/views/common/_comp";

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
                        <span className="secondary-text">{rating}/5</span>
                    </div>

                    <div className="flex items-center">
                        {isRecommended && <IsRecommendedBadge/>}
                        {canDelete && <DeleteMovieReviewButton movieID={movieID} reviewID={_id}/>}
                    </div>
                </section>

                <section className="flex-1 space-y-2">
                    <SubsectionTitle>{summary}</SubsectionTitle>
                    {reviewText && <MovieReviewText>{reviewText}</MovieReviewText>}
                </section>

                <Separator/>

                <section className="flex items-center justify-between">
                    <span className={cn(
                        "primary-span italic",
                        isHighlighted && "text-primary dark:text-purple-400",
                    )}>
                        {displayName} • {dateWritten}
                    </span>

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