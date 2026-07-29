/**
 * @file Dashboard and client-access navigation dropdown for the administrative layout.
 * @filename AdminLayoutDashboardNavigationDropdown.tsx
 */

import {ReactElement} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/views/common/_comp/ui/dropdown-menu.tsx";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {DropdownMenuLink} from "@/views/common/_feat/navigation/DropdownMenuLink.tsx";
import {NavigationDropdownButton} from "@/views/common/_comp/buttons/NavigationDropdownButton.tsx";

/**
 * A navigation dropdown providing high-level redirection between Admin and Client contexts.
 */
export function AdminLayoutDashboardNavigationDropdown(): ReactElement {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/dashboard",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NavigationDropdownButton text="Dashboard" isActive={isActive}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink to="/admin/dashboard">
                    Dashboard
                </DropdownMenuLink>

                <DropdownMenuLink to="/">
                    Client Pages
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}