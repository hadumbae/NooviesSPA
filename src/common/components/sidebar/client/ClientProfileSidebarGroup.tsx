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
