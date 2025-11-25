/**
 * @file NavLink.tsx
 * @description
 * A styled navigation link component built on top of `ButtonLink` (and therefore `LoggedLink`)
 * that integrates logging, hover styling, and active state detection.
 *
 * Features:
 * - Determines whether the link is active based on the current URL
 *   (`pathname + search + hash`).
 * - Applies active/inactive styles automatically.
 * - Uses `ButtonLink` and `HoverLinkCSS` for consistent button-like appearance.
 * - Extends `LoggedLinkProps` to support logging and navigation tracking.
 *
 * Designed to be used inside a `react-router-dom` `<Router>` context.
 *
 * @example
 * ```tsx
 * <NavLink to="/dashboard">Dashboard</NavLink>
 * <NavLink to="/settings">Settings</NavLink>
 * ```
 */

import { FC } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { useLocation } from "react-router-dom";
import { HoverLinkCSS } from "@/common/constants/css/ButtonCSS.ts";
import { LoggedLinkProps } from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";

/**
 * `NavLink` renders a navigation link with active state detection and consistent styling.
 *
 * - Automatically applies a hoverable button style when inactive.
 * - Applies the base button link style when active.
 * - Supports logging and navigation tracking through `LoggedLinkProps`.
 *
 * @param props - Props extending `LoggedLinkProps` (e.g., `to`, `component`, `message`).
 *
 * @returns A styled, logging-enabled navigation link component.
 *
 * @example
 * ```tsx
 * <NavLink to="/profile" component="Sidebar" message="Navigated to Profile">
 *   Profile
 * </NavLink>
 * ```
 */
const NavLink: FC<LoggedLinkProps> = (props) => {
    // ⚡ Props ⚡

    const { children, className, to, ...rest } = props;

    // ⚡ Get Current Location ⚡

    const { pathname, search, hash } = useLocation();

    // ⚡ Is Active? ⚡

    const isActive = to === `${pathname}${search}${hash}`;

    // ⚡ Render ⚡

    return (
        <ButtonLink
            {...rest}
            to={to}
            variant="link"
            size="sm"
            className={cn(!isActive && HoverLinkCSS, className)}
        >
            {children}
        </ButtonLink>
    );
};

export default NavLink;
