/**
 * @fileoverview Dropdown navigation component for user account management links.
 */

import {ReactElement} from "react";
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/views/common/_comp/ui";
import {DropdownMenuLink} from "@/views/common/_feat/navigation/DropdownMenuLink.tsx";

/**
 * Renders a dropdown menu containing links to the user's profile, reservations, reviews, and favourites.
 */
export function MyProfileNavigationDropdown(): ReactElement {
    const links: Record<string, string> = {
        "My Profile": "/account/profile",
        "My Reservations": "/account/reservations",
        "My Reviews": "/account/reviews",
        "My Favourites": "/account/favourites",
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Links</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {Object.entries(links).map(([label, to]) => (
                    <DropdownMenuLink key={to} to={to}>
                        {label}
                    </DropdownMenuLink>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
