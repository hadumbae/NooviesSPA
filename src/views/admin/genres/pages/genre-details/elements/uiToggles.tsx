/**
 * @fileoverview Dropdown menu for Genre-specific management actions.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUISetterContext} from "@/domains/genres/_feat/page-context";

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
                <DropdownMenuItem onClick={() => closeOnAction(setIsEditing)}>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => closeOnAction(setIsDeleting)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}