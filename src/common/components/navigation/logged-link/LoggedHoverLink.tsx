/**
 * @file LoggedHoverLink.tsx
 * @description
 * A wrapper around `LoggedLink` that applies hoverable icon-text button styling.
 *
 * Combines:
 * - `LoggedLink` for logging and navigation tracking
 * - `IconTextButtonCSS` for consistent hover and button styling
 *
 * Use this component when you want a clickable link that looks like
 * a hoverable button with optional logging behavior.
 *
 * @example
 * ```tsx
 * <LoggedHoverLink
 *   to="/dashboard"
 *   component="Sidebar"
 *   message="Navigated to Dashboard"
 * />
 * ```
 */

import { forwardRef } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { IconTextButtonCSS } from "@/common/constants/css/ButtonCSS.ts";
import LoggedLink, { LoggedLinkProps } from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * `LoggedHoverLink` renders a `LoggedLink` with pre-applied hoverable
 * icon-text button styles.
 *
 * Extends all `LoggedLinkProps`, including `to`, logging `level`,
 * `component`, `message`, `options`, and `className`.
 *
 * @example
 * ```tsx
 * <LoggedHoverLink
 *   to="/profile"
 *   component="Header"
 *   message="Navigated to Profile"
 *   className="text-blue-500"
 * />
 * ```
 */
const LoggedHoverLink = forwardRef<HTMLAnchorElement, LoggedLinkProps>((props, ref) => {
    const { className, ...linkProps } = props;

    return (
        <LoggedLink
            ref={ref}
            {...linkProps}
            className={cn(IconTextButtonCSS, className)}
        />
    );
});

export default LoggedHoverLink;
