/**
 * @fileoverview Specialized confirmation dialog for Theatre Screen deletion workflows.
 * Wraps the generic entity deletion dialog with domain-specific logic and mutations.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {useScreenDeleteMutation} from "@/domains/theatre-screens/_feat/crud-hooks";

/**
 * Props for the ScreenDeleteWarningDialog component.
 */
type DialogProps = MutationResponseConfig & PresetOpenState & {
    children?: ReactNode;
    screenID: ObjectId;
    screenName?: string;
};

/**
 * A domain-specific warning dialog that confirms a user's intent to delete a Theatre Screen.
 */
export function ScreenDeleteWarningDialog(
    {children, screenID, screenName, presetOpen, setPresetOpen, ...mutationParams}: DialogProps
): ReactElement {
    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;

    const {mutate} = useScreenDeleteMutation(mutationParams);

    /**
     * Filters out undefined open state props to allow the underlying dialog
     * to manage its own state if props are not provided.
     */
    const presets: PresetOpenState = filterNullishAttributes({presetOpen, setPresetOpen});

    /**
     * Triggers the deletion mutation for the specified screen ID.
     */
    const deleteScreen = () => {
        mutate({_id: screenID});
    };

    return (
        <EntityDeleteWarningDialog
            deleteResource={deleteScreen}
            title={dialogTitle}
            description="This action is permanent and will remove all associated seat configurations."
            {...presets}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}