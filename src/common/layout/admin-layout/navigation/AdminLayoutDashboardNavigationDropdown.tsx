/**
 * @file Dashboard and client-access navigation dropdown for the administrative layout.
 * @filename AdminLayoutDashboardNavigationDropdown.tsx
 */

import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {NavigationDropdownButton} from "@/views/common/_comp/buttons/NavigationDropdownButton.tsx";

/**
 * A navigation dropdown providing high-level redirection between Admin and Client contexts.
 */
const AdminLayoutDashboardNavigationDropdown: FC = () => {
    /** 1. Detect current location for visual menu tracking. */
    const url = useCurrentURLPath();

    /** 2. Paths identifying this dropdown as the active navigation context. */
    const pathNames = [
        "/admin/dashboard",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/** Trigger with built-in Chevron and active state logic. */}
                <NavigationDropdownButton text="Dashboard" isActive={isActive} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/** Administrative primary landing page. */}
                <DropdownMenuLink to="/admin/dashboard">
                    Dashboard
                </DropdownMenuLink>

                {/** Public-facing application entry point. */}
                <DropdownMenuLink to="/">
                    Client Pages
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminLayoutDashboardNavigationDropdown;