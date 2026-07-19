/**
 * @fileoverview Modal component providing an expanded administrative view of a customer reservation.
 */

import {ReactElement, ReactNode} from "react";
import {cn, convertToTitleCase} from "@/common/_feat";
import {LoggedLink} from "@/views/common/_feat";
import {LabelContent} from "@/views/common/_comp";
import {UserUniqueCode} from "@/domains/users";
import {Reservation} from "@/domains/reservations";
import {ReservationStatusBadge} from "@/views/client/reservations/_comp";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/views/common/_comp/ui";

/** Props for the CustomerReservationDialog component. */
type DialogProps = {
    children?: ReactNode;
    code: UserUniqueCode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    reservation: Reservation;
};

/**
 * Detailed overlay for auditing specific reservation metrics and metadata.
 */
export function CustomerReservationDialog(
    {children, code, reservation, isOpen, setIsOpen}: DialogProps
): ReactElement {
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
                        <LabelContent label="Type">
                            <span>{reservationType}</span>
                        </LabelContent>

                        {
                            isSpecialEvent &&
                            <LabelContent label="Is Special Event?">
                                <span>Special Event</span>
                            </LabelContent>
                        }

                        <LabelContent label="Type">
                            <LoggedLink to={`/admin/customers/${code}/profile`}>
                                <span className="hover:underline hover:underline-offset-8">
                                    {code}
                                </span>
                            </LoggedLink>
                        </LabelContent>

                        <LabelContent label="Status">
                            <ReservationStatusBadge status={status}/>
                        </LabelContent>


                    </div>

                    <div className="flex-1 border-l-2 pl-4 space-y-3">
                        <LabelContent label="Showtime">
                            <span>{showtime}</span>
                        </LabelContent>

                        <div className={cn(
                            "flex gap-4",
                            "max-md:flex-col",
                            "md:items-start"
                        )}>
                            <LabelContent label="Screen">
                                <span>{screenName}</span>
                            </LabelContent>

                            <LabelContent label="Theatre">
                                <span>{theatreName}</span>
                            </LabelContent>
                        </div>

                        <div className="flex items-start gap-4">
                            <LabelContent label="Tickets">
                                <span>{ticketCount} tickets</span>
                            </LabelContent>

                            <LabelContent label="Total Price">
                                <span>{pricePaid} {currency}</span>
                            </LabelContent>
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
}
