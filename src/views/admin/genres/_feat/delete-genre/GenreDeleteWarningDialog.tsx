/**
 * @fileoverview Confirmation dialog for Genre deletion.
 * Orchestrates the deletion flow with a protective warning UI.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import useDeleteGenre from "@/domains/genres/_feat/crud-hooks/useDeleteGenre.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";

/** Props for the {@link GenreDeleteWarningDialog} component. */
type DialogProps = MutationResponseConfig & {
    /** The trigger element to open the dialog, if not controlled externally. */
    children?: ReactNode;
    /** The unique identifier of the genre to be deleted. */
    _id: ObjectId;
    /** The display name of the genre, used for confirmation text. */
    name: string;
    /** Controlled open state of the dialog. */
    isOpen: boolean;
    /** Callback to update the dialog's open state. */
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Renders a confirmation dialog that warns users before permanently deleting a Genre.
 * Integrates with the `useDeleteGenre` hook to handle the mutation and lifecycle callbacks.
 */
export function GenreDeleteWarningDialog(
    {children, _id, name, isOpen, setIsOpen, ...mutationParams}: DialogProps
): ReactElement {
    const {mutate} = useDeleteGenre(mutationParams);

    return (
        <EntityDeleteWarningDialog
            title={`Proceed to delete "${name}"?`}
            deleteResource={() => mutate({_id})}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}