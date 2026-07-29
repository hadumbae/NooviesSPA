/**
 * @fileoverview Sidebar navigation group for account management in the admin dashboard.
 */

import {ReactElement} from 'react';
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/views/common/_comp/ui";

/** Sidebar group containing navigation links for managing users and customers. */
export function AdminAccountSidebarGroup(): ReactElement {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Accounts</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/users">
                                <TableOfContents/>
                                <span>Users</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/customers">
                                <TableOfContents/>
                                <span>Customers</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}