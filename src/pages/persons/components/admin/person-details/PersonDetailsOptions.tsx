import {Dispatch, FC, PropsWithChildren, SetStateAction, useState} from 'react';
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/pages/persons/context/PersonDetailsUIContext.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";

/**
 * Dropdown menu providing action options for a person details view.
 *
 * @remarks
 * This component integrates with {@link PersonDetailsUIContext} to trigger
 * UI state changes such as:
 * - Entering edit mode
 * - Starting a profile image update
 * - Initiating a person deletion
 *
 * The dropdown closes automatically after an option is selected.
 *
 * @example
 * ```tsx
 * <PersonDetailsOptions>
 *   <Button>Options</Button>
 * </PersonDetailsOptions>
 * ```
 */
const PersonDetailsOptions: FC<PropsWithChildren> = (params) => {
    const {children} = params;
    const [open, setOpen] = useState<boolean>(false);

    const {
        setIsEditing,
        setIsUpdatingProfileImage,
        setIsDeletingPerson,
    } = useRequiredContext({context: PersonDetailsUIContext});

    /**
     * Helper to close the dropdown and invoke the given state setter with `true`.
     *
     * @param func - A React state setter from the context to update a UI flag.
     */
    const onClickClose = (func: Dispatch<SetStateAction<boolean>>) => {
        setOpen(false);
        func(true);
    };

    /** Triggers edit mode and closes the dropdown. */
    const editPerson = () => onClickClose(setIsEditing);

    /** Starts the profile image update process and closes the dropdown. */
    const updateProfileImage = () => onClickClose(setIsUpdatingProfileImage);

    /** Initiates the delete person process and closes the dropdown. */
    const deletePerson = () => onClickClose(setIsDeletingPerson);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>{children ?? "Open"}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={editPerson}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={updateProfileImage}>Upload Avatar</DropdownMenuItem>
                <DropdownMenuItem onClick={deletePerson}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default PersonDetailsOptions;
