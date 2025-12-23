/**
 * @file GuestAuthSidebarGroup.tsx
 * @description Renders the sidebar section for guest authentication actions such as
 * logging in and logging out. This component is typically displayed when the user
 * is not authenticated.
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
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * `GuestAuthSidebarGroup` displays a sidebar group containing guest authentication options.
 *
 * - Provides a link to the login page.
 * - Includes a logout button that triggers a logout mutation and redirects to the home page.
 * - Uses `useLoggedNavigate` for navigation tracking.
 * - Uses `useAuthLogoutSubmitMutation` to handle logout actions.
 *
 * @component
 * @example
 * ```tsx
 * <GuestAuthSidebarGroup />
 * ```
 */
const AdminSetupSidebarGroup: FC = () => {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({ to: "/", component: AdminSetupSidebarGroup.name });
    const { mutate } = useAuthLogoutSubmitMutation({ onSubmitSuccess: onLogout });

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Authentication</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Profile */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/auth/login">
                                <User />
                                <span>Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Log Out */}
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => mutate()}>
                            <User />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminSetupSidebarGroup;
