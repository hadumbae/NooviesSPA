/**
 * @fileoverview Desktop navigation dropdown for browsing movies, genres, and theatres.
 */

import {ReactElement} from 'react';
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
 * A dropdown menu providing navigation links to major catalogue sections like movies, genres, and theatres.
 */
export function BaseLayoutClientBrowseNavigationDropdown(): ReactElement {
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
                    Browse Movies
                </DropdownMenuLink>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/genres"
                >
                    Browse Genres
                </DropdownMenuLink>

                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/theatres"
                >
                    Browse Theatres
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
