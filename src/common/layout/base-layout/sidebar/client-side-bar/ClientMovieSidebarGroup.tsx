/**
 * @file ClientMovieSidebarGroup.tsx
 * @description Sidebar group for client-facing movie navigation. Provides access
 * to the main movie browsing section for regular users.
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
 * `ClientMovieSidebarGroup` renders a sidebar section for movie-related
 * navigation in the client interface.
 *
 * - Contains a single link to the **Movies** browsing page.
 * - Designed for use in the client user’s sidebar layout.
 *
 * @component
 * @example
 * ```tsx
 * <ClientMovieSidebarGroup />
 * ```
 */
const ClientMovieSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Movies</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Movies Page */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/browse/movies">
                                <TableOfContents />
                                <span>Movies</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default ClientMovieSidebarGroup;
