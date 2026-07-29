/**
 * @fileoverview Sidebar group component for administrative authentication actions.
 */

import {ReactElement} from 'react';
import {Link} from "react-router-dom";
import {User} from "lucide-react";
import {useAuthLogoutSubmitMutation} from "@/domains/auth/_feat";
import {useLoggedNavigate} from "@/common/_feat/navigation";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/views/common/_comp/ui";

/**
 * Sidebar group containing authentication-related navigation and actions for the admin layout.
 */
export function AdminAuthSidebarGroup(): ReactElement {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({to: "/", component: AdminAuthSidebarGroup.name});
    const {mutate} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Authentication</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/auth/login">
                                <User/>
                                <span>Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Log Out */}
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => mutate()}>
                            <User/>
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
