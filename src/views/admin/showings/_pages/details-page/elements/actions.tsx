/**
 * @fileoverview Action container for the Showing details page providing deletion capabilities.
 */

import {ReactElement} from "react";
import {ObjectId} from "@/common/_schemas";
import {ShowingDeleteWarningDialog} from "@/views/admin/showings/_feat/showing-delete-warning";
import {useNavigateToShowingIndex} from "@/domains/showings/_feat/navigation";
import {useIsDeletingUIContext, useIsDeletingUIContextActions} from "@/common/_ctx/ui";

/** Props for the ShowingDetailsPageActions component. */
type ActionProps = {
    className?: string
    showingID: ObjectId;
};

/**
 * Renders action triggers for a specific showing, including the delete warning dialog.
 */
export function ShowingDetailsPageActions(
    {className, showingID}: ActionProps
): ReactElement {
    const isDeleting = useIsDeletingUIContext();
    const {toggle: toggleDeleting} = useIsDeletingUIContextActions();

    const navigateToIndex = useNavigateToShowingIndex();

    return (
        <div className={className}>
            <ShowingDeleteWarningDialog
                _id={showingID}
                isOpen={isDeleting}
                setIsOpen={toggleDeleting}
                onSubmitSuccess={() => navigateToIndex()}
                successMessage="Removed."
            />
        </div>
    );
}