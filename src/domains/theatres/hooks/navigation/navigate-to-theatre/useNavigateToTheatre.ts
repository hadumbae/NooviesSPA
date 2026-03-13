/**
 * @file useNavigateToTheatre.ts
 *
 * Provides a memoized navigation callback for routing to
 * an admin theatre detail page with structured logging.
 *
 * Encapsulates:
 * - Route construction from theatre slug
 * - Optional logging metadata
 * - Consistent logger context assembly
 */

import useLoggedNavigate, {LoggingMessageParams} from "@/common/hooks/logging/useLoggedNavigate.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {NavigateOptions} from "react-router-dom";

/**
 * Parameters for theatre navigation.
 */
type NavigateParams = LoggingMessageParams & {
    /**
     * Theatre slug used to resolve the target route.
     */
    slug: string;

    /**
     * Optional React Router navigation options.
     */
    options?: NavigateOptions;
};

/**
 * Hook returning a navigation handler for theatre detail pages.
 *
 * Emits a structured log entry alongside navigation, allowing
 * consistent traceability across admin interactions.
 *
 * @returns Callback that navigates to a theatre detail route
 *
 * @example
 * ```ts
 * const navigateToTheatre = useNavigateToTheatre();
 *
 * navigateToTheatre({
 *   slug: theatre.slug,
 *   component: "TheatreTableRow",
 * });
 * ```
 */
export default function useNavigateToTheatre(): (params: NavigateParams) => void {
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
