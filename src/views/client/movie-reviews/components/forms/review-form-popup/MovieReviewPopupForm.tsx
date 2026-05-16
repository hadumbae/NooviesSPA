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
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";
import {MovieReview} from "@/domains/review/schemas/models";

/**
 * Props for the {@link MovieReviewPopupForm} component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & PresetOpenState & {
    children?: ReactNode;
    movieID: ObjectId;
    reviewToEdit?: MovieReview;
};

/**
 * Orchestrates the movie review submission flow within a modal context.
 * @param props - Component {@link FormProps}.
 */
export const MovieReviewPopupForm = (
    {children, movieID, reviewToEdit, presetOpen, setPresetOpen, ...onSubmitProps}: FormProps
) => {
    const {activeOpen, setActiveOpen} = usePresetActiveOpen({presetOpen, setPresetOpen});

    const closeOnSubmit = (review: MovieReview) => {
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