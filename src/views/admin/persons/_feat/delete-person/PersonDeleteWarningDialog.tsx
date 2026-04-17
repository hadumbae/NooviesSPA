/**
 * @fileoverview Specialized confirmation dialog for Person record deletion.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {useRemovePersonData} from "@/domains/persons/_feat/crud-hooks";
import {MutationResponseConfig} from "@/common/features/submit-data";

/**
 * Props for the {@link PersonDeleteWarningDialog} component.
 */
type WarningDialogProps = MutationResponseConfig & {
    children?: ReactNode;
    personID: ObjectId;
    personName: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * A warning dialog for confirming the permanent deletion of a Person entry.
 */
export function PersonDeleteWarningDialog(
    {children, personID, personName, isOpen, setIsOpen, ...mutationParams}: WarningDialogProps
): ReactElement {
    const dialogTitle = `Proceed to delete entry for "${personName}"?`;
    const {mutate} = useRemovePersonData(mutationParams);
    const deletePerson = () => mutate({_id: personID});

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deletePerson}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}