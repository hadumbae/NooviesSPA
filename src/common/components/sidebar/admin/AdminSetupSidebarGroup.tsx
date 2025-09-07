import {FC} from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";

const AdminSetupSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Setup</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {/* Genres */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/genres">
                                <TableOfContents />
                                <span>Genres</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Persons */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/persons">
                                <TableOfContents />
                                <span>Persons</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* RoleTypes */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/roletypes/list">
                                <TableOfContents />
                                <span>Role Types</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminSetupSidebarGroup;
