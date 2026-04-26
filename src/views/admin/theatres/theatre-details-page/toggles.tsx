/**
 * @fileoverview Dropdown menu component for theatre management actions like editing and deleting.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {TheatreDetailsUIContext} from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIContext.ts";

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

    const {setIsEditing, setIsDeleting} = useRequiredContext({context: TheatreDetailsUIContext});

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