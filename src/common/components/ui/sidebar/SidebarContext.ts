/**
 * @fileoverview Context and types for managing the sidebar state across desktop and mobile views.
 */

import { createContext } from "react";

/** State and actions for controlling the sidebar. */
export type SidebarContextValues = {
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    isMobile: boolean
    toggleSidebar: () => void
}

/**
 * Context for managing sidebar state.
 * Must be used within a SidebarProvider.
 */
export const SidebarContext = createContext<SidebarContextValues | undefined>(undefined);
