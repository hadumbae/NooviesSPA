/**
 * @fileoverview Sidebar group component for reservation-related navigation in the admin layout.
 */

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from "@/views/common/_comp/ui/sidebar/sidebar.tsx";
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";
import {ReactElement} from "react";

/** Sidebar group containing navigation links for managing reservations. */
export function AdminReservationSidebarGroup(): ReactElement {
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
}