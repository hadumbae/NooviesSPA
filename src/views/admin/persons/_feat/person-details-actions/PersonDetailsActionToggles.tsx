/**
 * @fileoverview Dropdown menu for managing state toggles in the Person detail view.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from 'react';
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {PersonDetailsUISettersContext} from "@/domains/persons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/common/components/ui";

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
    const [open, setOpen] = useState<boolean>(false);

    const {
        setIsEditing,
        setIsUpdatingProfileImage,
        setIsDeletingPerson,
    } = useRequiredContext({context: PersonDetailsUISettersContext});

    const onClickClose = (func: Dispatch<SetStateAction<boolean>>) => {
        setOpen(false);
        func(true);
    };

    const editPerson = () => onClickClose(setIsEditing);
    const updateProfileImage = () => onClickClose(setIsUpdatingProfileImage);
    const deletePerson = () => onClickClose(setIsDeletingPerson);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={editPerson}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={updateProfileImage}>Upload Avatar</DropdownMenuItem>
                <DropdownMenuItem onClick={deletePerson}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}