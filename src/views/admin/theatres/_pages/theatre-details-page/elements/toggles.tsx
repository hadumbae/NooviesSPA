/**
 * @fileoverview Dropdown menu component for theatre management actions like editing and deleting.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/common/components/ui";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {TheatreDetailsUISetterContext} from "@/domains/theatres";

/** Props for the TheatreDetailsToggles component. */
export type ToggleProps = {
    children: ReactNode;
}

/**
 * Renders a dropdown menu that triggers edit or delete modes via TheatreDetailsUIContext.
 */
export function TheatreDetailsToggles(
    {children}: ToggleProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {setIsEditing, setIsDeleting} = useRequiredContext({context: TheatreDetailsUISetterContext});

    const onClickClose = (func: Dispatch<SetStateAction<boolean>>) => {
        setIsOpen(false);
        func(true);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>{children ?? "Open"}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onClickClose(setIsEditing)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onClickClose(setIsDeleting)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}