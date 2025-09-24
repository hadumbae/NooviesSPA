import {NavigateOptions, To, useLocation, useNavigate} from "react-router-dom";
import Logger from "@/common/utility/logger/Logger.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {LoggerFunction} from "@/common/utility/logger/Logger.types.ts";

/**
 * Optional parameters for logging navigation events.
 *
 */export type LoggingMessageParams = {
    /** The logging level (function name) to use from the `Logger` object. */
    level?: LoggerFunction;
    /** Name of the component from which the navigation originates. */
    component?: string;
    /** Additional descriptive message for the log. */
    message?: string;
};

/** Parameters for navigating to a specific path/location. */
export type ToNavigateParams = LoggingMessageParams & {
    /** The target path or location object to navigate to */
    to: To;
    /** Options to pass to the router navigate function */
    options?: NavigateOptions;
};

/** Parameters for delta (history) navigation. */
export type DeltaNavigateParams = LoggingMessageParams & {
    /** A number indicating how many steps to move in history */
    to: number;
    /** Delta navigation does not support options */
    options?: never;
};

/** Combined type representing either path or delta navigation. */
export type CombinedNavigateParams = ToNavigateParams | DeltaNavigateParams;

/**
 * A custom hook that wraps React Router's `useNavigate` to log navigation events.
 *
 * @remarks
 * This hook logs both path-based navigation and history delta navigation
 * with optional contextual information.
 *
 * Usage:
 * ```ts
 * const navigate = useLoggedNavigate();
 * navigate({ to: "/profile", component: "Dashboard", message: "User clicked profile" });
 * navigate({ to: -1, component: "Profile" }); // delta navigation
 * ```
 *
 * @returns A function for performing logged navigation.
 */
export default function useLoggedNavigate() {
    const {pathname, search, hash} = useLocation();
    const navigate = useNavigate();

    const from = `${pathname}${search}${hash}`;

    /**
     * Navigate to a path or delta while logging the event.
     *
     * @param params - Navigation parameters including destination and optional logging info
     */
    function loggedNavigate(params: ToNavigateParams): void;
    function loggedNavigate(params: DeltaNavigateParams): void;
    function loggedNavigate(params: CombinedNavigateParams): void {
        const {to, options, component, message, level = "log"} = params;

        // Filter out undefined logging attributes for cleaner logs
        const messageObject = filterEmptyAttributes({from, component, message});

        if (typeof to === "number") {
            // Delta (history) navigation
            Logger[level]({msg: "Router Navigation (DELTA):", context: {delta: to, ...messageObject}});
            navigate(to);
        } else {
            // Path-based navigation
            const path = typeof to === "string" ? to : to.pathname;
            const {state, replace} = options ?? {};

            Logger[level]({msg: "Router Navigation:", context: {to: path, state, replace, ...messageObject}});
            navigate(to, options);
        }
    }

    return loggedNavigate;
}
