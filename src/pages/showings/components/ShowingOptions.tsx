import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/ui/popover';
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {Ellipsis, Loader} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import useShowingDeleteMutation from "@/pages/showings/hooks/mutations/useShowingDeleteMutation.ts";
import {Link} from "react-router-dom";

interface Props {
    showing: Showing;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onDelete: () => void,
}

const ShowingOptions: FC<Props> = ({showing, variant = "default", className = "", onDelete}) => {
    const {_id} = showing;
    const {mutate, isPending, isSuccess} = useShowingDeleteMutation({onDelete});

    const deleteShowing = () => {
        mutate({_id});
    }

    return (
        <Popover>

            <PopoverTrigger asChild>
                <Button variant={variant} className={cn(className)} size="sm">
                    <Ellipsis />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <Link
                    className={buttonVariants({variant: "link"})}
                    to={`/admin/showings/edit/${_id}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={deleteShowing}
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

export default ShowingOptions;
