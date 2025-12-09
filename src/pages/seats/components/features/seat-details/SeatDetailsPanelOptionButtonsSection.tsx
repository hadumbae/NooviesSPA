/**
 * @file SeatDetailsPanelOptionButtonsSection.tsx
 * @description
 * Renders the Edit and Delete action buttons for the Seat Details panel.
 *
 * Behavior:
 * - Pulls editing and delete-warning states from `SeatDetailsPanelContext`
 *   via `useRequiredContext`.
 * - Toggles between Edit/Close and Delete/Close modes depending on state.
 * - Each button can expand to span two columns when active.
 * - Buttons hide each other when their opposite state is active
 *   (e.g., delete button hides during editing).
 *
 * This component is UI-only and does not perform any data mutations.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {LucideIcon, Pencil, Trash, X} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import {ReactNode} from "react";

/**
 * Configuration structure for rendering an option button.
 */
type ButtonConfig = {
    /** Whether the button is currently active (expands to span two columns). */
    active: boolean;

    /** Whether the button should be hidden. */
    hidden: boolean;

    /** Visual variant for the button, matching shadcn/ui. */
    variant: ButtonVariant;

    /** Icon to display inside the button. */
    icon: LucideIcon;

    /** Text label for the button. */
    label: string;

    /** Click handler for toggling the related panel state. */
    onClick: () => void;
};

/**
 * Renders the Edit and Delete/Warning action buttons for the Seat Details panel.
 *
 * Uses context state (`isEditing`, `showDeleteWarning`) to determine:
 * - Which button appears active
 * - Which button is hidden
 * - Which icon and label to show
 *
 * @returns A two-column grid of action buttons.
 */
const SeatDetailsPanelOptionButtonsSection = () => {
    // --- Access Context ---
    const {isEditing, setIsEditing, showDeleteWarning, setShowDeleteWarning} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    // --- Button Configs ---

    const editConfig: ButtonConfig = {
        active: isEditing,
        hidden: showDeleteWarning,
        variant: isEditing ? "secondary" : "primary",
        icon: isEditing ? X : Pencil,
        label: isEditing ? "Close" : "Edit",
        onClick: () => setIsEditing(prev => !prev),
    };

    const deleteConfig: ButtonConfig = {
        active: showDeleteWarning,
        hidden: isEditing,
        variant: showDeleteWarning ? "secondary" : "primary",
        icon: showDeleteWarning ? X : Trash,
        label: showDeleteWarning ? "Cancel" : "Delete",
        onClick: () => setShowDeleteWarning(prev => !prev),
    };

    // --- Render Utility ---

    /**
     * Renders a single button using a given `ButtonConfig`.
     *
     * @param config - Button rendering configuration.
     */
    const renderButton = (config: ButtonConfig): ReactNode => {
        const {icon: Icon, active, variant, hidden, label, onClick} = config;

        return (
            <Button
                variant={variant}
                className={cn("select-none", active && "col-span-2", hidden && "hidden")}
                onClick={onClick}
            >
                <Icon /> {label}
            </Button>
        );
    };

    // --- Render ---

    return (
        <div className="grid grid-cols-2 gap-2 px-5">
            {renderButton(editConfig)}
            {renderButton(deleteConfig)}
        </div>
    );
};

export default SeatDetailsPanelOptionButtonsSection;
