import {FC, MouseEventHandler} from 'react';
import {Link, LinkProps, NavigateOptions} from "react-router-dom";
import {LoggerFunction} from "@/common/utility/features/logger/Logger.types.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";
import {ParamError} from "@/common/errors/ParamError.ts";

/**
 * Props for the `LoggedLink` component.
 *
 * Extends the standard `LinkProps` from React Router with
 * additional properties for logging and navigation tracking.
 */
export type LoggedLinkProps = LinkProps & {
    /**
     * Logging level to be recorded when navigation occurs.
     * @example "info" | "warn" | "error"
     */
    level?: LoggerFunction;

    /**
     * Name of the component initiating the navigation.
     * Defaults to `LoggedLink.name` if not provided.
     */
    component?: string;

    /**
     * A custom message to log when navigation happens.
     */
    message?: string;

    /**
     * Navigation options passed to React Router's `navigate` function.
     * These are filtered through `filterEmptyAttributes` before use.
     */
    options?: NavigateOptions;
};

/**
 * A wrapper around React Router's `<Link>` component that integrates
 * with `useLoggedNavigate` to provide **logging-aware navigation**.
 *
 * @remarks
 * - Prevents default `<a>` navigation behavior and instead uses
 *   a custom navigation hook with logging support.
 * - Throws a `ParamError` if no valid `to` path is provided.
 * - Supports passing `level`, `component`, and `message` props
 *   for more detailed logging context.
 *
 * @example
 * ```tsx
 * <LoggedLink
 *   to="/dashboard"
 *   level="info"
 *   component="SidebarMenu"
 *   message="Navigated to dashboard from sidebar"
 * >
 *   Dashboard
 * </LoggedLink>
 * ```
 */
const LoggedLink: FC<LoggedLinkProps> = (props) => {
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

    /** Ensures `to` is a valid navigation path. */
    const navigateTo = typeof to === "string" ? to : to.pathname;

    if (!navigateTo) {
        throw new ParamError({
            paramName: "to",
            fnName: component ?? LoggedLink.name,
            message: `Navigation path is required. "to" or "to.pathname" must exist. "${navigateTo}" received instead.`,
        });
    }

    /**
     * Handles click events:
     * - Prevents the default `<a>` tag navigation.
     * - Uses `useLoggedNavigate` to log and perform navigation.
     * - Calls any user-defined `onClick` handler afterward.
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
            {...linkProps}
            to={to}
            onClick={onLinkClick}
        />
    );
};

export default LoggedLink;
