/**
 * @fileoverview Displays review count and provides an action for creating or editing a user review.
 */

import {Button} from "@/common/components/ui/button.tsx";
import {MessageCirclePlus} from "lucide-react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import {
    MovieReviewPopupForm
} from "@/views/client/movie-reviews/_feat/review-form-popup/MovieReviewPopupForm.tsx";

import {simplifyMovieReview} from "@/domains/movieReviews/_feat/formatters";
import {MovieReviewDetails} from "@/domains/movieReviews/schemas";
import {ReactElement} from "react";

/** Props for the MovieInfoReviewAction component. */
type ActionProps = {
    movieID: ObjectId;
    totalReviews: number;
    userReview: MovieReviewDetails | null;
    className?: string;
};

/**
 * Displays the total review count and a button that opens the review submission popup.
 */
export function MovieInfoReviewAction(
    {movieID, totalReviews, userReview, className}: ActionProps
): ReactElement {
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
}