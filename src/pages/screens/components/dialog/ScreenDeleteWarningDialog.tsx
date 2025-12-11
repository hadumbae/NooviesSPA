/**
 * @file ScreenDeleteWarningDialog
 * @description
 * A reusable dialog component for confirming deletion of a screen entity.
 *
 * Wraps `EntityDeleteWarningDialog` and integrates the screen deletion mutation.
 * Handles success/error callbacks and allows optional content inside the dialog.
 */

import { FC, PropsWithChildren } from 'react';
import { OnDeleteMutationParams } from "@/common/type/form/MutationDeleteParams.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useScreenDeleteMutation from "@/pages/screens/hooks/screens/delete-screens/useScreenDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Props for the `ScreenDeleteWarningDialog` component.
 */
type DialogProps = OnDeleteMutationParams & PresetOpenState & {
    /** The unique identifier of the screen to delete. */
    screenID: ObjectId;

    /** Optional display name of the screen for the dialog title. */
    screenName?: string;
};

/**
 * Displays a confirmation dialog for deleting a screen.
 *
 * Integrates the delete mutation and provides optional success/error handling.
 *
 * @param props.screenID - ID of the screen to delete.
 * @param props.screenName - Optional display name of the screen in the dialog title.
 * @param props.successMessage - Optional message displayed when deletion succeeds.
 * @param props.errorMessage - Optional message displayed when deletion fails.
 * @param props.onDeleteSuccess - Callback invoked on successful deletion.
 * @param props.onDeleteError - Callback invoked if deletion fails.
 * @param props.presetOpen - Optional initial open state of the dialog.
 * @param props.setPresetOpen - Optional state setter to control open/closed state.
 * @param props.children - Optional content rendered inside the dialog.
 *
 * @example
 * ```tsx
 * <ScreenDeleteWarningDialog
 *   screenID={screen._id}
 *   screenName={screen.name}
 *   successMessage="Screen deleted successfully"
 *   onDeleteSuccess={() => console.log("Deleted!")}
 * />
 * ```
 */
const ScreenDeleteWarningDialog: FC<PropsWithChildren<DialogProps>> = (props) => {
    const { children, screenID, screenName, presetOpen, setPresetOpen, ...mutationParams } = props;

    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;
    const { mutate } = useScreenDeleteMutation(mutationParams);

    const presets: PresetOpenState = filterNullishAttributes({ presetOpen, setPresetOpen });

    /**
     * Fires the deletion mutation for the screen.
     */
    const deleteScreen = () => {
        mutate({ _id: screenID });
    }

    return (
        <EntityDeleteWarningDialog
            deleteResource={deleteScreen}
            title={dialogTitle}
            {...presets}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default ScreenDeleteWarningDialog;
