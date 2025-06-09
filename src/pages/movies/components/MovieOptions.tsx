import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/ui/popover';
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import useMovieDeleteMutation from "@/pages/movies/hooks/mutations/useMovieDeleteMutation.ts";
import {Link} from "react-router-dom";

interface Props {
    movie: Movie;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onDelete?: () => void,
}

const MovieOptions: FC<Props> = ({movie, variant = "default", className = "", onDelete}) => {
    const {_id} = movie;
    const {mutate, isPending, isSuccess} = useMovieDeleteMutation({onDelete});

    const deleteMovie = () => {
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
                    to={`/admin/movies/edit/${_id}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={deleteMovie}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    Delete
                </Button>
            </PopoverContent>

        </Popover>
    );
};

export default MovieOptions;
