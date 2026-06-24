/**
 * @fileoverview Confirmation dialog component for theatre deletion that wraps a generic warning dialog with theatre-specific mutation logic.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {useTheatreDeleteMutation} from "@/domains/theatres/_feat/crud-hooks";
import {UIOpenStateProps} from "@/common/types";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/** Props for the TheatreDeleteWarningDialog component. */
type DeleteMutationProps = MutationResponseConfig<void, { _id: ObjectId }> & UIOpenStateProps & {
    children?: ReactNode;
    theatreName?: string;
    theatreID: ObjectId;
};

/**
 * Renders a deletion confirmation dialog and executes the theatre deletion mutation upon user approval.
 */
export function TheatreDeleteWarningDialog(
    {children, theatreName, theatreID, isOpen, setIsOpen, ...submitConfig}: DeleteMutationProps
): ReactElement {
    const {mutateAsync} = useTheatreDeleteMutation();

    const dialogTitle = `Proceed to delete ${theatreName ?? "theatre"}?`;

    const deleteTheatre = async () => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.({_id: theatreID}),
            });

            await mutateAsync({_id: theatreID});

            handleMutationCallback({
                message: submitConfig.submitMessage,
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
            deleteResource={deleteTheatre}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}