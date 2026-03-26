/**
 * @file Sidebar navigation group for administrative reservation management.
 * @filename AdminReservationSidebarGroup.tsx
 */

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";

/**
 * A navigational component for the main admin sidebar.
 */
export const AdminReservationSidebarGroup = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Reservations</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/reservations/fetch/by-unique-code">
                                <TableOfContents />
                                <span>Reservation By Code</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};