import {FC, useEffect, useState} from 'react';
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
    const [isDark, setIsDark] = useState<boolean>(() => getIsDarkTheme());
    const {themeVariant} = useRequiredContext({context: ThemeContext});

    useEffect(() => {
        const newDark = getIsDarkTheme();
        setIsDark(newDark);
    }, [themeVariant]);

    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {isMobile && <BaseSidebar />}

            <main className={cn(
                isDark && "dark",
                "flex flex-col space-y-1 p-3 w-full",
                "bg-gray-50 dark:bg-gray-800"
            )}>
                {themeVariant}
                <BaseLayoutHeader />
                <BaseLayoutContent />
                <BaseLayoutFooter />
            </main>
        </SidebarProvider>
    );
};

export default BaseLayout;
