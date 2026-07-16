/**
 * @fileoverview Displays review count and provides an action for creating or editing a user review.
 */

import {ReactElement, useState} from "react";
import {MessageCirclePlus} from "lucide-react";
import {Button} from "@/common/components/ui";
import {ObjectId} from "@/common/_schemas";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {cn} from "@/common/lib/utils.ts";

import {MovieReviewFormPopup} from "@/views/client/movie-reviews";
import {MovieReviewDetails, simplifyMovieReview} from "@/domains/movie-reviews";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={cn(
            "rounded-container-border flex justify-between items-center p-3",
            className
        )}>
            <LabeledGroup label="Total Reviews">
                <span className="primary-text">{totalReviews}</span>
            </LabeledGroup>

            <MovieReviewFormPopup
                movieID={movieID}
                reviewToEdit={reviewToEdit}
                onSubmitConfig={{successMessage}}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <Button variant="primary" size="sm" type="button">
                    <MessageCirclePlus/>{" "}
                    {isEditing ? "Edit Your Review" : "Write A Review"}
                </Button>
            </MovieReviewFormPopup>
        </div>
    );
}