/**
 * @file Desktop navigation dropdown for browsing movies, genres, and theatres.
 * @filename BaseLayoutClientBrowseNavigationDropdown.tsx
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
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * Renders a "Browse" dropdown menu with links to major catalog sections.
 */
const BaseLayoutClientBrowseNavigationDropdown: FC = () => {
    const pathNames = [
        "/browse/movies",
        "/browse/genres",
        "/browse/theatres",
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
                    Browse <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/movies"
                >
                    Movie
                </DropdownMenuLink>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/genres"
                >
                    Genres
                </DropdownMenuLink>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/theatres"
                >
                    Theatres
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BaseLayoutClientBrowseNavigationDropdown;