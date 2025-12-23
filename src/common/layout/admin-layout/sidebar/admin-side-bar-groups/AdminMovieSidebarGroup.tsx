/**
 * @file AdminMovieSidebarGroup.tsx
 * @description Sidebar group for movie-related administrative pages. Displays navigation
 * links for managing movies and showings within the admin panel.
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
 * `AdminMovieSidebarGroup` renders a sidebar group dedicated to movie management sections
 * within the admin interface.
 *
 * - Provides quick access to **Movies** and **Showings** management pages.
 * - Designed for use inside the admin dashboard’s sidebar.
 *
 * @component
 * @example
 * ```tsx
 * <AdminMovieSidebarGroup />
 * ```
 */
const AdminMovieSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Movies</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Movies */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/movies">
                                <TableOfContents />
                                <span>Movies</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Showings */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/showings">
                                <TableOfContents />
                                <span>Showings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminMovieSidebarGroup;
