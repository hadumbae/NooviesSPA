import { FC } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { ChevronDown } from "lucide-react";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import { cn } from "@/common/lib/utils.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * @component BaseLayoutMovieNavigation
 * @description
 * A dropdown navigation component for managing movie-related administrative pages,
 * including **Movies** and **Showings**. Displays an interactive menu in the base layout
 * header, with automatic active state highlighting based on the current URL path.
 *
 * @example
 * ```tsx
 * <BaseLayoutMovieNavigation />
 * ```
 *
 * @remarks
 * - Uses `useCurrentURLPath()` to detect the active route.
 * - Applies active link styling when the current path matches `/admin/movies` or `/admin/showings`.
 * - Combines `DropdownMenu`, `DropdownMenuTrigger`, and `DropdownMenuContent` from the UI library.
 * - Styled with Tailwind CSS utilities and `cn()` for conditional classes.
 * - Intended for use inside layout-level navigation bars (e.g., `BaseLayoutDesktopNavigation`).
 *
 * @dependencies
 * - `useCurrentURLPath` — returns the current URL path for active-state detection.
 * - `DropdownMenuLink` — a custom component for dropdown navigation items with logging integration.
 * - `lucide-react` — provides the `ChevronDown` icon.
 *
 * @returns {JSX.Element} A dropdown menu labeled “Movies” with links to Movies and Showings pages.
 */
const BaseLayoutMovieNavigationDropdown: FC = () => {
    // ⚡ URL ⚡

    const url = useCurrentURLPath();

    // ⚡ Check If Active ⚡

    const pathNames = [
        "/admin/movies",
        "/admin/showings",
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
                    Movies <ChevronDown />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink
                    to="/admin/movies"
                    component={BaseLayoutMovieNavigationDropdown.name}
                >
                    Movies
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/showings"
                    component={BaseLayoutMovieNavigationDropdown.name}
                >
                    Showings
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BaseLayoutMovieNavigationDropdown;
