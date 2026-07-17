import {ReactElement} from 'react';
import LayoutTitle from "@/common/components/layout/LayoutTitle.tsx";
import LayoutBreakpointIndicator from "@/common/components/layout/LayoutBreakpointIndicator.tsx";
import {SidebarTrigger} from "@/common/components/ui/sidebar/sidebar.tsx";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {SidebarContext} from "@/common/components/ui/sidebar/SidebarContext.ts";
import BaseLayoutDesktopNavigation from "@/views/common/_layout/client/navigation/BaseLayoutDesktopNavigation.tsx";

/**
 * @fileoverview Header component for the base layout that handles responsive navigation.
 */

/**
 * Renders the application header with title and navigation.
 * Requires SidebarContext to determine mobile or desktop layout.
 */
export function BaseLayoutHeader(): ReactElement {
    const {isMobile} = useRequiredContext({context: SidebarContext});

    return (
        <header className="flex justify-between items-center">
            <LayoutTitle text="Noovies"/>

            <div className="flex justify-center space-x-5">
                <LayoutBreakpointIndicator/>
            </div>

            {!isMobile && <BaseLayoutDesktopNavigation/>}

            {isMobile && <SidebarTrigger className="dark:text-white"/>}
        </header>
    );
}