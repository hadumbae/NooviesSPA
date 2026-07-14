/**
 * @fileoverview Desktop navigation dropdown for browsing movies, genres, and theatres.
 */

import {ReactElement} from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/common/components/ui";
import {cn} from "@/common/lib/utils.ts";
import {ChevronDown} from "lucide-react";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {
    BaseLayoutDesktopClientNavigation
} from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";

/**
 * A dropdown menu providing navigation links to major catalogue sections like movies, genres, and theatres.
 */
export function BaseLayoutClientBrowseNavigationDropdown(): ReactElement {
    const pathNames = [
        "/browse/persons",
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
                    className={cn(!isActive && "hover-button")}
                >
                    Browse <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink
                    component={BaseLayoutDesktopClientNavigation.name}
                    to="/browse/persons"
                >
                    Browse Persons
                </DropdownMenuLink>
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
