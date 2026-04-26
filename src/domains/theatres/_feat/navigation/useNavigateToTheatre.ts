/**
 * @fileoverview Hook providing a structured navigation callback for routing to theatre detail pages with integrated logging.
 */

import useLoggedNavigate, {LoggingMessageParams} from "@/common/hooks/logging/useLoggedNavigate.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {NavigateOptions} from "react-router-dom";

/** Props for the navigate function returned by useNavigateToTheatre. */
type NavigateParams = LoggingMessageParams & {
    slug: string;
    options?: NavigateOptions;
};

/**
 * Returns a function that navigates to a theatre's admin route while emitting a structured log entry.
 */
export function useNavigateToTheatre(): (params: NavigateParams) => void {
    const navigate = useLoggedNavigate();

    return ({slug, message, level, component, options, context: additionalContext}) => {
        const context = filterNullishAttributes({
            slug,
            source: component,
            ...additionalContext,
        });

        navigate({
            to: `/admin/theatres/get/${slug}`,
            message: message ?? "Navigate to theatre details.",
            level,
            context,
            options,
        });
    };
}