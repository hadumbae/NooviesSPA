/**
 * @fileoverview Specialized confirmation dialog for Person record deletion.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {useRemovePersonData} from "@/domains/persons/_feat/crud-hooks";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {UIOpenStateProps} from "@/common/types";

/**
 * Props for the {@link PersonDeleteWarningDialog} component.
 */
type WarningDialogProps = MutationResponseConfig<void, { _id: ObjectId }> & UIOpenStateProps & {
    children?: ReactNode;
    personID: ObjectId;
    personName: string;
};

/**
 * A warning dialog for confirming the permanent deletion of a Person entry.
 */
export function PersonDeleteWarningDialog(
    {children, personID, personName, isOpen, setIsOpen, ...mutationConfig}: WarningDialogProps
): ReactElement {
    const dialogTitle = `Proceed to delete entry for "${personName}"?`;
    const {mutateAsync} = useRemovePersonData();
    const deletePerson = async () => {
        try {
            handleMutationCallback({
                cb: () => mutationConfig.onSubmit?.({_id: personID}),
                message: mutationConfig.submitMessage,
            });

            await mutateAsync({_id: personID});

            handleMutationCallback({
                cb: () => mutationConfig.onSubmitSuccess?.(),
                message: mutationConfig.successMessage,
                messageType: "success",
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: mutationConfig.errorMessage});
            mutationConfig.onSubmitError?.(error);
        }
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deletePerson}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}