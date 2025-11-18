import { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu.tsx";
import { cn } from "@/common/lib/utils.ts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/common/components/ui/button.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import BaseLayoutDesktopClientNavigation
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";
import { Separator } from "@/common/components/ui/separator.tsx";
import {HoverLinkCSS} from "@/common/constants/country/ButtonCSS.ts";

/**
 * `BaseLayoutClientProfileNavigationDropdown` renders a dropdown menu
 * for profile-related navigation in the client layout.
 *
 * The component:
 * - Highlights itself as active when the current URL matches one of the configured profile paths.
 * - Provides a trigger button labeled "Profile" with a down chevron icon.
 * - Shows a dropdown menu containing links to My Profile, My Favourites, and My Reviews.
 * - Separates the first link from the rest using a `Separator` for better visual organization.
 *
 * ⚡ Features:
 * - Uses `useCurrentURLPath` hook to determine the current path for active styling.
 * - Uses `DropdownMenu`, `DropdownMenuTrigger`, and `DropdownMenuContent` for accessible dropdown behavior.
 * - Styles the button using `Button` component and conditional `cn` utility for active/inactive state.
 *
 * @component
 * @example
 * ```tsx
 * <BaseLayoutClientProfileNavigationDropdown />
 * ```
 */
const BaseLayoutClientProfileNavigationDropdown: FC = () => {
    // ⚡ Paths for which this menu is active ⚡
    const pathNames = [
        "/account/profile",
        "/account/favourites",
        "/account/reviews",
    ];

    // Current URL path
    const url = useCurrentURLPath();
    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>

            {/* Trigger button */}
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className={cn(!isActive && HoverLinkCSS)}
                >
                    Profile <ChevronDown />
                </Button>
            </DropdownMenuTrigger>

            {/* Dropdown content */}
            <DropdownMenuContent>
                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/account/profile"
                >
                    My Profile
                </DropdownMenuLink>

                <Separator />

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
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default BaseLayoutClientProfileNavigationDropdown;
