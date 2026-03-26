/**
 * @file Dropdown navigation component for reservation-specific administrative features.
 * @filename AdminLayoutReservationNavigationDropdown.tsx
 */

import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/common/components/ui/dropdown-menu.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {ChevronDown} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";

/**
 * A context-aware dropdown for reservation management in the admin top-bar or navbar.
 */
export const AdminLayoutReservationNavigationDropdown = () => {
    /** 1. Current routing context for visual feedback. */
    const url = useCurrentURLPath();

    /** 2. List of paths that define this dropdown's active scope. */
    const pathNames = [
        "/admin/reservations/fetch/by-unique-code",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className={cn(!isActive && HoverLinkCSS)}
                >
                    Reservations <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/** Administrative feature links */}
                <DropdownMenuLink
                    to="/admin/reservations/fetch/by-unique-code"
                    component={AdminLayoutReservationNavigationDropdown.name}
                >
                    Reservation By Code
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};