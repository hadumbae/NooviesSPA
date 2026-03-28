/**
 * @file Specialized header component for the administrative "Fetch by Code" page.
 * @filename ReservationByCodePageHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";

/**
 * Standardized page header for the reservation lookup interface.
 */
export const ReservationByCodePageHeader = () => {
    return (
        <header className="space-y-1">
            <HeaderTitle>Fetch By Unique Code</HeaderTitle>
            <HeaderSubtitle>Reservations</HeaderSubtitle>
        </header>
    );
};