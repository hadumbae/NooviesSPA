/**
 * @fileoverview Hook for navigating to the person details administration page.
 */

import {
    LoggingMessageParams, useLoggedNavigate
} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/** Parameters for the person navigation hook. */
type NavigateParams = LoggingMessageParams & {
    slug: SlugString;
    options?: NavigateOptions;
};

/**
 * Returns a function to navigate to a specific person's detail page with logging.
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