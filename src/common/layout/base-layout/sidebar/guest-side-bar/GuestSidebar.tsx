import {FC} from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/common/components/ui/sidebar.tsx";
import GuestAuthSidebarGroup from "@/common/layout/base-layout/sidebar/guest-side-bar/GuestAuthSidebarGroup.tsx";

/**
 * **GuestSidebar**
 *
 * Sidebar component for **unauthenticated (guest) users**.
 *
 * ### Features
 * - Displays the application title/logo (`Noovies`) in the header.
 * - Provides authentication-related actions for guests via:
 *   - `GuestAuthSidebarGroup`
 *
 * ### Notes
 * - Designed to work with the main `Sidebar` layout component.
 * - Intended for guests only; should not be used for authenticated client or admin users.
 *
 * @returns {JSX.Element} A fully structured sidebar for guest users
 */
const GuestSidebar: FC = () => {
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

export default GuestSidebar;
