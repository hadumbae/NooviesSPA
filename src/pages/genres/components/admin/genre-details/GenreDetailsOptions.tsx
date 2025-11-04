import { Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { GenreDetailsUIContext } from "@/pages/genres/context/GenreDetailsUIContext.ts";

/**
 * A dropdown menu that provides contextual options for a genre.
 *
 * @remarks
 * Displays **Edit** and **Delete** actions for a genre, integrated with the
 * {@link GenreDetailsUIContext} to toggle editing or deletion state.
 *
 * The component internally manages its open/close state and automatically
 * closes the menu after an action is selected.
 *
 * @example
 * ```tsx
 * <GenreDetailsOptions>
 *   <Button variant="ghost">Options</Button>
 * </GenreDetailsOptions>
 * ```
 */
const GenreDetailsOptions: FC<PropsWithChildren> = ({ children }) => {
    /**
     * ⚡ State ⚡
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { setIsEditing, setIsDeleting } = useRequiredContext({ context: GenreDetailsUIContext });

    /**
     * ⚡ Functions ⚡
     */
    const closeOnAction = (action: Dispatch<SetStateAction<boolean>>) => {
        action(true);
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => closeOnAction(setIsEditing)}>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => closeOnAction(setIsDeleting)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GenreDetailsOptions;
