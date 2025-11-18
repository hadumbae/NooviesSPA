import { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu.tsx";
import { cn } from "@/common/lib/utils.ts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/common/components/ui/button.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import BaseLayoutDesktopClientNavigation
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";
import {HoverLinkCSS} from "@/common/constants/country/ButtonCSS.ts";

/**
 * `BaseLayoutClientMovieNavigationDropdown` renders a dropdown menu
 * for movie-related navigation in the client layout.
 *
 * The component:
 * - Highlights itself as active when the current URL matches one of the configured movie paths.
 * - Provides a trigger button labeled "Movies" with a down chevron icon.
 * - Shows a dropdown menu containing a link to browse movies.
 *
 * ⚡ Features:
 * - Uses `useCurrentURLPath` hook to determine the current path for active styling.
 * - Uses `DropdownMenu`, `DropdownMenuTrigger`, and `DropdownMenuContent` for accessible dropdown behavior.
 * - Styles the button using `Button` component and conditional `cn` utility for active/inactive state.
 *
 * @component
 * @example
 * ```tsx
 * <BaseLayoutClientMovieNavigationDropdown />
 * ```
 */
const BaseLayoutClientMovieNavigationDropdown: FC = () => {
    // ⚡ Paths for which this menu is active ⚡
    const pathNames = [
        "/browse/movies",
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
                    Movies <ChevronDown />
                </Button>
            </DropdownMenuTrigger>

            {/* Dropdown content */}
            <DropdownMenuContent>
                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/movies"
                >
                    Browse
                </DropdownMenuLink>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default BaseLayoutClientMovieNavigationDropdown;
