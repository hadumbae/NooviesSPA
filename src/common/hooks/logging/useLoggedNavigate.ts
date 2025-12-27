import {NavigateOptions, To, useLocation, useNavigate} from "react-router-dom";
import Logger from "@/common/utility/features/logger/Logger.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {LogContext, LoggerFunction} from "@/common/utility/features/logger/Logger.types.ts";
import buildString from "@/common/utility/buildString.ts";

/**
 * Optional logging metadata for navigation events.
 */
export type LoggingMessageParams = {
    /**
     * Logger method to invoke.
     *
     * @default "log"
     */
    level?: LoggerFunction;

    /**
     * Name of the originating component.
     */
    component?: string;

    /**
     * Additional descriptive log message.
     */
    message?: string;

    /**
     * Extra contextual metadata for the log entry.
     */
    context?: LogContext;
};

/**
 * Parameters for path-based navigation.
 */
export type ToNavigateParams = LoggingMessageParams & {
    /**
     * Target path or location descriptor.
     */
    to: To;

    /**
     * React Router navigation options.
     */
    options?: NavigateOptions;
};

/**
 * Parameters for history delta navigation.
 */
export type DeltaNavigateParams = LoggingMessageParams & {
    /**
     * Number of steps to move in history.
     */
    to: number;

    /**
     * Delta navigation does not support navigation options.
     */
    options?: never;
};

/**
 * Union type for all supported navigation modes.
 */
export type CombinedNavigateParams =
    | ToNavigateParams
    | DeltaNavigateParams;

/**
 * Wraps React Router's {@link useNavigate} with structured navigation logging.
 *
 * Supports:
 * - Path-based navigation
 * - History delta navigation
 * - Contextual, structured logging via {@link Logger}
 *
 * @returns A navigation function with logging support.
 *
 * @example
 * ```ts
 * const navigate = useLoggedNavigate();
 *
 * navigate({
 *   to: "/profile",
 *   component: "Dashboard",
 *   message: "User clicked profile",
 * });
 *
 * navigate({
 *   to: -1,
 *   component: "Profile",
 * });
 * ```
 */
export default function useLoggedNavigate() {
    const {pathname, search, hash} = useLocation();
    const navigate = useNavigate();

    const from = `${pathname}${search}${hash}`;

    /**
     * Executes navigation while emitting a structured log entry.
     *
     * @param params - Destination and optional logging metadata.
     */
    function loggedNavigate(params: ToNavigateParams): void;
    function loggedNavigate(params: DeltaNavigateParams): void;
    function loggedNavigate(params: CombinedNavigateParams): void {
        const {to, options, component, message, context: additionalContext, level = "log"} = params;

        // --- BUILD CONTEXT ---
        const contextObject = filterNullishAttributes({
            from,
            sourceComponent: component,
            ...additionalContext,
        });

        if (typeof to === "number") {
            // --- DELTA NAVIGATION ---
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
            // --- PATH NAVIGATION ---

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
