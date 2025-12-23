import {FC} from 'react';
import LayoutTitle from "@/common/components/layout/LayoutTitle.tsx";
import LayoutBreakpointIndicator from "@/common/components/layout/LayoutBreakpointIndicator.tsx";
import {SidebarTrigger} from "@/common/components/ui/sidebar.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SidebarContext} from "@/common/components/ui/sidebar/SidebarContext.ts";
import AdminLayoutDesktopNavigation
    from "@/common/layout/admin-layout/navigation/AdminLayoutDesktopNavigation.tsx";

/**
 * Admin layout header.
 *
 * @remarks
 * Rendering:
 * - Desktop → {@link AdminLayoutDesktopNavigation}
 * - Mobile → {@link SidebarTrigger}
 *
 * Uses {@link SidebarContext} to determine viewport state.
 */
const AdminLayoutHeader: FC = () => {
    const {isMobile} = useRequiredContext({context: SidebarContext});

    return (
        <header className="flex justify-between items-center">
            <LayoutTitle text="Noovies Admin"/>

            <div className="flex justify-center space-x-5">
                <LayoutBreakpointIndicator/>
            </div>

            {!isMobile && <AdminLayoutDesktopNavigation />}

            {isMobile && <SidebarTrigger className="dark:text-white"/>}
        </header>
    );
};

export default AdminLayoutHeader;
