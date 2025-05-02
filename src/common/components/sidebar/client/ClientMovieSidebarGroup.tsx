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
