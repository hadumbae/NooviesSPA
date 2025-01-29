import {FC} from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import {Link} from "react-router-dom";
import {User} from "lucide-react";

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
