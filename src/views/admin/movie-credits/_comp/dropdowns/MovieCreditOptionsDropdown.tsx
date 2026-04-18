import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {EllipsisIcon} from "lucide-react";

interface OptionsProps {
    onEdit: () => void;
    onDelete: () => void;
}

const MovieCreditOptionsDropdown: FC<OptionsProps> = ({onEdit, onDelete}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="text-neutral-400 hover:text-black">
                <EllipsisIcon />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem onClick={onEdit}>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MovieCreditOptionsDropdown;
