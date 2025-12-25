import {Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {MovieDetailsUIContext} from "@/pages/movies/context/MovieDetailsUIContext.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";

/**
 * Props for {@link MovieDetailsOptions}.
 */
type OptionProps = {
    /** Trigger element for the dropdown menu */
    children: ReactNode;

    /** Whether the movie currently has a poster */
    hasPoster?: boolean;

    /** Movie slug used for navigation */
    slug: string;
};

/**
 * Dropdown menu providing admin actions for a movie.
 *
 * Includes navigation to credits, poster management,
 * and movie-level actions (edit/delete).
 *
 * @param props Component props
 */
const MovieDetailsOptions: FC<OptionProps> = (props) => {
    const {children, slug, hasPoster = false} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useLoggedNavigate();

    const {
        setIsUpdatingPoster,
        setIsDeleting,
        setIsDeletingPoster,
    } = useRequiredContext({context: MovieDetailsUIContext});

    /**
     * Triggers a UI action and closes the dropdown.
     *
     * @param action State setter to invoke
     */
    const closeOnAction = (action: Dispatch<SetStateAction<boolean>>) => {
        action(true);
        setIsOpen(false);
    };

    /**
     * Navigate to movie credits by department.
     *
     * @param department Credit department
     */
    const navigateToCredits = (department: RoleTypeDepartment) => {
        navigate({
            to: `/admin/movies/get/${slug}/people/${department.toLowerCase()}`,
            component: MovieDetailsOptions.name,
            message: `Navigate to movie's "${department}" credits.`,
        });
    };

    /**
     * Navigate to the movie edit page.
     */
    const navigateToEdit = () => {
        navigate({
            to: `/admin/movies/edit/${slug}`,
            component: MovieDetailsOptions.name,
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
                    <DropdownMenuLabel className="select-none">
                        Credits
                    </DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => navigateToCredits("CAST")}>
                        Cast
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => navigateToCredits("CREW")}>
                        Crew
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">
                        Poster
                    </DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => closeOnAction(setIsUpdatingPoster)}>
                        Update
                    </DropdownMenuItem>

                    {hasPoster && (
                        <DropdownMenuItem onClick={() => closeOnAction(setIsDeletingPoster)}>
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">
                        Movie
                    </DropdownMenuLabel>

                    <DropdownMenuItem onClick={navigateToEdit}>
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => closeOnAction(setIsDeleting)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MovieDetailsOptions;
