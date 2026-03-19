/**
 * @file Header component for the user's personal reservations page.
 * @filename MyReservationsPageHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

/**
 * Renders the semantic `<header>` section for the Reservations index.
 *
 * **Components:**
 * - {@link HeaderTitle}: Displays the primary "My Reservations" heading.
 * - {@link HeaderDescription}: Provides a brief contextual subtitle.
 * @returns {JSX.Element} The rendered page header.
 */
const MyReservationsPageHeader = () => {
    return (
        <header>
            <HeaderTitle>My Reservations</HeaderTitle>
            <HeaderDescription>An Index Of Your Reservations</HeaderDescription>
        </header>
    );
};

export default MyReservationsPageHeader;