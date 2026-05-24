/**
 * @fileoverview Hook for navigating to the showing details administration page.
 */

import useLoggedNavigate, {LoggingMessageParams} from "@/common/hooks/logging/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Configuration for the showing details navigation hook. */
type NavConfig = LoggingMessageParams & {
    slug: ObjectId;
    options: NavigateOptions,
}

/**
 * Returns a function that navigates to a specific showing's detail page with logging.
 */
export function useNavigateToShowingDetails() {
    const navigate = useLoggedNavigate();

    return ({slug, options, ...config}: NavConfig) => {
        navigate({to: `/admin/showings/get/${slug}`, options, ...config});
    };
}