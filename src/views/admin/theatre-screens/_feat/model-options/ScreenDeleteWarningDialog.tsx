/**
 * @fileoverview Specialized confirmation dialog for Theatre Screen deletion workflows.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {useScreenDeleteMutation} from "@/domains/theatre-screens/_feat/crud-hooks";
import {UIOpenStateProps} from "@/common/types";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/** Props for the ScreenDeleteWarningDialog component. */
type DialogProps = MutationResponseConfig<void, { _id: ObjectId }> & UIOpenStateProps & {
    children?: ReactNode;
    screenID: ObjectId;
    screenName?: string;
};

/** A domain-specific warning dialog that confirms a user's intent to delete a Theatre Screen. */
export function ScreenDeleteWarningDialog(
    {children, screenID, screenName, isOpen, setIsOpen, ...submitConfig}: DialogProps
): ReactElement {
    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;
    const {mutateAsync} = useScreenDeleteMutation();

    const deleteScreen = async () => {
        try {
            handleMutationCallback({
                cb: () => submitConfig.onSubmit?.({_id: screenID}),
                message: submitConfig.submitMessage,
            });

            await mutateAsync({_id: screenID});

            handleMutationCallback({
                cb: () => submitConfig.onSubmitSuccess?.(),
                message: submitConfig.successMessage,
                messageType: "success"
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    };

    return (
        <EntityDeleteWarningDialog
            deleteResource={deleteScreen}
            title={dialogTitle}
            description="This action is permanent and will remove all associated seat configurations."
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}