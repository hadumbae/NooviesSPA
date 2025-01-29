import {FC} from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/common/components/ui/sidebar"

import GuestAuthSidebarGroup from "@/common/components/sidebar/guest/GuestAuthSidebarGroup.tsx";

const Guest: FC = () => {
    return (
        <Sidebar>

            <SidebarHeader>
                Noovies
            </SidebarHeader>

            <SidebarContent>
                <GuestAuthSidebarGroup />
            </SidebarContent>

        </Sidebar>
    );
};

export default Guest;
