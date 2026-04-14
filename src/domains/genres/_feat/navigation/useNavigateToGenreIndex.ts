/**
 * @fileoverview Hook for navigating to the Genre index page with logging.
 */

import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/** Configuration for the hook initialization. */
type HookConfig = {
    component?: string;
};

/** Configuration for the navigation execution. */
type NavConfig = {
    /** Custom log message to record during navigation. */
    message?: string;
};

/**
 * Returns a function to navigate to the main genre administration list.
 */
export function useNavigateToGenreIndex({component}: HookConfig = {}) {
    const navigate = useLoggedNavigate();

    return ({message}: NavConfig = {}) => {
        navigate({
            level: "log",
            to: `/admin/genres`,
            message,
            component,
        });
    };
}