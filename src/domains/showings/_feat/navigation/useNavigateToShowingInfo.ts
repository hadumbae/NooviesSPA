/**
 * @fileoverview Hook for navigating to the showing's client-side view with logging.
 */

import useLoggedNavigate, {LoggingMessageParams} from "@/common/hooks/logging/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Configuration for the showing navigation action. */
type NavConfig = LoggingMessageParams & {
    slug: SlugString;
    options?: NavigateOptions,
}

/** Returns a function to navigate to a specific showing's client-side view. */
export function useNavigateToShowingInfo() {
    const navigate = useLoggedNavigate();

    return ({slug, options, ...config}: NavConfig) => {
        navigate({
            to: `/browse/showings/${slug}`,
            options,
            ...config,
        });
    };
}
