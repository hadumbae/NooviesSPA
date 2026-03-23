/**
 * @file Main layout wrapper for the administrative dashboard.
 * @filename AdminLayout.tsx
 */

import {SidebarProvider} from "@/common/components/ui/sidebar.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {cn} from "@/common/lib/utils.ts";
import AdminSidebar from "@/common/layout/admin-layout/sidebar/AdminSidebar.tsx";
import AdminLayoutHeader from "@/common/layout/admin-layout/layout/AdminLayoutHeader.tsx";
import AdminLayoutContent from "@/common/layout/admin-layout/layout/AdminLayoutContent.tsx";
import AdminLayoutFooter from "@/common/layout/admin-layout/layout/AdminLayoutFooter.tsx";
import AdminBoundary from "@/common/layout/admin-layout/AdminBoundary.tsx";

/**
 * Orchestrates the administrative UI structure, security boundaries, and responsive navigation.
 */
const AdminLayout = () => {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {isMobile && <AdminSidebar/>}

            <main
                className={cn(
                    "flex flex-col space-y-1 p-3 w-full",
                    "bg-gray-50 dark:bg-dark"
                )}
            >
                <AdminBoundary>
                    <AdminLayoutHeader/>
                    <AdminLayoutContent/>
                    <AdminLayoutFooter/>
                </AdminBoundary>
            </main>
        </SidebarProvider>
    );
};

export default AdminLayout;