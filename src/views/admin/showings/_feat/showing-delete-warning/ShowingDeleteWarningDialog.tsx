/**
 * @fileoverview A confirmation dialog for deleting a specific showing resource.
 */

import {ReactElement, ReactNode} from "react";
import {EntityDeleteWarningDialog} from "@/views/common/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {useShowingDeleteMutation} from "@/domains/showings/_feat/crud-hooks";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ObjectId} from "@/common/_schemas";
import {UIOpenStateProps} from "@/common/_types";
import {handleMutationCallback, handleSubmitResponseError} from "@/common/_feat";

/** Props for the ShowingDeleteWarningDialog component. */
type DialogProps = UIOpenStateProps & MutationResponseConfig & {
    children?: ReactNode;
    _id: ObjectId
};

/** Modal dialog that triggers the showing deletion mutation upon user confirmation. */
export function ShowingDeleteWarningDialog(
    {children, _id, isOpen, setIsOpen, ...onDeleteConfig}: DialogProps
): ReactElement {
    const {mutateAsync} = useShowingDeleteMutation();

    const deleteShowing = async () => {
        try {
            handleMutationCallback({
                cb: onDeleteConfig?.onSubmit,
                messageType: "success",
                message: onDeleteConfig?.submitMessage,
            });

            await mutateAsync({_id});

            handleMutationCallback({
                cb: onDeleteConfig?.onSubmitSuccess,
                messageType: "success",
                message: onDeleteConfig?.successMessage,
            });
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: onDeleteConfig?.errorMessage});
            onDeleteConfig?.onSubmitError?.(error);
        }
    };


    return (
        <EntityDeleteWarningDialog
            title={`Proceed to delete showing?`}
            deleteResource={deleteShowing}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}