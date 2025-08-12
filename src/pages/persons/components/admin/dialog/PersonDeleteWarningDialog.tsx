import {FC, PropsWithChildren} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import usePersonDeleteMutation from "@/pages/persons/hooks/mutations/admin/usePersonDeleteMutation.ts";

type WarningDialogProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /** The display name of the person being deleted, used in the dialog title. */
    personName: string;

    /** The unique ObjectId of the person to delete. */
    personID: ObjectId;

    /**
     * Optional callback executed after a successful delete mutation.
     */
    onSubmitSuccess?: () => void;

    /**
     * Optional callback executed if the delete mutation encounters an error.
     * @param error - The error object or value returned from the mutation.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * A confirmation dialog component for deleting a person entity.
 *
 * Wraps the generic {@link EntityDeleteWarningDialog} with person-specific
 * details and triggers a delete mutation using {@link usePersonDeleteMutation}.
 *
 * @param {PropsWithChildren<WarningDialogProps>} params - Props including person info, mutation callbacks, and optional children.
 * @param {React.ReactNode} [params.children] - Optional trigger element for the dialog (e.g. a button).
 * @param {string} params.personName - Name of the person, displayed in the dialog title.
 * @param {ObjectId} params.personID - Unique identifier of the person to delete.
 * @param {() => void} [params.onSubmitSuccess] - Callback invoked on successful deletion.
 * @param {(error: unknown) => void} [params.onSubmitError] - Callback invoked on deletion error.
 *
 * @returns {JSX.Element} A warning dialog that confirms deletion and runs the delete mutation.
 */
const PersonDeleteWarningDialog: FC<PropsWithChildren<WarningDialogProps>> = (params) => {
    const {children, personID, personName, ...mutationParams} = params;

    const dialogTitle = `Proceed to delete entry for "${personName}"?`;
    const {mutate} = usePersonDeleteMutation(mutationParams);

    const deletePerson = () => {
        mutate({_id: personID});
    }

    return (
        <EntityDeleteWarningDialog title={dialogTitle} deleteResource={deletePerson}>
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default PersonDeleteWarningDialog;
