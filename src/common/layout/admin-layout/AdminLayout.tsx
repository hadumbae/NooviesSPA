import {SidebarProvider} from "@/common/components/ui/sidebar.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ThemeContext} from "@/common/context/theme/ThemeContext.ts";
import {useEffect} from "react";
import getIsDarkTheme from "@/common/context/theme/utility/getIsDarkTheme.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {cn} from "@/common/lib/utils.ts";
import AdminSidebar from "@/common/layout/admin-layout/sidebar/AdminSidebar.tsx";
import AdminLayoutHeader from "@/common/layout/admin-layout/layout/AdminLayoutHeader.tsx";
import AdminLayoutContent from "@/common/layout/admin-layout/layout/AdminLayoutContent.tsx";
import AdminLayoutFooter from "@/common/layout/admin-layout/layout/AdminLayoutFooter.tsx";
import AdminBoundary from "@/common/layout/admin-layout/AdminBoundary.tsx";

/**
 * Admin application layout.
 *
 * @remarks
 * - Provides sidebar context and responsive structure
 * - Synchronizes dark mode with theme state
 * - Composes header, content, and footer sections
 */
const AdminLayout = () => {
    const {themeVariant} = useRequiredContext({context: ThemeContext});

    useEffect(() => {
        const isDark = getIsDarkTheme();
        document.body.classList.toggle("dark", isDark);
    }, [themeVariant]);

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
