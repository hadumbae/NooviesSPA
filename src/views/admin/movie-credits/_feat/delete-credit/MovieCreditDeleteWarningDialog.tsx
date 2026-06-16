/** @fileoverview Confirmation dialog for deleting movie credits with integrated mutation logic. */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/types";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {useMovieCreditDeleteMutation} from "@/domains/moviecredit";

/** Props for the MovieCreditDeleteWarningDialog component. */
type WarningDialogProps = MutationResponseConfig & UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectId;
    displayText?: string;
    displayDescription?: string;
}

/** Renders a warning dialog that triggers a movie credit deletion mutation upon user confirmation. */
export function MovieCreditDeleteWarningDialog(
    props: WarningDialogProps
): ReactElement {
    const {children, _id, displayText, displayDescription, isOpen, setIsOpen, ...mutationConfig} = props;

    const dialogTitle = `Proceed to delete ${displayText ?? "credit"}?`;
    const {mutateAsync} = useMovieCreditDeleteMutation();

    const deleteCredit = async () => {
        try {
            handleMutationCallback({
                message: mutationConfig.submitMessage,
                cb: () => mutationConfig.onSubmit?.(),
            });

            await mutateAsync({_id});

            handleMutationCallback({
                message: mutationConfig.submitMessage,
                messageType: "success",
                cb: () => mutationConfig.onSubmit?.(),
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: mutationConfig.errorMessage});
            mutationConfig.onSubmitError?.(error);
        }
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            description={displayDescription}
            deleteResource={deleteCredit}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}