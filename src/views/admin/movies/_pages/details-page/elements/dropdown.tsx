/**
 * @fileoverview Dropdown menu for movie administration actions.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/views/common/_comp/ui";
import {useRequiredContext} from "@/common/_feat/use-context/useRequiredContext.ts";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {RoleTypeDepartment} from "@/domains/roletypes";
import {MovieDetailsUISettersContext} from "@/domains/movies";

/** Props for the MovieDetailsDropdown component. */
type OptionProps = {
    children: ReactNode;
    hasPoster?: boolean;
    slug: string;
};

/**
 * Dropdown menu providing admin actions for a movie.
 */
export function MovieDetailsDropdown(
    {children, slug, hasPoster = false}: OptionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useLoggedNavigate();

    const {
        setIsUpdatingPoster,
        setIsDeleting,
        setIsDeletingPoster,
    } = useRequiredContext({context: MovieDetailsUISettersContext});

    const closeOnAction = (action: Dispatch<SetStateAction<boolean>>) => {
        action(true);
        setIsOpen(false);
    };

    const navigateToCredits = (department: RoleTypeDepartment) => {
        navigate({
            to: `/admin/movies/get/${slug}/people/${department.toLowerCase()}`,
            component: MovieDetailsDropdown.name,
            message: `Navigate to movie's "${department}" credits.`,
        });
    };

    const navigateToEdit = () => {
        navigate({
            to: `/admin/movies/edit/${slug}`,
            component: MovieDetailsDropdown.name,
            message: `Navigate to movie's editing page.`,
        });
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">Credits</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigateToCredits("CAST")}>Cast</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateToCredits("CREW")}>Crew</DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">Poster</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => closeOnAction(setIsUpdatingPoster)}>Update</DropdownMenuItem>
                    {hasPoster && (
                        <DropdownMenuItem onClick={() => closeOnAction(setIsDeletingPoster)}>Remove</DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">Movie</DropdownMenuLabel>
                    <DropdownMenuItem onClick={navigateToEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => closeOnAction(setIsDeleting)}>Delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
