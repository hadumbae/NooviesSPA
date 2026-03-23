/**
 * @file Main application layout component providing the global sidebar and content structure.
 * @filename BaseLayout.tsx
 */

import {FC} from 'react';
import {SidebarProvider} from "@/common/components/ui/sidebar.tsx";
import BaseSidebar from "@/common/layout/base-layout/sidebar/BaseSidebar.tsx";
import BaseLayoutContent from "@/common/layout/base-layout/layout/BaseLayoutContent.tsx";
import BaseLayoutHeader from "@/common/layout/base-layout/layout/BaseLayoutHeader.tsx";
import BaseLayoutFooter from "@/common/layout/base-layout/layout/BaseLayoutFooter.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * The client-side layout wrapper for the application.
 */
const BaseLayout: FC = () => {
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
};

export default BaseLayout;