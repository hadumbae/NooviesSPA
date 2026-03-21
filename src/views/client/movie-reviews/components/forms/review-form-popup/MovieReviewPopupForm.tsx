/**
 * @file A composite component that bridges the review submission logic with a popup UI.
 * @filename MovieReviewPopupForm.tsx
 */

import SubmitMovieReviewPopup from "@/views/client/movie-reviews/components/forms/submit-form/SubmitMovieReviewPopup.tsx";
import MovieReviewSubmitFormContainer from "@/views/client/movie-reviews/components/forms/submit-form/MovieReviewSubmitFormContainer.tsx";
import {ReactNode, useState} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MovieReview, PopulatedMovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props for the {@link MovieReviewPopupForm} component.
 * * * **Inheritance:** Extends {@link MutationOnSubmitParams} to pass standard form
 * callbacks (onSuccess, onError, etc.) down to the container.
 */
type FormProps = MutationOnSubmitParams<PopulatedMovieReview> & {
    /** The trigger element (e.g., a Button) that opens the popup. */
    children: ReactNode;
    /** The ID of the movie being reviewed. */
    movieID: ObjectId;
    /**
     * An existing review object if the form is in "Edit" mode.
     * If provided, the form will pre-fill with this data.
     */
    reviewToEdit?: MovieReview;
};

/**
 * Orchestrates the review submission flow by wrapping the logic container in a Modal/Popup.
 */
export const MovieReviewPopupForm = (
    {children, movieID, reviewToEdit, ...onSubmitProps}: FormProps
) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    /**
     * Intercepts the successful submission to ensure the UI resets.
     * @param review - The newly created or updated populated review record.
     */
    const closeOnSubmit = (review: PopulatedMovieReview) => {
        setIsPopupOpen(false);
        onSubmitProps.onSubmitSuccess?.(review);
    }

    return (
        <MovieReviewSubmitFormContainer
            movieID={movieID}
            editEntity={reviewToEdit}
            {...onSubmitProps}
            onSubmitSuccess={closeOnSubmit}
        >
            <SubmitMovieReviewPopup
                presetOpen={isPopupOpen}
                setPresetOpen={setIsPopupOpen}
            >
                {children}
            </SubmitMovieReviewPopup>
        </MovieReviewSubmitFormContainer>
    );
};