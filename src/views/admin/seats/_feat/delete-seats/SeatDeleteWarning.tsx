/**
 * @fileoverview Inline warning component for seat deletion with an integrated mutation trigger.
 */

import {ReactElement} from "react";
import {AlertTriangle, Loader, LucideIcon, Trash} from "lucide-react";
import {ObjectId} from "@/common/_schemas";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {IconButton} from "@/views/common/_comp";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {useDeleteSeatSubmitHandler} from "@/domains/seats";

/** Props for the SeatDeleteWarning component. */
type WarningProps = MutationResponseConfig<void, { _id: ObjectId }> & {
    icon?: LucideIcon;
    _id: ObjectId;
    seatName?: string;
    className?: string;
};

/**
 * Renders an inline warning message and a delete button that triggers the seat deletion mutation.
 */
export function SeatDeleteWarning(
    {icon: Icon = AlertTriangle, seatName = "Seat", _id, className, ...submitConfig}: WarningProps
): ReactElement {
    const {deleteSeat, isPending} = useDeleteSeatSubmitHandler({_id, ...submitConfig});

    return (
        <div className={cn("flex flex-col items-center space-y-3", className)}>
            <Icon className="text-red-500"/>

            <h2 className="primary-text uppercase font-bold select-none">
                Delete {seatName}?
            </h2>

            <p className="secondary-text text-xs text-justify select-none">
                This action will remove all related data such as seat maps
                and reservations. This action is irreversible.
            </p>

            <IconButton onClick={deleteSeat} disabled={isPending}>
                {isPending ? <Loader className="animate-spin"/> : <Trash/>}
            </IconButton>
        </div>
    );
}

