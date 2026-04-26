/**
 * @fileoverview Inline warning component for seat deletion with an integrated mutation trigger.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {AlertTriangle, Loader, LucideIcon, Trash} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {useSeatDeleteMutation} from "@/domains/seats/_feat/crud-hooks";

/** Props for the SeatDeleteWarning component. */
type WarningProps = OnDeleteMutationParams & {
    icon?: LucideIcon;
    seatID: ObjectId;
    seatName?: string;
    className?: string;
};

/**
 * Renders an inline warning message and a delete button that triggers the seat deletion mutation.
 */
const SeatDeleteWarning = (props: WarningProps) => {
    const {
        icon: Icon = AlertTriangle,
        seatName = "This Seat",
        seatID,
        className,
        ...mutationParams
    } = props;

    const title = `Delete ${seatName}?`;
    const description =
        "This action will remove all related data such as seat maps and reservations. This action is irreversible.";

    const {mutate, isPending} = useSeatDeleteMutation(mutationParams);
    const deleteIcon = isPending ? <Loader className="animate-spin" /> : <Trash />;
    const deleteSeat = () => mutate({_id: seatID});

    return (
        <div className={cn("flex flex-col items-center space-y-3", className)}>
            <Icon className="text-red-500" />

            <h2 className={cn(PrimaryHeaderText, "uppercase font-bold select-none")}>
                {title}
            </h2>

            <p className={cn(SecondaryTextBaseCSS, "text-xs text-justify select-none")}>
                {description}
            </p>

            <IconButton onClick={deleteSeat} disabled={isPending}>
                {deleteIcon}
            </IconButton>
        </div>
    );
};

export default SeatDeleteWarning;