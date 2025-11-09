import { FC, ReactNode } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { DropdownMenuItem } from "@/common/components/ui/dropdown-menu.tsx";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for the {@link DropdownMenuLink} component.
 */
type LinkProps = {
    /** The visible content inside the dropdown item (e.g., text or icon). */
    children: ReactNode;

    /** The target URL path to navigate to when clicked. */
    to: string;

    /**
     * Optional string identifier for the component initiating navigation.
     * Used for logging or contextual tracking in {@link useLoggedNavigate}.
     */
    component?: string;
};

/**
 * **DropdownMenuLink** — a dropdown menu item that behaves as a navigation link.
 *
 * Integrates navigation logging via {@link useLoggedNavigate} and visually indicates
 * the active route using {@link useCurrentURLPath}.
 *
 * - When clicked, it logs the navigation event and redirects to the specified path.
 * - The currently active path is highlighted by removing the neutral text color.
 *
 * ### Example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLink to="/profile">Profile</DropdownMenuLink>
 *     <DropdownMenuLink to="/settings">Settings</DropdownMenuLink>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * @remarks
 * - Uses `useLoggedNavigate` to perform navigation with optional analytics/logging.
 * - Compares `to` with the current URL to determine the active state.
 * - Should be used inside a `DropdownMenu` component from your UI system.
 */
const DropdownMenuLink: FC<LinkProps> = ({ children, to, component }) => {
    /** Navigation handler with logging support. */
    const navigate = useLoggedNavigate();

    /** Current absolute URL path for active link comparison. */
    const url = useCurrentURLPath();

    /** Navigates to the given path and logs the action. */
    const navigateToPath = () => navigate({ to, component, level: "log" });

    /** Determines if this dropdown item corresponds to the current route. */
    const isActive = url === to;

    return (
        <DropdownMenuItem
            className={cn(!isActive && "text-neutral-400 hover:text-black")}
            onClick={navigateToPath}
        >
            {children}
        </DropdownMenuItem>
    );
};

export default DropdownMenuLink;
