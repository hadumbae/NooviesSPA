/**
 * @fileoverview Dropdown menu for Genre-specific management actions.
 * Orchestrates the transition between viewing, editing, and deletion states.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUISetterContext,} from "@/domains/genres/context/genre-details-ui-context";

/** Props for the {@link GenreDetailsUIToggles} component. */
type ToggleProps = {
    children: ReactNode;
};

/**
 * Renders a dropdown menu containing management actions for a specific genre.
 */
export function GenreDetailsUIToggles({children}: ToggleProps): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        setIsEditing,
        setIsDeleting,
        setIsUpdatingImage,
        setIsRemovingImage,
    } = useRequiredContext({context: GenreDetailsUISetterContext});

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
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Genre</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => closeOnAction(setIsEditing)}>
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => closeOnAction(setIsDeleting)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Images</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => closeOnAction(setIsUpdatingImage)}>
                        Update
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => closeOnAction(setIsRemovingImage)}>
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}