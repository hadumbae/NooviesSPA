/**
 * @file Card displaying detailed information for a movie review.
 * @filename MovieReviewDetailsCard.tsx
 */

import {MovieReviewDetails} from "@/pages/review/schemas/models/MovieReview.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DeleteMovieReviewButton from "@/features/client/movie-reviews/buttons/DeleteMovieReviewButton.tsx";
import PrimarySpan from "@/features/common/text/PrimarySpan.tsx";
import MovieReviewRatingStars from "@/features/client/movie-reviews/MovieReviewRatingStars.tsx";
import SecondarySpan from "@/features/common/text/SecondarySpan.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import MovieReviewText from "@/features/client/movie-reviews/text/MovieReviewText.tsx";
import MovieReviewHelpfulButton from "@/features/client/movie-reviews/buttons/MovieReviewHelpfulButton.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for MovieReviewDetailsCard.
 */
type CardProps = {
    /** Review data to display */
    review: MovieReviewDetails;

    /** Highlights card when authored by current user */
    isUser?: boolean;

    /** Shows delete control when permitted */
    canDelete?: boolean;
};

/**
 * Renders a structured movie review with rating, content, and actions.
 */
const MovieReviewDetailsCard = (
    {review, isUser, canDelete}: CardProps
) => {
    const {
        _id,
        rating,
        summary,
        reviewText,
        displayName,
        movie: {_id: movieID},
        createdAt
    } = review;

    const dateWritten = createdAt.toFormat("MMM dd, yyyy")

    return (
        <Card className={cn(
            isUser && "border-primary dark:border-purple-400 border-2",
        )}>
            <CardContent className="p-4 space-y-4">
                <section className="flex justify-between items-center">
                    <div className="flex space-x-3 items-center">
                        <MovieReviewRatingStars size={15} rating={rating}/>
                        <SecondarySpan>{rating}/5</SecondarySpan>
                    </div>

                    {
                        canDelete && (
                            <DeleteMovieReviewButton
                                movieID={movieID}
                                reviewID={_id}
                            />
                        )
                    }
                </section>

                <PrimaryHeaderText as="h2">
                    {summary}
                </PrimaryHeaderText>

                {
                    reviewText && (
                        <MovieReviewText>
                            {reviewText}
                        </MovieReviewText>
                    )
                }

                <section className="flex items-center justify-between">
                    <PrimarySpan className={cn(
                        isUser && "text-primary dark:text-purple-400",
                        "italic"
                    )}>
                        {displayName} • {dateWritten}
                    </PrimarySpan>

                    <MovieReviewHelpfulButton
                        likeCount={123}
                        textOnly={isUser}
                    />
                </section>
            </CardContent>
        </Card>
    );
};

export default MovieReviewDetailsCard;