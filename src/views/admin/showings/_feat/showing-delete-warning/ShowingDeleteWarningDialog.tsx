/**
 * @fileoverview A confirmation dialog for deleting a specific showing resource.
 */

import {ReactElement, ReactNode} from "react";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {useShowingDeleteMutation} from "@/domains/showings/_feat/crud-hooks";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ObjectId} from "@/common/_schemas";
import {UIOpenStateProps} from "@/common/types";

/** Props for the ShowingDeleteWarningDialog component. */
type DialogProps = UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectId
    onDeleteConfig?: MutationResponseConfig;
};

/** Modal dialog that triggers the showing deletion mutation upon user confirmation. */
export function ShowingDeleteWarningDialog(
    {children, _id, onDeleteConfig, isOpen, setIsOpen}: DialogProps
): ReactElement {
    const {mutate} = useShowingDeleteMutation(onDeleteConfig);

    return (
        <EntityDeleteWarningDialog
            title={`Proceed to delete showing?`}
            deleteResource={() => mutate({_id})}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}