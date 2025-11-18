import {FC} from 'react';
import LayoutTitle from "@/common/components/layout/LayoutTitle.tsx";
import LayoutBreakpointIndicator from "@/common/components/layout/LayoutBreakpointIndicator.tsx";
import {SidebarTrigger} from "@/common/components/ui/sidebar.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SidebarContext} from "@/common/components/ui/sidebar/SidebarContext.ts";
import BaseLayoutDesktopNavigation from "@/common/layout/base-layout/navigation/BaseLayoutDesktopNavigation.tsx";

/**
 * @fileoverview
 * Renders the header section of the base layout, displaying the app title,
 * layout breakpoint indicator, and navigation controls depending on viewport size.
 *
 * The header dynamically adjusts between desktop and mobile layouts:
 * - On **desktop**, it displays the full {@link BaseLayoutDesktopNavigation}.
 * - On **mobile**, it displays a {@link SidebarTrigger} to toggle the sidebar.
 *
 * @component
 * @example
 * ```tsx
 * <BaseLayoutHeader />
 * ```
 *
 * @remarks
 * - Uses {@link useRequiredContext} to access `isMobile` from {@link SidebarContext}.
 * - The header ensures responsive behavior and consistent structure across layouts.
 *
 * @dependencies
 * - {@link LayoutTitle} — Displays the application’s title.
 * - {@link LayoutBreakpointIndicator} — Visual indicator for the current responsive breakpoint.
 * - {@link SidebarTrigger} — Toggles sidebar visibility on mobile devices.
 * - {@link BaseLayoutDesktopNavigation} — Provides full navigation options for desktop users.
 *
 * @returns {JSX.Element} The rendered base layout header element.
 */
const BaseLayoutHeader: FC = () => {
    const {isMobile} = useRequiredContext({context: SidebarContext});

    return (
        <header className="flex justify-between items-center">
            <LayoutTitle text="Noovies MRS"/>

            <div className="flex justify-center space-x-5">
                <LayoutBreakpointIndicator/>
            </div>

            {!isMobile && <BaseLayoutDesktopNavigation />}

            {isMobile && <SidebarTrigger className="dark:text-white"/>}
        </header>
    );
};

export default BaseLayoutHeader;
