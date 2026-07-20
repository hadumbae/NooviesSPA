/**
 * @fileoverview A wrapper around React Router Link that logs navigation events before redirecting.
 *
 */

import {forwardRef, MouseEventHandler} from 'react';
import {Link, LinkProps, NavigateOptions, useLocation} from "react-router-dom";
import {LogContext, LoggerFunction} from "@/common/_feat/logger/Logger.types.ts";
import {filterNullishAttributes} from "@/common/_feat/filter-object-attributes/filterNullishAttributes.ts";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {ParamError} from "@/common/_err/ParamError.ts";
import {useAuthContext} from "@/domains/auth";

/** Props for the LoggedLink component. */
export type LoggedLinkProps = LinkProps & {
    level?: LoggerFunction;
    component?: string;
    message?: string;
    options?: NavigateOptions;
    context?: LogContext;
    className?: string;
};

/**
 * Navigation link component that intercepts clicks to perform logged navigation.
 */
export const LoggedLink = forwardRef<HTMLAnchorElement, LoggedLinkProps>((props, ref) => {
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
    const {pathname, search, hash} = useLocation();
    const {user} = useAuthContext();

    const options = filterNullishAttributes(navigateOptions);
    const from = `${pathname}${search}${hash}`;

    const baseContext: LogContext = {...context, to, from, user: user?._id};

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
            context: baseContext,
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
