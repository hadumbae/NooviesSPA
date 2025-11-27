import {FC, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Ellipsis, Loader} from "lucide-react";
import {Link} from "react-router-dom";
import useSeatMapOptionsHooks from "@/pages/seatmap/hooks/options/useSeatMapOptionsHooks.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

interface Params {
    seatMap: SeatMap;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;

    onUpdate: (seatMap: SeatMap) => void;
    onDelete: (seatMap: SeatMap) => void;
}

const ShowingSeatMapCardOptions: FC<Params> = ({seatMap, variant = "default", className, onUpdate, onDelete}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {_id: seatMapID, showing} = seatMap;
    const {_id: showingID} = showing as Showing;

    const {
        updateAvailability,
        isUpdatingAvailability,
        deleteSeatMap,
        isDeletingSeatMap,
        deletedSeatMap,
    } = useSeatMapOptionsHooks({seatMap, onUpdate, onDelete});

    const closeOnUpdate = () => {
        setIsOpen(false);
        updateAvailability(seatMapID);
    }

    const closeOnDelete = () => {
        setIsOpen(false);
        deleteSeatMap(seatMapID);
    }

    return (
        <Popover defaultOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>

            <PopoverTrigger asChild>
                <Button variant={variant} className={cn(className)}>
                    <Ellipsis />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                {/*Update Availability*/}
                <Button
                    variant="link"
                    onClick={() => closeOnUpdate()}
                    disabled={isUpdatingAvailability || isDeletingSeatMap}
                >
                    {
                        isUpdatingAvailability
                            ? <Loader className="animate-spin" />
                            : "Toggle Availability"
                    }
                </Button>

                <Link
                    className={buttonVariants({variant: "link"})}
                    to={`/admin/showings/edit/${showingID}/seating/${seatMapID}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link" className="disabled:text-neutral-400"
                    onClick={() => closeOnDelete()}
                    disabled={isDeletingSeatMap || deletedSeatMap}
                >
                    {
                        isDeletingSeatMap
                            ? <Loader className="animate-spin" />
                            : "Delete"
                    }
                </Button>
            </PopoverContent>

        </Popover>
    );
};

export default ShowingSeatMapCardOptions;
