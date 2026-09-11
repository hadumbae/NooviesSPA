/**
 * @fileoverview Confirmation dialog component for theatre deletion that wraps a generic warning dialog with theatre-specific mutation logic.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/_schemas";
import {EntityDeleteWarningDialog} from "@/views/common/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {useTheatreDeleteMutation} from "@/domains/theatres/_feat/crud-hooks";
import {UIOpenStateProps} from "@/common/_types";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {handleMutateAsync} from "@/common/_feat";

/** Props for the TheatreDeleteWarningDialog component. */
type DeleteMutationProps = MutationResponseConfig<void, { _id: ObjectId }> & UIOpenStateProps & {
    children?: ReactNode;
    theatreName?: string;
    theatreID: ObjectId;
};

/**
 * Renders a deletion confirmation dialog and executes the theatre deletion mutation upon user approval.
 */
export function TheatreDeleteWarningDialog(
    {children, theatreName, theatreID, isOpen, setIsOpen, ...submitConfig}: DeleteMutationProps
): ReactElement {
    const {mutateAsync} = useTheatreDeleteMutation();

    const dialogTitle = `Proceed to delete ${theatreName ?? "theatre"}?`;

    const deleteTheatre = handleMutateAsync({
        ...submitConfig,
        mutateAsync,
    });

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={() => deleteTheatre({_id: theatreID})}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}