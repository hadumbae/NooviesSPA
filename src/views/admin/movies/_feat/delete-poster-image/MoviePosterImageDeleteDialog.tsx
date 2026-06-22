/**
 * @fileoverview A confirmation dialog for deleting a movie's poster image.
 */

import {ReactElement} from 'react';
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMoviePosterImageDeleteMutation} from "@/domains/movies/_feat/manage-images";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/types";
import {Movie} from "@/domains/movies/schema/movie";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";

/** Props for the MoviePosterImageDeleteDialog component. */
type DialogProps = MutationResponseConfig<Movie, { _id: ObjectId }> & UIOpenStateProps & {
    movieID: ObjectId;
}

/** Confirmation dialog that triggers the movie poster image deletion process. */
export function MoviePosterImageDeleteDialog(
    {movieID, isOpen, setIsOpen, ...submitConfig}: DialogProps
): ReactElement {
    const {mutateAsync} = useMoviePosterImageDeleteMutation();
    const deletePosterImage = async () => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.({_id: movieID}),
            });

            const movie = await mutateAsync({movieID});

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(movie),
                messageType: "success"
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    }

    const title = "Remove Movie Poster Image?";
    const description = "Remove the movie's poster image? This is an irreversible action.";

    return (
        <EntityDeleteWarningDialog
            title={title}
            description={description}
            deleteResource={deletePosterImage}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        />
    );
}
