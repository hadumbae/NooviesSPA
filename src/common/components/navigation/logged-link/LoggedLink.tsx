/**
 * @file LoggedLink.tsx
 *
 * Wrapper around React Router's {@link Link} that adds structured logging
 * and tracked navigation via {@link useLoggedNavigate}.
 *
 * Responsibilities:
 * - Logs navigation intent before routing
 * - Preserves standard {@link LinkProps} behavior
 * - Enforces presence of a valid `to` destination
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

import {forwardRef, MouseEventHandler} from 'react';
import {Link, LinkProps, NavigateOptions} from "react-router-dom";
import {LogContext, LoggerFunction} from "@/common/utility/features/logger/Logger.types.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {ParamError} from "@/common/errors/ParamError.ts";

/**
 * Props for {@link LoggedLink}.
 *
 * Extends {@link LinkProps} with optional logging metadata
 * and navigation options.
 */
export type LoggedLinkProps = LinkProps & {
    /** Logger function (level) used for the navigation event */
    level?: LoggerFunction;
    /** Source component name for logging context */
    component?: string;
    /** Optional descriptive log message */
    message?: string;
    /** React Router navigation options */
    options?: NavigateOptions;
    /** Optional log context payload */
    context?: LogContext;
    /** Optional CSS class name */
    className?: string;
};

/**
 * Logged version of React Router's {@link Link}.
 *
 * @remarks
 * - Prevents default anchor navigation
 * - Delegates routing and logging to {@link useLoggedNavigate}
 * - Throws {@link ParamError} if `to` is missing or invalid
 */
const LoggedLink = forwardRef<HTMLAnchorElement, LoggedLinkProps>((props, ref) => {
    const {
        to,
        level,
        component,
        message,
        options: navigateOptions = {},
        onClick,
        context,
        ...linkProps
    } = props;

    const navigate = useLoggedNavigate();
    const options = filterNullishAttributes(navigateOptions);

    /** Normalized navigation target */
    const navigateTo = typeof to === "string" ? to : to?.pathname;

    if (!navigateTo) {
        throw new ParamError({
            paramName: "to",
            fnName: component ?? LoggedLink.name,
            message:
                `Navigation target is required. Expected "to" or "to.pathname", received "${navigateTo}".`,
        });
    }

    /**
     * Intercepts link clicks to perform logged navigation.
     */
    const onLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();

        navigate({
            to: navigateTo,
            component: component ?? LoggedLink.name,
            level,
            message,
            context,
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
