/**
 * @fileoverview Dropdown menu providing edit and delete actions for the screen details view.
 */

import {Dispatch, ReactElement, SetStateAction, useState} from "react";
import {IconButton} from "@/views/common/_comp";
import {Ellipsis} from "lucide-react";
import {useIsDeletingUIContextActions, useIsEditingUIContextActions} from "@/common/_ctx/ui";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/views/common/_comp/ui";

/**
 * Renders an action menu for screen management that updates UI state via ScreenDetailsUIContext.
 */
export function TheatreScreenDetailsToggles(): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {open: openEditing} = useIsEditingUIContextActions();
    const {open: openDeleting} = useIsDeletingUIContextActions();

    const closeOnClick = (action: Dispatch<SetStateAction<boolean>>) => {
        setIsOpen(false);
        action(true);
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <IconButton icon={Ellipsis}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => closeOnClick(openEditing)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => closeOnClick(openDeleting)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}