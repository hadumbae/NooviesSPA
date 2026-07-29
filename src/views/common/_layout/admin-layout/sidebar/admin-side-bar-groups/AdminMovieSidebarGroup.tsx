/**
 * @fileoverview Sidebar group component for movie and showing administration navigation.
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

/** Sidebar group containing navigation links for managing movies and showings in the admin dashboard. */
export function AdminMovieSidebarGroup(): ReactElement {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Movies</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/movies">
                                <TableOfContents/>
                                <span>Movies</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Showings */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/showings">
                                <TableOfContents/>
                                <span>Showings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
