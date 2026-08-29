/**
 * @fileoverview Dropdown menu for Genre-specific management actions.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/views/common/_comp/ui";
import {useIsDeletingUIContextActions, useIsEditingUIContextActions} from "@/common/_ctx/ui";

/** Props for the {@link GenreDetailsUIToggles} component. */
type ToggleProps = {
    children: ReactNode;
};

/**
 * Renders a dropdown menu containing management actions for a specific genre.
 */
export function GenreDetailsUIToggles({children}: ToggleProps): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {open: openEditing} = useIsEditingUIContextActions();
    const {open: openDeleting} = useIsDeletingUIContextActions();

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
                <DropdownMenuItem onClick={() => closeOnAction(openEditing)}>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => closeOnAction(openDeleting)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}