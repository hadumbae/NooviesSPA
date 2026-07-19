/**
 * @fileoverview Renders the Edit and Delete action buttons for the Seat Details panel.
 */

import {Button} from "@/views/common/_comp/ui/button.tsx";
import {Pencil, Trash, X} from "lucide-react";
import {Dispatch, ReactElement, SetStateAction} from "react";

/** Props for the SeatContextPanelOptionButtonsSection component. */
type SectionProps = {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    showDeleteWarning: boolean;
    setShowDeleteWarning: Dispatch<SetStateAction<boolean>>;
};

/** Renders the Edit and Delete/Warning action buttons for the Seat Context panel. */
export function SeatContextPanelOptionButtonsSection(
    {isEditing, setIsEditing, showDeleteWarning, setShowDeleteWarning}: SectionProps
): ReactElement {
    if (isEditing) {
        return (
            <Button variant="secondary" className="select-none w-full" onClick={() => setIsEditing(false)}>
                <X/> Close
            </Button>
        );
    }

    if (showDeleteWarning) {
        return (
            <Button variant="secondary" className="select-none w-full" onClick={() => setShowDeleteWarning(false)}>
                <X/> Cancel
            </Button>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-2 px-5">
            <Button
                variant="primary"
                className="select-none max-lg:col-span-2"
                onClick={() => setIsEditing(true)}>
                <Pencil/> Edit
            </Button>

            <Button
                variant="primary"
                className="select-none max-lg:col-span-2"
                onClick={() => setShowDeleteWarning(true)}>
                <Trash/> Delete
            </Button>
        </div>
    );
}