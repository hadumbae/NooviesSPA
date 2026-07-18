/**
 * @file Main application layout component providing the global sidebar and content structure.
 * @filename BaseLayout.tsx
 */

import {ReactElement} from 'react';
import {SidebarProvider} from "@/common/components/ui/sidebar/sidebar.tsx";
import BaseSidebar from "@/views/common/_layout/base-layout/sidebar/BaseSidebar.tsx";
import BaseLayoutContent from "@/views/common/_layout/base-layout/layout/BaseLayoutContent.tsx";
import {BaseLayoutHeader} from "@/views/common/_layout/base-layout/layout/BaseLayoutHeader.tsx";
import BaseLayoutFooter from "@/views/common/_layout/base-layout/layout/BaseLayoutFooter.tsx";
import {useIsMobile} from "@/common/_feat/handle-ui/useIsMobile.tsx";
import {cn} from "@/common/_feat";

/**
 * The client-side layout wrapper for the application.
 */
export function BaseLayout(): ReactElement {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {isMobile && <BaseSidebar/>}

            <main className={cn(
                "flex flex-col space-y-1 p-3 w-full",
                "bg-gray-50 dark:bg-dark"
            )}>
                <BaseLayoutHeader/>
                <BaseLayoutContent/>
                <BaseLayoutFooter/>
            </main>
        </SidebarProvider>
    );
}