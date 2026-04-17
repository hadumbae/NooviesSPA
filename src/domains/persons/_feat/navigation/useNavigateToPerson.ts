/**
 * @fileoverview Specialized navigation hook for routing to the Person Details view.
 * Integrates with the logging system to provide audit trails for administrative
 * navigation actions.
 */

import useLoggedNavigate, {
    LoggingMessageParams
} from "@/common/hooks/logging/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

type NavigateParams = LoggingMessageParams & {
    slug: SlugString;
    options?: NavigateOptions;
};

/**
 * Hook that returns a function to navigate to a specific person's administrative page.
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