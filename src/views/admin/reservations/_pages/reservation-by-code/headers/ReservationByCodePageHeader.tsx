/**
 * @fileoverview Header component for the administrative reservation lookup page.
 */

import {ReactElement} from "react";
import {ReservationUniqueCode} from "@/domains/reservations";
import {HeaderSubtitle, HeaderTitle} from "@/views/common/_comp/page-headers";

/** Props for the ReservationByCodePageHeader component. */
type HeaderProps = {
    code?: ReservationUniqueCode | null;
}

/** Displays the title and subtitle for the reservation code lookup interface. */
export function ReservationByCodePageHeader(
    {code}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-1">
            <HeaderTitle>Fetch By Unique Code {code && ` • ${code}`}</HeaderTitle>
            <HeaderSubtitle>Reservations</HeaderSubtitle>
        </header>
    );
}