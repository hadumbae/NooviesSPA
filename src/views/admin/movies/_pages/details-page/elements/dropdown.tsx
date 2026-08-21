/**
 * @fileoverview Dropdown menu for movie administration actions.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/views/common/_comp/ui";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {RoleTypeDepartment} from "@/domains/roletypes";
import {useIsDeletingMoviePosterUIActions, useIsUpdatingMoviePosterUIActions} from "@/domains/movies";

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

    const {open: openIsDeleting} = useIsDeletingMoviePosterUIActions();
    const {open: openIsUpdatingPoster} = useIsUpdatingMoviePosterUIActions();
    const {open: openIsDeletingPoster} = useIsDeletingMoviePosterUIActions();

    const closeOnAction = (action: () => void) => {
        action();
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
                    <DropdownMenuItem onClick={() => closeOnAction(openIsUpdatingPoster)}>Update</DropdownMenuItem>
                    {hasPoster && (
                        <DropdownMenuItem onClick={() => closeOnAction(openIsDeletingPoster)}>
                            Remove
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">Movie</DropdownMenuLabel>
                    <DropdownMenuItem onClick={navigateToEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => closeOnAction(openIsDeleting)}>Delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
