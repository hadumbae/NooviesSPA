/**
 * @fileoverview Confirmation dialog for the administrative refund process.
 *
 * Requires wrapping in a Form provider and UpdateReservationNotesFormContext.
 */
import {ReactElement, ReactNode} from "react";
import {HookFormTextArea} from "@/views/common/_feat";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {ReservationUniqueCode} from "@/domains/reservations";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui";

/** Props for the AdminReservationRefundDialog component. */
type DialogProps = {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    uniqueCode: ReservationUniqueCode;
};

/** Modal interface that captures refund reasons and confirms the financial action. */
export function AdminReservationRefundDialog(
    {children, uniqueCode, isOpen, setIsOpen}: DialogProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="primary-text">
                        Refund Reservation
                    </DialogTitle>
                    <DialogDescription className="secondary-text">
                        Are you sure you want to refund Reservation <span className="font-bold">{uniqueCode}</span>?
                    </DialogDescription>
                </DialogHeader>

                <HookFormTextArea
                    label="Refund Reason / Admin Notes"
                    name="notes"
                    placeholder="Enter reason for refund..."
                />

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit">
                        {isPending ? <AnimatedLoader/> : "Confirm Refund"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}