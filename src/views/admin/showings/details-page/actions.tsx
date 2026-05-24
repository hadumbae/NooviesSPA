/**
 * @fileoverview Action container for the Showing details page providing deletion capabilities.
 */

import {ReactElement} from "react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ShowingDetailsUISetterContext, ShowingDetailsUIStateContext} from "@/domains/showings/context";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ShowingDeleteWarningDialog} from "@/views/admin/showings/_feat/showing-delete-warning";
import {useNavigateToShowingIndex} from "@/domains/showings/_feat/navigation";
import {MutationResponseConfig} from "@/common/features/submit-data";

/** Props for the ShowingDetailsPageActions component. */
type ActionProps = {
    className?: string
    showingID: ObjectId;
};

/**
 * Renders action triggers for a specific showing, including the delete warning dialog.
 * Requires ShowingDetailsUIStateContext and ShowingDetailsUISetterContext.
 */
export function ShowingDetailsPageActions(
    {className, showingID}: ActionProps
): ReactElement {
    const {isDeleting} = useRequiredContext({context: ShowingDetailsUIStateContext});
    const {setIsDeleting} = useRequiredContext({context: ShowingDetailsUISetterContext});

    const navigateToIndex = useNavigateToShowingIndex();

    const responseConfig: MutationResponseConfig = {
        onSubmitSuccess: () => navigateToIndex(),
    }

    return (
        <div className={className}>
            <ShowingDeleteWarningDialog
                _id={showingID}
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
                onDeleteConfig={responseConfig}
            />
        </div>
    );
}