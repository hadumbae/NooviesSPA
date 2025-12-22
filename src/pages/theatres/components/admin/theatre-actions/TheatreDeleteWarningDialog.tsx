import {FC, ReactNode} from 'react';
import useTheatreDeleteMutation from "@/pages/theatres/hooks/delete-theatre/useTheatreDeleteMutation.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Props for {@link TheatreDeleteWarningDialog}.
 *
 * Extends {@link OnDeleteMutationParams} for deletion callbacks and messages.
 *
 * @property theatreName - Optional display name of the theatre for dialog title.
 * @property theatreID - Required ID of the theatre to delete.
 */
type DeleteMutationProps = OnDeleteMutationParams & PresetOpenState & {
    children?: ReactNode;
    theatreName?: string;
    theatreID: ObjectId;
};

/**
 * **TheatreDeleteWarningDialog**
 *
 * A confirmation dialog component to delete a theatre.
 * - Uses {@link useTheatreDeleteMutation} to perform deletion.
 * - Displays an alert dialog with a customizable title and warning description.
 * - Supports optional children to replace the default trigger button.
 *
 * @param params - Component props including theatre info and delete mutation options.
 * @param params.children - Optional trigger element for the dialog. Defaults to a "Delete" span.
 *
 * @example
 * ```tsx
 * <TheatreDeleteWarningDialog
 *   theatreID="66b9d1b8c35f2a0012cd90f0"
 *   theatreName="Grand Theatre"
 *   successMessage="Theatre deleted successfully!"
 *   onDeleteSuccess={() => console.log("Theatre deleted")}
 *   errorMessage="Failed to delete theatre"
 * >
 *   <Button variant="destructive">Delete Theatre</Button>
 * </TheatreDeleteWarningDialog>
 * ```
 */
const TheatreDeleteWarningDialog: FC<DeleteMutationProps> = (params) => {
    // ⚡ State ⚡
    const {children, theatreName, theatreID, presetOpen, setPresetOpen, ...mutationOptions} = params;
    const presetControl: PresetOpenState = filterNullishAttributes({presetOpen, setPresetOpen});

    // ⚡ Mutation ⚡
    const {mutate} = useTheatreDeleteMutation(mutationOptions);

    // ⚡ Dialog Title ⚡
    const dialogTitle = `Proceed to delete ${theatreName ?? "theatre"}?`;

    // ⚡ On Delete Handler ⚡
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
};

export default TheatreDeleteWarningDialog;
