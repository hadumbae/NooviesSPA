/**
 * @file ClientProfileSidebarGroup.tsx
 * @description Sidebar group for user profile and personal account navigation.
 * Displays links for managing the user’s profile, favourites, and reviews.
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
 * `ClientProfileSidebarGroup` renders a sidebar section for profile-related pages
 * in the client interface.
 *
 * - Provides links to **My Profile**, **My Favourites**, and **My Reviews** pages.
 * - Intended for use within the client dashboard or account sidebar.
 *
 * @component
 * @example
 * ```tsx
 * <ClientProfileSidebarGroup />
 * ```
 */
const ClientProfileSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>My Profile</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Profile Page */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/profile">
                                <TableOfContents />
                                <span>My Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* My Favourites */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/favourites">
                                <TableOfContents />
                                <span>My Favourites</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* My Reviews */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/reviews">
                                <TableOfContents />
                                <span>My Reviews</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default ClientProfileSidebarGroup;
