import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import useSeatDeleteMutation from "@/pages/seats/hooks/mutations/useSeatDeleteMutation.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Ellipsis} from "lucide-react";
import {Link} from "react-router-dom";

interface Props {
    seat: Seat;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onDelete?: () => void,
}

const SeatOptions: FC<Props> = ({seat, variant = "default", className = "", onDelete}) => {
    const {_id} = seat;
    const {mutate, isPending, isSuccess} = useSeatDeleteMutation({onDelete});

    const deleteSeat = () => {
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
                    to={`/admin/seats/edit/${_id}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={deleteSeat}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    Delete
                </Button>
            </PopoverContent>

        </Popover>
    );
};

export default SeatOptions;
