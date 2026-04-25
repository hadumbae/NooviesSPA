/**
 * @file Specialized confirmation dialog for Theatre Screen deletion workflows.
 * @filename ScreenDeleteWarningDialog.tsx
 */

import {ReactNode} from 'react';
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useScreenDeleteMutation from "@/domains/theatre-screens/_feat/crud-hooks/useScreenDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Props for the {@link ScreenDeleteWarningDialog} component.
 */
type DialogProps = OnDeleteMutationParams & PresetOpenState & {
    /** The trigger element or additional descriptive content rendered within the dialog context. */
    children: ReactNode;

    /** The unique {@link ObjectId} of the Theatre Screen targeted for removal. */
    screenID: ObjectId;

    /** An optional display name used to personalize the confirmation message (e.g., "Screen 1"). */
    screenName?: string;
};

/**
 * A domain-specific wrapper around {@link EntityDeleteWarningDialog} tailored for Theatre Screens.
 * @param props - Component configuration including the target ID and lifecycle hooks.
 * @returns A structured warning dialog component.
 */
const ScreenDeleteWarningDialog = (
    {children, screenID, screenName, presetOpen, setPresetOpen, ...mutationParams}: DialogProps
) => {
    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;

    const {mutate} = useScreenDeleteMutation(mutationParams);

    const presets: PresetOpenState = filterNullishAttributes({presetOpen, setPresetOpen});

    const deleteScreen = () => {
        mutate({_id: screenID});
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