/**
 * @fileoverview Desktop navigation dropdown for browsing movies, genres, and theatres.
 */

import {ReactElement} from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";
import {ChevronDown} from "lucide-react";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {DropdownMenuLink} from "@/views/common/_feat/navigation/DropdownMenuLink.tsx";
import {
    BaseLayoutDesktopClientNavigation
} from "@/views/common/_layout/client/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";

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
