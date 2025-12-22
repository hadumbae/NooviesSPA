import {Dispatch, FC, PropsWithChildren, SetStateAction, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {TheatreDetailsUIContext} from "@/pages/theatres/context/theatre-details-ui/TheatreDetailsUIContext.ts";

/**
 * **TheatreDetailsOptions**
 *
 * A dropdown menu for theatre detail actions, such as editing or deleting.
 *
 * This component:
 * - Uses {@link TheatreDetailsUIContext} to access `setIsEditing` and `setIsDeleting` actions.
 * - Opens a menu with "Edit" and "Delete" options.
 * - Automatically closes the dropdown when an action is triggered.
 *
 * @param children - Optional trigger element for the dropdown (button, icon, etc.). Defaults to `"Open"`.
 *
 * @example
 * ```tsx
 * <TheatreDetailsOptions>
 *   <Button>Options</Button>
 * </TheatreDetailsOptions>
 * ```
 */
const TheatreDetailsOptions: FC<PropsWithChildren> = ({children}) => {
    // ⚡ State ⚡
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // ⚡ Context ⚡
    const {setIsEditing, setIsDeleting} = useRequiredContext({context: TheatreDetailsUIContext});

    // ⚡ Helper ⚡
    const onClickClose = (func: Dispatch<SetStateAction<boolean>>) => {
        setIsOpen(false);
        func(true);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>{children ?? "Open"}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onClickClose(setIsEditing)}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onClickClose(setIsDeleting)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TheatreDetailsOptions;
