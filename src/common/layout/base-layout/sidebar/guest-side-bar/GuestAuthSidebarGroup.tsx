/**
 * @file GuestAuthSidebarGroup.tsx
 * @description Sidebar group for guest authentication links. Displays navigation
 * options for unauthenticated users such as registration and login.
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
import { User } from "lucide-react";

/**
 * `GuestAuthSidebarGroup` renders the sidebar section dedicated to authentication
 * actions for guest users.
 *
 * - Provides links to **Register** and **Login** pages.
 * - Intended for display when the user is not logged in.
 * - Uses shared `Sidebar` UI components for consistent layout and style.
 *
 * @component
 * @example
 * ```tsx
 * <GuestAuthSidebarGroup />
 * ```
 */
const GuestAuthSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Authentication</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Register */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/auth/register">
                                <User />
                                <span>Register</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Login */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/auth/login">
                                <User />
                                <span>Login</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default GuestAuthSidebarGroup;
