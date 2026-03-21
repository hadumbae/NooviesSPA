/**
 * @file A composite component bridging review submission logic with a popup/modal UI.
 * @filename MovieReviewPopupForm.tsx
 */

import SubmitMovieReviewPopup
    from "@/views/client/movie-reviews/components/forms/submit-form/SubmitMovieReviewPopup.tsx";
import MovieReviewSubmitFormContainer
    from "@/views/client/movie-reviews/components/forms/submit-form/MovieReviewSubmitFormContainer.tsx";
import {ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MovieReview, PopulatedMovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";

/**
 * Props for the {@link MovieReviewPopupForm} component.
 */
type FormProps = MutationOnSubmitParams<PopulatedMovieReview> & PresetOpenState & {
    /** The trigger element (e.g., a "Write Review" button) that opens the popup. */
    children?: ReactNode;
    /** The unique identifier of the movie being reviewed. */
    movieID: ObjectId;
    /**
     * Optional existing review document.
     * If provided, the form initializes in "Edit" mode; otherwise, it defaults to "Create".
     */
    reviewToEdit?: MovieReview;
};

/**
 * Orchestrates the movie review submission flow within a modal context.
 * @param props - Component {@link FormProps}.
 */
export const MovieReviewPopupForm = (
    {children, movieID, reviewToEdit, presetOpen, setPresetOpen, ...onSubmitProps}: FormProps
) => {
    /** Manages the open/closed state of the modal/popup. */
    const {activeOpen, setActiveOpen} = usePresetActiveOpen({presetOpen, setPresetOpen});

    /**
     * Handles post-submission cleanup.
     * * Closes the popup and propagates the successful result to the parent caller.
     * @param review - The newly processed {@link PopulatedMovieReview}.
     */
    const closeOnSubmit = (review: PopulatedMovieReview) => {
        setActiveOpen(false);
        onSubmitProps.onSubmitSuccess?.(review);
    }

    return (
        <MovieReviewSubmitFormContainer
            movieID={movieID}
            formKey={reviewToEdit?._id ?? movieID}
            editEntity={reviewToEdit}
            {...onSubmitProps}
            onSubmitSuccess={closeOnSubmit}
        >
            <SubmitMovieReviewPopup
                presetOpen={activeOpen}
                setPresetOpen={setActiveOpen}
            >
                {children}
            </SubmitMovieReviewPopup>
        </MovieReviewSubmitFormContainer>
    );
};