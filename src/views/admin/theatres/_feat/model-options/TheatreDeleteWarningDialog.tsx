/**
 * @fileoverview Confirmation dialog component for theatre deletion that wraps a generic warning dialog with theatre-specific mutation logic.
 */

import {ReactElement, ReactNode} from 'react';
import useTheatreDeleteMutation from "@/domains/theatres/_feat/crud-hooks/useTheatreDeleteMutation.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/** Props for the TheatreDeleteWarningDialog component. */
type DeleteMutationProps = OnDeleteMutationParams & PresetOpenState & {
    children?: ReactNode;
    theatreName?: string;
    theatreID: ObjectId;
};

/**
 * Renders a deletion confirmation dialog and executes the theatre deletion mutation upon user approval.
 */
export function TheatreDeleteWarningDialog(
    params: DeleteMutationProps
): ReactElement {
    const {children, theatreName, theatreID, presetOpen, setPresetOpen, ...mutationOptions} = params;
    const presetControl: PresetOpenState = filterNullishAttributes({presetOpen, setPresetOpen});

    const {mutate} = useTheatreDeleteMutation(mutationOptions);

    const dialogTitle = `Proceed to delete ${theatreName ?? "theatre"}?`;

    const deleteTheatre = () => {
        mutate({_id: theatreID});
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteTheatre}
            {...presetControl}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}