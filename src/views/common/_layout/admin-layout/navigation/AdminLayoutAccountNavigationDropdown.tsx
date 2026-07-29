/**
 * @fileoverview Navigation dropdown for account-related management in the admin layout.
 */

import {ReactElement} from 'react';
import {useCurrentURLPath} from "@/common/_feat/navigation";
import {DropdownMenuLink} from "@/views/common/_feat/navigation";
import {NavigationDropdownButton} from "@/views/common/_comp/buttons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/views/common/_comp/ui";

/**
 * Dropdown menu providing links to user and customer management sections.
 */
export function AdminLayoutAccountNavigationDropdown(): ReactElement {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/customers",
        "/admin/users",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NavigationDropdownButton text="Accounts" isActive={isActive}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Users</DropdownMenuLabel>
                    <DropdownMenuLink to="/admin/users">Users</DropdownMenuLink>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Customers</DropdownMenuLabel>
                    <DropdownMenuLink to="/admin/customers">Customers</DropdownMenuLink>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}