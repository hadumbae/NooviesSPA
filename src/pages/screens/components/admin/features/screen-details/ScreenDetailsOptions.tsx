/**
 * @file ScreenDetailsOptions.tsx
 * @summary
 * Dropdown menu providing "Edit" and "Delete" actions for the Screen Details page.
 *
 * @description
 * Renders a button that opens a dropdown menu with options to:
 * - Edit the current screen (`isEditing = true`)
 * - Open the delete confirmation modal (`showDeleteWarning = true`)
 *
 * Relies on {@link ScreenDetailsUIContext} and must be used inside
 * a {@link ScreenDetailsUIContextProvider}.
 *
 * @example
 * ```tsx
 * <ScreenDetailsUIContextProvider>
 *   <ScreenDetailsOptions />
 * </ScreenDetailsUIContextProvider>
 * ```
 */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { Ellipsis } from "lucide-react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { ScreenDetailsUIContext } from "@/pages/screens/contexts/screen-details/ScreenDetailsUIContext.ts";
import { Dispatch, SetStateAction, useState } from "react";

/**
 * Renders a dropdown menu with "Edit" and "Delete" actions for a screen.
 *
 * Opens the menu on button click, and triggers the appropriate context updates
 * when a menu item is selected.
 *
 * @returns A `DropdownMenu` component for editing or deleting a screen.
 */
const ScreenDetailsOptions = () => {
    const { setIsEditing, setShowDeleteWarning } = useRequiredContext({ context: ScreenDetailsUIContext });
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Closes the dropdown and triggers the provided action.
     *
     * @param action - State setter from context to toggle edit/delete modal.
     */
    const closeOnClick = (action: Dispatch<SetStateAction<boolean>>) => {
        setIsOpen(false);
        action(true);
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <DropdownMenuTrigger asChild>
                <IconButton>
                    <Ellipsis />
                </IconButton>
            </DropdownMenuTrigger>

            {/* Menu Items */}
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => closeOnClick(setIsEditing)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => closeOnClick(setShowDeleteWarning)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ScreenDetailsOptions;
