/**
 * @fileoverview Header component for the user's personal reservations page.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {ReactElement} from "react";

/** Renders the page header for the reservations index. */
export function MyReservationsPageHeader(): ReactElement {
    return (
        <header>
            <HeaderTitle>My Reservations</HeaderTitle>
            <HeaderDescription>An Index Of Your Reservations</HeaderDescription>
        </header>
    );
}