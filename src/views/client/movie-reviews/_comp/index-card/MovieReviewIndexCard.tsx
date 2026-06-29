/**
 * @fileoverview Card component for displaying a detailed summary of a user's movie review.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {
    MovieReviewIndexCardMovieSection
} from "@/views/client/movie-reviews/_comp/index-card/MovieReviewIndexCardMovieSection.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import {ReactElement, useState} from "react";
import {simplifyMovieReview} from "@/domains/movie-reviews/_feat/formatters";
import {type MyMovieReview} from "@/domains/movie-reviews/_schema";
import {MovieReviewFormPopup} from "@/views/client/movie-reviews/_feat";
import {
    IsRecommendedBadge,
    MovieReviewIndexCardActions,
    MovieReviewRatingStars,
    MovieReviewText
} from "@/views/client/movie-reviews/_comp";

/** Props for the MovieReviewIndexCard component. */
type CardProps = {
    review: MyMovieReview;
    className?: string;
};

/**
 * Renders a comprehensive review card including movie details, review text, and management actions.
 */
export function MovieReviewIndexCard({review}: CardProps): ReactElement {
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

            <MovieReviewFormPopup
                movieID={movie._id}
                reviewToEdit={simplifiedReview}
                onSubmitConfig={{successMessage: "Review Updated"}}
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
            />
        </Card>
    );
}
