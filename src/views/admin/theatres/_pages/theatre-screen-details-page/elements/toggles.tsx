/**
 * @fileoverview Dropdown menu providing edit and delete actions for the screen details view.
 */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {IconButton} from "@/views/common/_comp";
import {Ellipsis} from "lucide-react";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {Dispatch, ReactElement, SetStateAction, useState} from "react";
import {ScreenDetailsUISetterContext} from "@/domains/theatre-screens/_ctx/screen-details";

/**
 * Renders an action menu for screen management that updates UI state via ScreenDetailsUIContext.
 */
export function TheatreScreenDetailsToggles(): ReactElement {
    const {setIsEditing, setShowDeleteWarning} = useRequiredContext({context: ScreenDetailsUISetterContext});
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                <DropdownMenuItem onClick={() => closeOnClick(setIsEditing)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => closeOnClick(setShowDeleteWarning)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}