import { createContext } from "react";

/**
 * SidebarContext type represents the state and actions
 * available for controlling a sidebar in both desktop and mobile views.
 */
export type SidebarContext = {
    /**
     * The current state of the sidebar on desktop.
     * Can be either "expanded" or "collapsed".
     */
    state: "expanded" | "collapsed"

    /**
     * Whether the sidebar is currently open on desktop.
     */
    open: boolean

    /**
     * Sets the open state of the sidebar on desktop.
     * @param open - `true` to open the sidebar, `false` to close it.
     */
    setOpen: (open: boolean) => void

    /**
     * Whether the sidebar is currently open on mobile.
     */
    openMobile: boolean

    /**
     * Sets the open state of the sidebar on mobile.
     * @param open - `true` to open the sidebar, `false` to close it.
     */
    setOpenMobile: (open: boolean) => void

    /**
     * Whether the current viewport is considered mobile.
     */
    isMobile: boolean

    /**
     * Toggles the sidebar state between expanded/collapsed on desktop
     * or open/closed on mobile.
     */
    toggleSidebar: () => void
}

/**
 * React context for managing sidebar state.
 * Provides state and methods for both desktop and mobile sidebar behavior.
 *
 * Usage:
 * ```ts
 * const sidebar = useContext(SidebarContext);
 * if (!sidebar) throw new Error("SidebarContext must be used within a SidebarProvider");
 * ```
 */
export const SidebarContext = createContext<SidebarContext | undefined>(undefined);
