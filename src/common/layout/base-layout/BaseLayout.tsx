import {FC} from 'react';
import {SidebarProvider} from "@/common/components/ui/sidebar.tsx";
import BaseSidebar from "@/common/layout/base-layout/sidebar/BaseSidebar.tsx";
import BaseLayoutContent from "@/common/layout/base-layout/layout/BaseLayoutContent.tsx";
import BaseLayoutHeader from "@/common/layout/base-layout/layout/BaseLayoutHeader.tsx";
import BaseLayoutFooter from "@/common/layout/base-layout/layout/BaseLayoutFooter.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";

const BaseLayout: FC = () => {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {isMobile && <BaseSidebar />}

            <main className="flex flex-col space-y-1 p-3 w-full h-screen">
                <BaseLayoutHeader />
                <BaseLayoutContent />
                <BaseLayoutFooter />
            </main>
        </SidebarProvider>
    );
};

export default BaseLayout;
