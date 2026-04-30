/**
 * @fileoverview Specialized confirmation dialog for Theatre Screen deletion workflows.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {useScreenDeleteMutation} from "@/domains/theatre-screens/_feat/crud-hooks";
import {UIOpenStateProps} from "@/common/types";

/** Props for the ScreenDeleteWarningDialog component. */
type DialogProps = MutationResponseConfig & UIOpenStateProps & {
    children?: ReactNode;
    screenID: ObjectId;
    screenName?: string;
};

/** A domain-specific warning dialog that confirms a user's intent to delete a Theatre Screen. */
export function ScreenDeleteWarningDialog(
    {children, screenID, screenName, isOpen, setIsOpen, ...mutationParams}: DialogProps
): ReactElement {
    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;

    const {mutate} = useScreenDeleteMutation(mutationParams);

    const deleteScreen = () => {
        mutate({_id: screenID});
    };

    return (
        <EntityDeleteWarningDialog
            deleteResource={deleteScreen}
            title={dialogTitle}
            description="This action is permanent and will remove all associated seat configurations."
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}