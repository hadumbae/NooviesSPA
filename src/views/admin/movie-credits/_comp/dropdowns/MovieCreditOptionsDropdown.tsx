/**
 * @fileoverview Dropdown menu providing management actions for a movie credit entry.
 */

import {ReactElement} from 'react';
import {EllipsisIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/common/components/ui";

/** Props for the MovieCreditOptionsDropdown component. */
type OptionsProps = {
    onEdit: () => void;
    onDelete: () => void;
}

/**
 * Renders an ellipsis dropdown menu with edit and delete actions for movie credits.
 */
export function MovieCreditOptionsDropdown(
    {onEdit, onDelete}: OptionsProps
): ReactElement {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="text-neutral-400 hover:text-black">
                <EllipsisIcon/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
