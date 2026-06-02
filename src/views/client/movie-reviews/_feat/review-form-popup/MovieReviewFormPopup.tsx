/**
 * @fileoverview Composite component bridging movie review submission logic with a popup UI.
 */

import {ReactElement, ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/types";
import {MovieReview} from "@/domains/movieReviews/schemas";
import {MovieReviewSubmitForm, SubmitMovieReviewPopupView} from "@/views/client/movie-reviews/_feat/submit-form";

/** Props for the MovieReviewFormPopup component. */
type FormProps = UIOpenStateProps & {
    children?: ReactNode;
    movieID: ObjectId;
    reviewToEdit?: MovieReview;
    onSubmitConfig?: MutationResponseConfig<MovieReview>;
};

/** Orchestrates the movie review submission and editing flow within a modal context. */
export function MovieReviewFormPopup(
    {children, movieID, reviewToEdit, isOpen, setIsOpen, onSubmitConfig}: FormProps
): ReactElement {
    const closeOnSubmit = (review: MovieReview) => {
        setIsOpen(false);
        onSubmitConfig?.onSubmitSuccess?.(review);
    }

    return (
        <MovieReviewSubmitForm
            movieID={movieID}
            editEntity={reviewToEdit}
            onSubmitConfig={{...onSubmitConfig, onSubmitSuccess: closeOnSubmit}}
        >
            <SubmitMovieReviewPopupView
                isEditing={!!reviewToEdit}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                {children}
            </SubmitMovieReviewPopupView>
        </MovieReviewSubmitForm>
    );
}