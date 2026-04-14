/**
 * @fileoverview Dropdown menu for Genre-specific management actions.
 * Orchestrates the transition between viewing, editing, and deletion states.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUIContext} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContext.ts";

/** Props for the {@link GenreDetailsUIToggles} component. */
type ToggleProps = {
    children: ReactNode;
};

/**
 * Renders a dropdown menu containing management actions for a specific genre.
 * Interacts with GenreDetailsUIContext to signal when the user intends to edit or delete.
 */
export function GenreDetailsUIToggles({children}: ToggleProps): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {setIsEditing, setIsDeleting} = useRequiredContext({context: GenreDetailsUIContext});

    const closeOnAction = (action: Dispatch<SetStateAction<boolean>>) => {
        action(true);
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => closeOnAction(setIsEditing)}>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => closeOnAction(setIsDeleting)}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}