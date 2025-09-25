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

const AdminTheatreSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Theatres</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {/* Theatres */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/theatres">
                                <TableOfContents />
                                <span>Theatres</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Screens */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/screens">
                                <TableOfContents />
                                <span>Screens</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminTheatreSidebarGroup;
