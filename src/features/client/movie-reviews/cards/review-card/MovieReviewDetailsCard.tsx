/**
 * @file Card presenting movie review content with metadata and actions.
 * @filename MovieReviewDetailsCard.tsx
 */

import {MovieReviewDetails} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DeleteMovieReviewButton from "@/features/client/movie-reviews/buttons/DeleteMovieReviewButton.tsx";
import PrimarySpan from "@/features/common/text/PrimarySpan.tsx";
import MovieReviewRatingStars from "@/features/client/movie-reviews/MovieReviewRatingStars.tsx";
import SecondarySpan from "@/features/common/text/SecondarySpan.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import MovieReviewText from "@/features/client/movie-reviews/text/MovieReviewText.tsx";
import MovieReviewHelpfulButton from "@/features/client/movie-reviews/buttons/MovieReviewHelpfulButton.tsx";
import {cn} from "@/common/lib/utils.ts";
import IsRecommendedBadge from "@/features/client/movie-reviews/badges/IsRecommendedBadge.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for MovieReviewDetailsCard.
 */
type CardProps = {
    /** Review data to display */
    review: MovieReviewDetails;

    /** Indicates the review belongs to the current user */
    isUser?: boolean;

    /** Applies visual emphasis to the card */
    isHighlighted?: boolean;

    /** Enables review deletion control */
    canDelete?: boolean;
};

/**
 * Displays rating, review content, author info, and engagement controls.
 */
const MovieReviewDetailsCard = (
    {review, isUser, isHighlighted, canDelete}: CardProps
) => {
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
};

export default MovieReviewDetailsCard;