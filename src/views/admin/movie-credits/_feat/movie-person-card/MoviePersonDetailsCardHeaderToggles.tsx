/** @fileoverview Popover menu providing edit and delete actions for a movie credit card. */

import {Dispatch, ReactElement, ReactNode, SetStateAction} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button} from "@/common/components/ui/button.tsx";

/** Props for the MoviePersonDetailsCardHeaderToggles component. */
type OptionsProps = {
    children: ReactNode;
    setEdit: Dispatch<SetStateAction<boolean>>;
    setDelete: Dispatch<SetStateAction<boolean>>;
};

/** Renders a popover containing action buttons to toggle edit or delete states. */
export function MoviePersonDetailsCardHeaderToggles(
    {children, setEdit, setDelete}: OptionsProps
): ReactElement {
    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col p-0 dark:bg-dark">
                <Button variant="link" onClick={() => setEdit(true)}>Edit</Button>
                <Button variant="link" onClick={() => setDelete(true)}>Delete</Button>
            </PopoverContent>
        </Popover>
    );
}