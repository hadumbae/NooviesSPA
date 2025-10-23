import {FC, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import usePersonDeleteMutation from "@/pages/persons/hooks/mutations/admin/usePersonDeleteMutation.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

/**
 * Props for `PersonDeleteWarningDialog`.
 *
 * @property children - Optional element that triggers the dialog when clicked.
 * @property personName - The name of the person being deleted, used in the dialog title.
 * @property personID - The ID of the person to delete.
 * @property presetOpen - Optional controlled open state for the dialog.
 * @property setPresetOpen - Optional setter for controlled open state.
 * @property mutationParams - Additional mutation callbacks and messages from `OnDeleteMutationParams`.
 */
type WarningDialogProps = OnDeleteMutationParams & PresetOpenState & {
    children?: ReactNode;
    personName: string;
    personID: ObjectId;
};

/**
 * A warning dialog for confirming deletion of a person entry.
 *
 * @remarks
 * - Wraps `EntityDeleteWarningDialog` with pre-configured title and deletion logic.
 * - Uses `usePersonDeleteMutation` to handle deletion and trigger mutation callbacks.
 * - Supports optional controlled open state via `presetOpen` / `setPresetOpen`.
 * - Filters out empty attributes to avoid passing undefined props to the dialog.
 *
 * @example
 * ```tsx
 * <PersonDeleteWarningDialog
 *   personID={person.id}
 *   personName={person.name}
 *   onDeleteSuccess={() => console.log("Person deleted")}
 * >
 *   <Button>Delete Person</Button>
 * </PersonDeleteWarningDialog>
 * ```
 */
const PersonDeleteWarningDialog: FC<WarningDialogProps> = (params) => {
    const {children, personID, personName, presetOpen, setPresetOpen, ...mutationParams} = params;

    const dialogTitle = `Proceed to delete entry for "${personName}"?`;
    const presetState: PresetOpenState = filterEmptyAttributes({presetOpen, setPresetOpen});

    const {mutate} = usePersonDeleteMutation(mutationParams);
    const deletePerson = () => mutate({_id: personID});

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deletePerson}
            {...presetState}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default PersonDeleteWarningDialog;
