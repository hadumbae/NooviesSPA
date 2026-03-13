/**
 * @file Dropdown toggles for genre detail actions.
 * @filename GenreDetailsUIToggles.tsx
 */

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { GenreDetailsUIContext } from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContext.ts";

/**
 * Props for {@link GenreDetailsUIToggles}.
 */
type ToggleProps = {
    /**
     * Element used as the dropdown trigger.
     */
    children: ReactNode;
};

/**
 * Dropdown menu exposing genre management actions.
 *
 * Integrates with {@link GenreDetailsUIContext} to trigger editing
 * or deletion flows for the current genre.
 */
const GenreDetailsUIToggles = ({ children }: ToggleProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { setIsEditing, setIsDeleting } = useRequiredContext({ context: GenreDetailsUIContext });

    /**
     * Executes a UI state action and closes the dropdown.
     *
     * @param action - State setter controlling a UI mode in the context.
     */
    const closeOnAction = (action: Dispatch<SetStateAction<boolean>>) => {
        action(true);
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => closeOnAction(setIsEditing)}>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => closeOnAction(setIsDeleting)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GenreDetailsUIToggles;