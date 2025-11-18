import { FC } from 'react';
import LoggedLink, { LoggedLinkProps } from "@/common/components/navigation/LoggedLink.tsx";
import { cn } from "@/common/lib/utils.ts";
import { buttonVariants } from "@/common/components/ui/button.tsx";
import { useLocation } from "react-router-dom";
import {HoverLinkCSS} from "@/common/constants/country/ButtonCSS.ts";

/**
 * **NavLink** — a styled navigation link component built on top of {@link LoggedLink}.
 *
 * This component automatically determines whether it is currently active based on
 * the current URL (`pathname + search + hash`) and applies styling accordingly.
 *
 * When inactive, it uses a neutral text color (`text-neutral-400`) and
 * darkens on hover. When active, it inherits the base button link style.
 *
 * ### Example
 * ```tsx
 * <NavLink to="/dashboard">Dashboard</NavLink>
 * <NavLink to="/settings">Settings</NavLink>
 * ```
 *
 * @remarks
 * - Designed to be used within a `react-router-dom` `<Router>` context.
 * - Uses `buttonVariants` for consistent styling with other button-based elements.
 * - Extends {@link LoggedLinkProps} for authentication-aware navigation.
 */
const NavLink: FC<LoggedLinkProps> = (props) => {
    const { children, className, to, ...rest } = props;

    /** Current location object (URL parts). */
    const { pathname, search, hash } = useLocation();

    /**
     * Determines if the link is active by comparing
     * its `to` prop with the current full path.
     */
    const isActive = to === `${pathname}${search}${hash}`;

    return (
        <LoggedLink
            {...rest}
            to={to}
            className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                !isActive && HoverLinkCSS,
                className,
            )}
        >
            {children}
        </LoggedLink>
    );
};

export default NavLink;
