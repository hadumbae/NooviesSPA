/**
 * @fileoverview Confirmation dialog for resetting reservation expiration (TTL).
 */

import {ReactElement, ReactNode} from "react";
import {DateTime} from "luxon";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/views/common/_comp/ui";
import {AnimatedLoader} from "@/views/common/_comp/loaders/AnimatedLoader.tsx";
import {ReservationUniqueCode} from "@/domains/reservations";
import {useBaseFormContext} from "@/common/_feat";
import {UIOpenStateProps} from "@/common/_types";

/** Props for the AdminReservationResetExpiryDialog component. */
type DialogProps = UIOpenStateProps & {
    children: ReactNode;
    expiresAt: DateTime;
    uniqueCode: ReservationUniqueCode;
};

/**
 * Modal confirmation dialog that warns administrators before resetting a reservation's expiration time.
 */
export function AdminReservationResetExpiryDialog(
    {children, isOpen, setIsOpen, expiresAt, uniqueCode}: DialogProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();
    const expiryDate = expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                        <Button variant="secondary" type="button" disabled={isPending}>Cancel</Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit" disabled={isPending}>
                        {isPending ? <AnimatedLoader/> : "Reset Expiry"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}