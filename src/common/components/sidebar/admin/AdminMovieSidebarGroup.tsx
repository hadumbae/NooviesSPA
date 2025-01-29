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

const AdminMovieSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Movies</SidebarGroupLabel>
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

                    {/* Movies */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/movies">
                                <TableOfContents />
                                <span>Movies</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Showing */}

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/showings">
                                <TableOfContents />
                                <span>Showings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminMovieSidebarGroup;
