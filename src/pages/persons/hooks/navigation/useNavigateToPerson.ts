/**
 * @file useNavigateToPerson.ts
 *
 * Provides a convenience hook for navigating to a person details page
 * with integrated navigation logging.
 */

import useLoggedNavigate, {
    LoggingMessageParams
} from "@/common/hooks/logging/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";

/**
 * Parameters for navigating to a person details page.
 */
type NavigateParams = LoggingMessageParams & {
    /** Target person identifier. */
    slug: string;

    /** Optional React Router navigation options. */
    options?: NavigateOptions;
};

/**
 * Hook that returns a function for navigating to a specific person.
 *
 * Automatically:
 * - Builds the person detail route
 * - Applies a default log message
 * - Forwards navigation options
 *
 * @example
 * ```ts
 * const navigateToPerson = useNavigateToPerson();
 *
 * navigateToPerson({
 *   _id: personId,
 *   message: "Viewing person details"
 * });
 * ```
 */
export function useNavigateToPerson(): (params: NavigateParams) => void {
    const navigate = useLoggedNavigate();

    return ({slug, message, ...rest}) => {
        navigate({
            to: `/admin/persons/get/${slug}`,
            message: message ?? "Navigate To Person Details.",
            ...rest
        });
    };
}
