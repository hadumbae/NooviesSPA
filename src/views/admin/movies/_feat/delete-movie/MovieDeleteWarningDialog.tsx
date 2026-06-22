/** @fileoverview Confirmation dialog for deleting a movie entity with integrated mutation logic. */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/types";
import {useMovieDeleteMutation} from "@/domains/movies/_feat/crud-hooks";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/** Props for the MovieDeleteWarningDialog component, supporting controlled UI states and deletion callbacks. */
type WarningDialogProps = MutationResponseConfig<void, { _id: ObjectId }> & UIOpenStateProps & {
    children?: ReactNode;
    movieID: ObjectId;
    movieName?: string;
};

/** Renders a confirmation dialog that triggers a movie deletion mutation upon user confirmation. */
export function MovieDeleteWarningDialog(
    {children, movieID, movieName, isOpen, setIsOpen, ...submitConfig}: WarningDialogProps
): ReactElement {
    const displayName = movieName ? `"${movieName}"` : "movie";
    const dialogTitle = `Proceed to delete ${displayName}?`;

    const {mutateAsync} = useMovieDeleteMutation();

    const deleteMovie = async () => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.({_id: movieID}),
            });

            await mutateAsync({_id: movieID});

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteMovie}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}