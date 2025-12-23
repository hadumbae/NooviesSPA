import {FC, useEffect} from 'react';
import {SidebarProvider} from "@/common/components/ui/sidebar.tsx";
import BaseSidebar from "@/common/layout/base-layout/sidebar/BaseSidebar.tsx";
import BaseLayoutContent from "@/common/layout/base-layout/layout/BaseLayoutContent.tsx";
import BaseLayoutHeader from "@/common/layout/base-layout/layout/BaseLayoutHeader.tsx";
import BaseLayoutFooter from "@/common/layout/base-layout/layout/BaseLayoutFooter.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import getIsDarkTheme from "@/common/context/theme/utility/getIsDarkTheme.ts";
import {cn} from "@/common/lib/utils.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ThemeContext} from "@/common/context/theme/ThemeContext.ts";

const BaseLayout: FC = () => {
    // --- ACCESS CONTEXT ---
    const {themeVariant} = useRequiredContext({context: ThemeContext});

    // --- TOGGLE DARK MODE ---
    useEffect(() => {
        const isDark = getIsDarkTheme();
        document.body.classList.toggle("dark", isDark);
    }, [themeVariant]);

    // --- IS MOBILE? ---
    const isMobile = useIsMobile();

    // --- Render ---
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
