/**
 * @file Movie-related operational dropdown for managing showings and ticketing.
 * @filename AdminLayoutShowingNavigationDropdown.tsx
 */

import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {NavigationDropdownButton} from "@/views/common/_comp/buttons/NavigationDropdownButton.tsx";

/**
 * A navigational dropdown focusing on active movie operations and logistics.
 */
const AdminLayoutShowingNavigationDropdown: FC = () => {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/showings",
        "/admin/reservations/fetch/by-unique-code",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/** Trigger with built-in Chevron and active state logic. */}
                <NavigationDropdownButton
                    text="Showings"
                    isActive={isActive}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/** Theater Scheduling Links */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Showings</DropdownMenuLabel>

                    <DropdownMenuLink to="/admin/showings">
                        Showings
                    </DropdownMenuLink>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                {/** Ticketing & Verification Links */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Reservations</DropdownMenuLabel>

                    <DropdownMenuLink to="/admin/reservations/fetch/by-unique-code">
                        Reservation By Code
                    </DropdownMenuLink>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminLayoutShowingNavigationDropdown;