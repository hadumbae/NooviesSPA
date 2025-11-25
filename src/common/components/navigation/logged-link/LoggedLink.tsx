/**
 * @file LoggedLink.tsx
 * @description
 * A wrapper around React Router's `Link` component that adds logging
 * and navigation tracking for user interactions.
 *
 * Features:
 * - Logs navigation events using `useLoggedNavigate`.
 * - Allows specifying log `level`, `component`, and `message`.
 * - Preserves standard `LinkProps` for React Router.
 * - Prevents navigation if `to` is missing and throws a descriptive error.
 *
 * @example
 * ```tsx
 * <LoggedLink
 *   to="/dashboard"
 *   component="Sidebar"
 *   message="User clicked Dashboard link"
 * />
 * ```
 */

import { forwardRef, MouseEventHandler } from 'react';
import { Link, LinkProps, NavigateOptions } from "react-router-dom";
import { LoggerFunction } from "@/common/utility/features/logger/Logger.types.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import { ParamError } from "@/common/errors/ParamError.ts";

/**
 * Props for the `LoggedLink` component.
 *
 * Extends React Router's `LinkProps` with optional logging and navigation tracking.
 *
 * @property level - Logging function or log level for navigation events.
 * @property component - Name of the component triggering the navigation.
 * @property message - Optional message to include in the log.
 * @property options - Additional `NavigateOptions` for React Router navigation.
 * @property className - Optional CSS class for styling the link.
 */
export type LoggedLinkProps = LinkProps & {
    level?: LoggerFunction;
    component?: string;
    message?: string;
    options?: NavigateOptions;
    className?: string;
};

/**
 * `LoggedLink` is a React component that wraps React Router's `Link` component,
 * providing automatic logging and navigation tracking.
 *
 * @example
 * ```tsx
 * <LoggedLink
 *   to="/profile"
 *   component="Header"
 *   message="Navigated to Profile"
 *   className="text-blue-500"
 * />
 * ```
 */
const LoggedLink = forwardRef<HTMLAnchorElement, LoggedLinkProps>((props, ref)  => {
    const {
        to,
        level,
        component,
        message,
        options: navigateOptions = {},
        onClick,
        ...linkProps
    } = props;

    const navigate = useLoggedNavigate();
    const options = filterNullishAttributes(navigateOptions);

    /** Determines the navigation path from `to`. */
    const navigateTo = typeof to === "string" ? to : to.pathname;

    if (!navigateTo) {
        throw new ParamError({
            paramName: "to",
            fnName: component ?? LoggedLink.name,
            message: `Navigation path is required. "to" or "to.pathname" must exist. "${navigateTo}" received instead.`,
        });
    }

    /**
     * Handles link clicks.
     *
     * Steps:
     * 1. Prevents default browser navigation.
     * 2. Calls `useLoggedNavigate` to perform navigation and log the event.
     * 3. Executes any user-provided `onClick` callback.
     */
    const onLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        navigate({
            to: navigateTo,
            component: component ?? LoggedLink.name,
            level,
            message,
            options,
        });
        onClick?.(e);
    };

    return (
        <Link
            ref={ref}
            {...linkProps}
            to={to}
            onClick={onLinkClick}
        />
    );
});

export default LoggedLink;
