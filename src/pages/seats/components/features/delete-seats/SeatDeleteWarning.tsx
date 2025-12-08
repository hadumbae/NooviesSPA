import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {AlertTriangle, Loader, LucideIcon, Trash} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import useSeatDeleteMutation from "@/pages/seats/hooks/features/admin/delete-seat-data/useSeatDeleteMutation.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";

/**
 * ⚡ WarningProps
 *
 * Props for {@link SeatDeleteWarning}. Extends {@link OnDeleteMutationParams}
 * to supply success/error handlers for delete mutations.
 */
type WarningProps = OnDeleteMutationParams & {
    /** Optional icon to display at the top of the warning (defaults to AlertTriangle). */
    icon?: LucideIcon;
    /** ObjectId of the seat to delete. */
    seatID: ObjectId;
    /** Optional seat name used in the title (defaults to "This Seat"). */
    seatName?: string;
    /** Optional className for layout adjustments. */
    className?: string;
};

/**
 * ⚡ SeatDeleteWarning
 *
 * A compact, inline delete warning component for seats.
 *
 * Unlike {@link SeatDeleteWarningDialog}, this version does **not** open a dialog.
 * Instead, it renders an inline warning block containing:
 * - A warning icon
 * - A title generated from the provided `seatName`
 * - A standard deletion warning message
 * - A delete button that invokes {@link useSeatDeleteMutation}
 *
 * Automatically swaps the delete button icon to a loader when the deletion
 * request is pending.
 *
 * @param props - Component props of type {@link WarningProps}.
 *
 * @example
 * ```tsx
 * <SeatDeleteWarning
 *   seatID={seat._id}
 *   seatName={`Row ${seat.row}${seat.seatNumber}`}
 *   successMessage="Seat removed."
 *   errorMessage="Unable to delete seat."
 * />
 * ```
 */
const SeatDeleteWarning = (props: WarningProps) => {
    // ⚡ Props ⚡
    const {
        icon: Icon = AlertTriangle,
        seatName = "This Seat",
        seatID,
        className,
        ...mutationParams
    } = props;

    // ⚡ Warning Metadata ⚡
    const title = `Delete ${seatName}?`;
    const description =
        "This action will remove all related data such as seat maps and reservations. This action is irreversible.";

    // ⚡ Mutation ⚡
    const {mutate, isPending} = useSeatDeleteMutation(mutationParams);
    const deleteIcon = isPending ? <Loader className="animate-spin" /> : <Trash />;
    const deleteSeat = () => mutate({_id: seatID});

    // ⚡ Render ⚡
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
