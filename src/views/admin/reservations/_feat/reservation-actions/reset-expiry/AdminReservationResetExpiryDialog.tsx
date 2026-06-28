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
} from "@/common/components/ui";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {ReservationUniqueCode} from "@/domains/reservation";

/** Props for the AdminReservationResetExpiryDialog component. */
type DialogProps = {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    submit: () => void;
    isSubmitting?: boolean;
    expiresAt: DateTime;
    uniqueCode: ReservationUniqueCode;
};

/**
 * Modal confirmation dialog that warns administrators before resetting a reservation's expiration time.
 */
export function AdminReservationResetExpiryDialog(
    {children, isOpen, setIsOpen, submit, isSubmitting, expiresAt, uniqueCode}: DialogProps
): ReactElement {
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
                            <Button variant="secondary" type="button" disabled={isSubmitting}>Cancel</Button>
                        </DialogClose>

                        <Button variant="primary" type="button" disabled={isSubmitting} onClick={() => submit()}>
                            {isSubmitting ? <AnimatedLoader/> : "Reset Expiry"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}