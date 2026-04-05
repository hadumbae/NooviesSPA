/**
 * @file Modal component providing an expanded administrative view of a customer reservation.
 * @filename CustomerReservationDialog.tsx
 */

import {Reservation} from "@/domains/reservation/schema/model";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/common/components/ui/dialog.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/components/reservation-status/ReservationStatusBadge.tsx";
import {ReactNode} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";

/**
 * Properties for the CustomerReservationDialog component.
 * ---
 */
type DialogProps = {
    /** Optional trigger element (e.g., a button or card). */
    children?: ReactNode;
    /** The unique identifier of the customer who the reservation belong to. */
    code: UserUniqueCode;
    /** Controlled state for visibility. */
    isOpen: boolean;
    /** Callback to update visibility state. */
    setIsOpen: (open: boolean) => void;
    /** The reservation document to display. */
    reservation: Reservation;
};

/**
 * Detailed overlay for auditing specific reservation metrics and metadata.
 * ---
 */
export const CustomerReservationDialog = (
    {children, code, reservation, isOpen, setIsOpen}: DialogProps
) => {
    const {
        uniqueCode,
        dateReserved,
        status,
        ticketCount,
        pricePaid,
        currency,
        snapshot: {
            startTime,
            isSpecialEvent,
            theatre: {name: theatreName, timezone},
            screen: {name: screenName},
        }
    } = reservation;

    const showtime = startTime.setZone(timezone).toFormat("HH:mm • dd MMM, yyyy")
    const reservationDate = dateReserved.toUTC().toFormat("HH:mm dd-MM-yyyy")
    const reservationType = convertToTitleCase(reservation.reservationType.replace("_", " "));

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="flex flex-col">
                <DialogHeader>
                    <DialogTitle className="primary-text">{uniqueCode}</DialogTitle>
                    <DialogDescription>Reserved on {reservationDate} (UTC)</DialogDescription>
                </DialogHeader>

                <div className="flex items-start">
                    <div className="space-y-3 pr-4">
                        <LabeledGroup orientation="vertical" label="Type">
                            <span>{reservationType}</span>
                        </LabeledGroup>

                        {
                            isSpecialEvent &&
                            <LabeledGroup orientation="vertical" label="Is Special Event?">
                                <span>Special Event</span>
                            </LabeledGroup>
                        }

                        <LabeledGroup orientation="vertical" label="Type">
                            <LoggedLink to={`/admin/customers/${code}/profile`}>
                                <span className="hover:underline hover:underline-offset-8">
                                    {code}
                                </span>
                            </LoggedLink>
                        </LabeledGroup>

                        <LabeledGroup orientation="vertical" label="Status">
                            <ReservationStatusBadge status={status}/>
                        </LabeledGroup>


                    </div>

                    <div className="flex-1 border-l-2 pl-4 space-y-3">
                        <LabeledGroup label="Showtime" orientation="vertical">
                            <span>{showtime}</span>
                        </LabeledGroup>

                        <div className={cn(
                            "flex gap-4",
                            "max-md:flex-col",
                            "md:items-start"
                        )}>
                            <LabeledGroup label="Screen" orientation="vertical">
                                <span>{screenName}</span>
                            </LabeledGroup>

                            <LabeledGroup label="Theatre" orientation="vertical">
                                <span>{theatreName}</span>
                            </LabeledGroup>
                        </div>

                        <div className="flex items-start gap-4">
                            <LabeledGroup label="Tickets" orientation="vertical">
                                <span>{ticketCount} tickets</span>
                            </LabeledGroup>

                            <LabeledGroup label="Total Price" orientation="vertical">
                                <span>{pricePaid} {currency}</span>
                            </LabeledGroup>
                        </div>

                        <div className="pt-2">
                            <LoggedLink to={`/admin/reservations/fetch/by-unique-code?code=${uniqueCode}`}>
                                <Button variant="outline" size="sm">
                                    Go To Reservation Details
                                </Button>
                            </LoggedLink>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};