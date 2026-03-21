/**
 * @filename MovieInfoReviewAction.tsx
 * @file Displays review count and provides an action for creating or editing a user review.
 */

import {Button} from "@/common/components/ui/button.tsx";
import {MessageCirclePlus} from "lucide-react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import PrimarySpan from "@/views/common/components/text/PrimarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import {MovieReviewDetails} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {simplifyMovieReview} from "@/domains/review/utilities/formatters/simplifyMovieReview.ts";
import {
    MovieReviewPopupForm
} from "@/views/client/movie-reviews/components/forms/review-form-popup/MovieReviewPopupForm.tsx";

/**
 * Data required to render the review action section for a movie.
 */
type ActionProps = {
    movieID: ObjectId;
    totalReviews: number;
    userReview: MovieReviewDetails | null;
    className?: string;
};

/**
 * Displays the total review count and a button that opens the
 * review submission popup. If the user already has a review,
 * the form is preloaded for editing.
 */
const MovieInfoReviewAction = (
    {movieID, totalReviews, userReview, className}: ActionProps
) => {
    const isEditing = !!userReview;
    const reviewToEdit = isEditing ? simplifyMovieReview(userReview) : undefined;
    const successMessage = isEditing ? "Updated." : undefined;

    return (
        <div className={cn(
            RoundedBorderCSS,
            "flex justify-between items-center p-3",
            className
        )}>
            <LabeledGroup label="Total Reviews">
                <PrimarySpan>{totalReviews}</PrimarySpan>
            </LabeledGroup>

            <MovieReviewPopupForm
                movieID={movieID}
                reviewToEdit={reviewToEdit}
                successMessage={successMessage}
            >
                <Button variant="primary" size="sm" type="button">
                    <MessageCirclePlus/>{" "}
                    {isEditing ? "Edit Your Review" : "Write A Review"}
                </Button>
            </MovieReviewPopupForm>
        </div>
    );
};

export default MovieInfoReviewAction;