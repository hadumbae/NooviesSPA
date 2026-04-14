/**
 * @fileoverview Hook for navigating to the Genre details page with logging.
 */

import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Configuration for the hook initialization. */
type HookConfig = {
    component?: string;
};

/** Configuration for the navigation execution. */
type NavConfig = {
    slug: ObjectId;
    message?: string;
};

/**
 * Returns a function to navigate to a specific genre's detail page.
 */
export function useNavigateToGenreDetails({component}: HookConfig = {}) {
    const navigate = useLoggedNavigate();

    return ({slug, message}: NavConfig) => {
        navigate({
            level: "log",
            to: `/admin/genres/get/${slug}`,
            message,
            component,
        });
    };
}