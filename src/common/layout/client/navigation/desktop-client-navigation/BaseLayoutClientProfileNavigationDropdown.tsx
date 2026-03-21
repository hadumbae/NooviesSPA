/**
 * @file Desktop navigation dropdown for authenticated user account and activity links.
 * @filename BaseLayoutClientProfileNavigationDropdown.tsx
 */

import {FC} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/common/components/ui/dropdown-menu.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ChevronDown} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import BaseLayoutDesktopClientNavigation
    from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * Renders a "Profile" dropdown menu containing links to account settings and user activity.
 */
const BaseLayoutClientProfileNavigationDropdown: FC = () => {
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
                    className={cn(!isActive && HoverLinkCSS)}
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
};

export default BaseLayoutClientProfileNavigationDropdown;