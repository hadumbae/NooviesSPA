import {FC} from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import {Link, useNavigate} from "react-router-dom";
import {User} from "lucide-react";
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";

const GuestAuthSidebarGroup: FC = () => {
    const navigate = useNavigate();

    const onLogout = () => navigate("/");
    const {mutate} = useAuthLogoutSubmitMutation({onLogout});

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

export default GuestAuthSidebarGroup;
