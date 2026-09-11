/**
 * @fileoverview Desktop navigation dropdown for browsing movies, genres, and theatres.
 */

import {ReactElement} from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";
import {ChevronDown} from "lucide-react";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {DropdownMenuLink} from "@/views/common/_feat/navigation/DropdownMenuLink.tsx";

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
                <DropdownMenuLink to="/browse/persons">
                    Browse Persons
                </DropdownMenuLink>
                <DropdownMenuLink to="/browse/movies">
                    Browse Movies
                </DropdownMenuLink>

                <DropdownMenuLink to="/browse/genres">
                    Browse Genres
                </DropdownMenuLink>

                <DropdownMenuLink to="/browse/theatres">
                    Browse Theatres
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
