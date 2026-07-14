/**
 * @fileoverview Dropdown navigation menu for client profile and account-related links in the desktop layout.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {ChevronDown} from "lucide-react";
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Separator} from "@/common/components/ui";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {
    BaseLayoutDesktopClientNavigation
} from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";

/**
 * A dropdown menu providing navigation links to the user's profile, favorites, reviews, and reservations.
 */
export function BaseLayoutClientProfileNavigationDropdown(): ReactElement {
    const pathNames = [
        "/account/profile",
        "/account/favourites",
        "/account/reviews",
        "/account/reservations",
    ];

    const url = useCurrentURLPath();
    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className={cn(!isActive && "hover-button")}
                >
                    Profile <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/account/profile"
                >
                    My Profile
                </DropdownMenuLink>

                <Separator/>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/account/favourites"
                >
                    My Favourites
                </DropdownMenuLink>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/account/reviews"
                >
                    My Reviews
                </DropdownMenuLink>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/account/reservations"
                >
                    My Reservations
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}