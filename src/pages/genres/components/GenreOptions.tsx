import {FC} from 'react';
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/ui/popover';
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import useGenreDeleteMutation from "@/pages/genres/hooks/useGenreDeleteMutation.ts";
import {Link} from "react-router-dom";

interface Props {
    genre: Genre;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onGenreDelete: () => void,
}

const GenreOptions: FC<Props> = ({genre, variant = "default", className = "", onGenreDelete}) => {
    const {_id} = genre;
    const {mutate, isPending, isSuccess} = useGenreDeleteMutation({onGenreDelete});

    const deleteGenre = () => {
        mutate({_id});
    }

    return (
        <Popover>

            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    className={cn(className)}
                >
                    <Ellipsis />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <Link
                    className={buttonVariants({variant: "link"})}
                    to={`/admin/genres/edit/${_id}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={deleteGenre}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    Delete
                </Button>
            </PopoverContent>

        </Popover>
    );
};

export default GenreOptions;
