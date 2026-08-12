/**
 * @fileoverview Dropdown menu for managing state toggles in the Person detail view.
 */

import {ReactElement, ReactNode} from 'react';
import {usePersonDeletingUIActions, usePersonFormUIActions, usePersonImageFormUIActions} from "@/domains/persons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/views/common/_comp/ui";
import {onUISelect} from "@/common/_feat";

/** Props for the PersonDetailsActionToggles component. */
type ToggleProps = {
    children?: ReactNode;
}

/**
 * Dropdown menu to trigger administrative actions for a person.
 */
export function PersonDetailsActionToggles(
    {children}: ToggleProps
): ReactElement {
    const {open: openForm} = usePersonFormUIActions();
    const {open: openImage} = usePersonImageFormUIActions();
    const {open: openDelete} = usePersonDeletingUIActions();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={onUISelect(openForm)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onSelect={onUISelect(openImage)}>Upload Avatar</DropdownMenuItem>
                <DropdownMenuItem onSelect={onUISelect(openDelete)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}