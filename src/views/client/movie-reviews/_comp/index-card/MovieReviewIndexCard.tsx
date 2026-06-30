/**
 * @fileoverview Card component for displaying a detailed summary of a user's movie review.
 */

import {ReactElement, useState} from "react";
import {Card, CardContent, Separator} from "@/common/components/ui";
import {simplifyMovieReview} from "@/domains/movie-reviews/_feat/formatters";
import {type MyMovieReview} from "@/domains/movie-reviews/_schema";
import {MovieReviewFormPopup} from "@/views/client/movie-reviews/_feat";
import {SubsectionTitle} from "@/views/common/_comp";
import {IsRecommendedBadge} from "@/views/client/movie-reviews/_comp/badges";
import {MovieReviewRatingStars, MovieReviewText} from "@/views/client/movie-reviews/_comp/display";
import {
    MovieReviewIndexCardMovieSection
} from "@/views/client/movie-reviews/_comp/index-card/MovieReviewIndexCardMovieSection.tsx";
import {
    MovieReviewIndexCardActions
} from "@/views/client/movie-reviews/_comp/index-card/MovieReviewIndexCardActions.tsx";


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
                        <SubsectionTitle as="h2">{summary}</SubsectionTitle>
                        <span className="secondary-text italic">{dateWritten}</span>
                    </div>

                    {reviewText && <MovieReviewText>{reviewText}</MovieReviewText>}
                </section>

                <Separator/>

                <section className="flex items-center justify-between">
                    <div className="flex space-x-3 items-center">
                        <MovieReviewRatingStars size={15} rating={rating}/>
                        <span className="secondary-text">{rating}/5</span>
                    </div>

                    <div>
                        {isRecommended && <IsRecommendedBadge/>}
                    </div>

                    <div className="space-x-2">
                        <span className="primary-text">Helpful • {helpfulCount}</span>

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
