import { FC, PropsWithChildren } from 'react';
import { OnDeleteMutationParams } from "@/common/type/form/MutationDeleteParams.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";
import useScreenDeleteMutation from "@/pages/screens/hooks/screens/delete-screens/useScreenDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";

/**
 * Props for the `ScreenDeleteWarningDialog` component.
 */
type DialogProps = OnDeleteMutationParams & {
    /** The unique identifier of the screen to delete. */
    screenID: ObjectId;

    /** Optional display name of the screen for the dialog title. */
    screenName?: string;
};

/**
 * A reusable dialog component for confirming the deletion of a screen.
 *
 * Wraps the `EntityDeleteWarningDialog` and integrates the screen deletion mutation.
 *
 * @param props.screenID - The ID of the screen to delete.
 * @param props.screenName - Optional name of the screen to display in the dialog title.
 * @param props.successMessage - Optional message to show on successful deletion.
 * @param props.errorMessage - Optional message to show on deletion failure.
 * @param props.onDeleteSuccess - Callback fired when deletion succeeds.
 * @param props.onDeleteError - Callback fired when deletion fails.
 * @param props.children - Optional content to display inside the dialog.
 */
const ScreenDeleteWarningDialog: FC<PropsWithChildren<DialogProps>> = (props) => {
    const { children, screenID, screenName, ...mutationParams } = props;

    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;
    const { mutate } = useScreenDeleteMutation(mutationParams);

    /**
     * Fires the screen deletion mutation.
     */
    const deleteScreen = () => {
        mutate({ _id: screenID });
    }

    return (
        <EntityDeleteWarningDialog
            deleteResource={deleteScreen}
            title={dialogTitle}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default ScreenDeleteWarningDialog;
