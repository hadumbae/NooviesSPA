/**
 * @fileoverview Sidebar group component for administrative setup navigation links.
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

/**
 * Sidebar group for administrative setup navigation.
 */
export function AdminSetupSidebarGroup(): ReactElement {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Setup</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/genres">
                                <TableOfContents/>
                                <span>Genres</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Persons */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/persons">
                                <TableOfContents/>
                                <span>Persons</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Role Types */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/roletypes/list">
                                <TableOfContents/>
                                <span>Role Types</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Theatres */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/theatres">
                                <TableOfContents/>
                                <span>Theatres</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
