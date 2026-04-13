/**
 * @file Main setup and catalog navigation dropdown for the administrative layout.
 * @filename AdminLayoutSetupNavigationDropdown.tsx
 */

import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {NavigationDropdownButton} from "@/views/common/_comp/buttons/NavigationDropdownButton.tsx";

/**
 * A navigational dropdown providing centralized access to core system entities and catalogs.
 */
const AdminLayoutSetupNavigationDropdown: FC = () => {
    /** 1. Current routing context for visual highlighting. */
    const url = useCurrentURLPath();

    /** 2. Definitive list of paths that mark this dropdown as active. */
    const pathNames = [
        "/admin/genres",
        "/admin/persons",
        "/admin/roletypes",
        "/admin/theatres",
        "/admin/movies",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/** Specialized trigger with built-in Chevron and Active logic. */}
                <NavigationDropdownButton
                    text="Setup"
                    isActive={isActive}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/** System Configuration Links */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Setup</DropdownMenuLabel>

                    <DropdownMenuLink
                        to="/admin/genres"
                        component={AdminLayoutSetupNavigationDropdown.name}
                    >
                        Genres
                    </DropdownMenuLink>

                    <DropdownMenuLink
                        to="/admin/persons"
                        component={AdminLayoutSetupNavigationDropdown.name}
                    >
                        Persons
                    </DropdownMenuLink>

                    <DropdownMenuLink
                        to="/admin/roletypes/list"
                        component={AdminLayoutSetupNavigationDropdown.name}
                    >
                        Role Types
                    </DropdownMenuLink>

                    <DropdownMenuLink
                        to="/admin/theatres"
                        component={AdminLayoutSetupNavigationDropdown.name}
                    >
                        Theatres
                    </DropdownMenuLink>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                {/** Content Management Links */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Movies</DropdownMenuLabel>

                    <DropdownMenuLink
                        to="/admin/movies"
                        component={AdminLayoutSetupNavigationDropdown.name}
                    >
                        Movies
                    </DropdownMenuLink>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminLayoutSetupNavigationDropdown;