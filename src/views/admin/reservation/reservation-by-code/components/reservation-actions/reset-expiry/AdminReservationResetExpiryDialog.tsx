/**
 * @file Confirmation dialog for resetting reservation expiration (TTL).
 * @filename AdminReservationResetExpiryDialog.tsx
 */

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/common/components/ui/dialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {UseMutationResult} from "@tanstack/react-query";
import {AdminReservation, ReservationUniqueCode} from "@/domains/reservation/schema/model";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {ReactNode} from "react";
import {DateTime} from "luxon";

/**
 * Properties for the {@link AdminReservationResetExpiryDialog} component.
 */
type DialogProps = {
    /** The trigger element (usually the Action button) that opens the dialog. */
    children: ReactNode;

    /** Controlled state for dialog visibility. */
    isOpen: boolean;

    /** Callback function to toggle the dialog visibility. */
    setIsOpen: (open: boolean) => void;

    /** The TanStack Query mutation result managing the reset request. */
    mutation: UseMutationResult<AdminReservation, unknown, void>;

    /** The current expiration timestamp for display within the confirmation message. */
    expiresAt: DateTime;

    /** The unique human-readable code for the reservation being modified. */
    uniqueCode: ReservationUniqueCode;
};

/**
 * A modal confirmation dialog that warns administrators before resetting a reservation's TTL.
 */
export const AdminReservationResetExpiryDialog = (
    {children, isOpen, setIsOpen, mutation, expiresAt, uniqueCode}: DialogProps
) => {
    const {isPending, mutate} = mutation;

    const expiryDate = expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form onSubmit={(e) => e.preventDefault()}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="primary-text">Reset Expiry</DialogTitle>
                        <DialogDescription className="font-mono font-bold uppercase tracking-widest text-orange-500">
                            {uniqueCode}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <p className="primary-text text-justify text-sm leading-relaxed">
                            This action will reset the countdown for this reservation. Currently,
                            Reservation <span className="font-bold">{uniqueCode}</span> is set
                            to expire at <span className="underline">{expiryDate}</span>.
                        </p>
                    </div>

                    <DialogFooter className="flex-col gap-2 sm:flex-row">
                        <DialogClose asChild>
                            <Button variant="secondary" type="button" disabled={isPending}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            variant="primary"
                            type="button"
                            disabled={isPending}
                            onClick={() => mutate()}
                        >
                            {isPending ? <AnimatedLoader/> : "Reset Expiry"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};