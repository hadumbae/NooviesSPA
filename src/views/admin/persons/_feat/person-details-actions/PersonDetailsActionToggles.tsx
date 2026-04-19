/**
 * @fileoverview Action menu for managing state toggles in the Person detail view.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from 'react';
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/domains/persons/context/PersonDetailsUIContext.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";

/**
 * Props for the PersonDetailsActionToggles component.
 */
type ToggleProps = {
    children?: ReactNode;
}

/**
 * Provides a dropdown menu to trigger administrative actions for a person.
 */
export function PersonDetailsActionToggles(
    {children}: ToggleProps
): ReactElement {
    const [open, setOpen] = useState<boolean>(false);

    const {
        setIsEditing,
        setIsUpdatingProfileImage,
        setIsDeletingPerson,
    } = useRequiredContext({context: PersonDetailsUIContext});

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
                <DropdownMenuItem onClick={deletePerson} className="text-red-500 focus:text-red-500">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}