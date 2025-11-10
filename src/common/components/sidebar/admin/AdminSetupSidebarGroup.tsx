/**
 * @file AdminSetupSidebarGroup.tsx
 * @description Sidebar group for setup and configuration sections in the admin panel.
 * Displays links for managing genres, persons, role types, and theatres.
 */

import { FC } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import { Link } from "react-router-dom";
import { TableOfContents } from "lucide-react";

/**
 * `AdminSetupSidebarGroup` provides navigation links for setup and configuration sections
 * in the admin dashboard.
 *
 * - Links include **Genres**, **Persons**, **Role Types**, and **Theatres**.
 * - Intended to be used as part of the admin sidebar navigation.
 *
 * @component
 * @example
 * ```tsx
 * <AdminSetupSidebarGroup />
 * ```
 */
const AdminSetupSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Setup</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Genres */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/genres">
                                <TableOfContents />
                                <span>Genres</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Persons */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/persons">
                                <TableOfContents />
                                <span>Persons</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Role Types */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/roletypes/list">
                                <TableOfContents />
                                <span>Role Types</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Theatres */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/theatres">
                                <TableOfContents />
                                <span>Theatres</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminSetupSidebarGroup;
