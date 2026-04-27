/** @fileoverview Confirmation dialog for deleting movie credits with integrated mutation logic. */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {useMovieCreditDeleteMutation} from "@/domains/moviecredit/_feat/crud-hooks";
import {UIOpenStateProps} from "@/common/types";

/** Props for the MovieCreditDeleteWarningDialog component. */
type WarningDialogProps = MutationResponseConfig & UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectId;
    displayText?: string;
    displayDescription?: string;
}

/** Renders a warning dialog that triggers a movie credit deletion mutation upon user confirmation. */
export function MovieCreditDeleteWarningDialog(
    props: WarningDialogProps
): ReactElement {
    const {children, _id, displayText, displayDescription, isOpen, setIsOpen, ...deleteParams} = props;

    const dialogTitle = `Proceed to delete ${displayText ?? "credit"}?`;
    const {mutate} = useMovieCreditDeleteMutation(deleteParams);

    const deleteCredit = () => {
        mutate({_id});
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            description={displayDescription}
            deleteResource={deleteCredit}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}