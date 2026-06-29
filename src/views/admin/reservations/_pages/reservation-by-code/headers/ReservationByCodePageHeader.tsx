/**
 * @fileoverview Header component for the administrative reservation lookup page.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";
import {ReservationUniqueCode} from "@/domains/reservations/_schema/model";
import {ReactElement} from "react";

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