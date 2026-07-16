/**
 * @fileoverview Custom hook that provides a navigation function with integrated logging capabilities.
 */

import {NavigateOptions, To, useLocation, useNavigate} from "react-router-dom";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {filterNullishAttributes} from "@/common/_feat/filter-object-attributes/filterNullishAttributes.ts";
import {LogContext, LoggerFunction} from "@/common/_feat/logger/Logger.types.ts";
import buildString from "@/common/utility/buildString.ts";

/** Parameters for configuring the log message during navigation. */
export type LoggingMessageParams = {
    level?: LoggerFunction;
    component?: string;
    message?: string;
    context?: LogContext;
};

/** Parameters for navigating to a specific path with logging. */
export type ToNavigateParams = LoggingMessageParams & {
    to: To;
    options?: NavigateOptions;
};

/** Parameters for navigating via a delta integer with logging. */
export type DeltaNavigateParams = LoggingMessageParams & {
    to: number;
    options?: never;
};

/** Union type representing all possible navigation parameter configurations. */
export type CombinedNavigateParams =
    | ToNavigateParams
    | DeltaNavigateParams;

/** Returns a navigation function that logs the transition details before executing the redirect. */
export function useLoggedNavigate() {
    const {pathname, search, hash} = useLocation();
    const navigate = useNavigate();

    const from = `${pathname}${search}${hash}`;

    function loggedNavigate(params: ToNavigateParams): void;
    function loggedNavigate(params: DeltaNavigateParams): void;
    function loggedNavigate(params: CombinedNavigateParams): void {
        const {to, options, component, message, context: additionalContext, level = "log"} = params;

        const contextObject = filterNullishAttributes({
            from,
            sourceComponent: component,
            ...additionalContext,
        });

        if (typeof to === "number") {
            Logger[level]({
                type: "NAVIGATION",
                msg: buildString(["Router Navigation (DELTA)", message], " : "),
                context: {
                    delta: to,
                    ...contextObject,
                },
            });

            navigate(to);
        } else {
            const path = typeof to === "string" ? to : to.pathname;
            const {state, replace} = options ?? {};

            Logger[level]({
                type: "NAVIGATION",
                msg: buildString(["Router Navigation", message], " : "),
                context: filterNullishAttributes({
                    to: path,
                    state,
                    replace,
                    ...contextObject,
                }),
            });

            navigate(to, options);
        }
    }

    return loggedNavigate;
}
