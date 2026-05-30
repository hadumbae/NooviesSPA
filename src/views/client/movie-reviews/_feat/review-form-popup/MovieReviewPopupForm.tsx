/**
 * @fileoverview Composite component bridging review submission logic with a popup UI.
 */

import {SubmitMovieReviewPopup} from "@/views/client/movie-reviews/_feat/submit-form/SubmitMovieReviewPopup.tsx";
import {
    MovieReviewSubmitFormContainer
} from "@/views/client/movie-reviews/_feat/submit-form/MovieReviewSubmitFormContainer.tsx";
import {ReactElement, ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";
import {MovieReview} from "@/domains/review/schemas/models";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the MovieReviewPopupForm component. */
type FormProps = MutationResponseConfig<MovieReview> & PresetOpenState & {
    children?: ReactNode;
    movieID: ObjectId;
    reviewToEdit?: MovieReview;
};

/** Orchestrates the movie review submission flow within a modal context. */
export function MovieReviewPopupForm(
    {children, movieID, reviewToEdit, presetOpen, setPresetOpen, ...onSubmitProps}: FormProps
): ReactElement {
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
}