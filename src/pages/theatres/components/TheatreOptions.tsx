import {FC} from 'react';
import useTheatreDeleteMutation from "@/pages/theatres/hooks/features/delete-theatre/useTheatreDeleteMutation.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Ellipsis, Loader} from "lucide-react";
import {Link} from "react-router-dom";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

interface Props {
    theatre: TheatreDetails;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onDelete?: () => void,
}

const TheatreOptions: FC<Props> = ({theatre, variant = "default", className = "", onDelete}) => {
    const {_id} = theatre;
    const {mutate, isPending, isSuccess} = useTheatreDeleteMutation({onDelete});

    const deleteTheatre = () => mutate({_id});

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
                    to={`/admin/theatres/edit/${_id}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={deleteTheatre}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    {
                        isPending || isSuccess
                            ? <Loader className="animate-spin" />
                            : "Delete"
                    }
                </Button>
            </PopoverContent>

        </Popover>
    );
};

export default TheatreOptions;
