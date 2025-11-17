import {Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {MovieDetailsUIContext} from "@/pages/movies/context/MovieDetailsUIContext.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type OptionProps = {
    children: ReactNode;
    movieID: ObjectId;
    hasPoster?: boolean;
}

const MovieDetailsOptions: FC<OptionProps> = (props) => {
    const {children, movieID, hasPoster = false} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useLoggedNavigate();

    const {
        setIsUpdatingPoster,
        setIsDeleting,
        setIsDeletingPoster,
    } = useRequiredContext({context: MovieDetailsUIContext});

    const closeOnAction = (action: Dispatch<SetStateAction<boolean>>) => {
        action(true);
        setIsOpen(false);
    }

    const navigateToCredits = (department: RoleTypeDepartment) => {
        navigate({
            to: `/admin/movies/get/${movieID}/people/${department.toLowerCase()}`,
            component: MovieDetailsOptions.name,
            message: `Navigate to movie's "${department}" credits.`,
        });
    }

    const navigateToEdit = () => {
        navigate({
            to: `/admin/movies/edit/${movieID}`,
            component: MovieDetailsOptions.name,
            message: `Navigate to movie's editing page.`,
        });
    }

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

                    {
                        hasPoster &&
                        <DropdownMenuItem onClick={() => closeOnAction(setIsDeletingPoster)}>Delete</DropdownMenuItem>
                    }
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none">Movie</DropdownMenuLabel>

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
