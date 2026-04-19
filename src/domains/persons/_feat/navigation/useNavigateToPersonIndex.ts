/**
 * @fileoverview Hook for standardized navigation to the administrative Person index.
 */

import useLoggedNavigate, {LoggingMessageParams} from "@/common/hooks/logging/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";

/**
 * Navigation configuration combining logging metadata and router options.
 */
type NavigateConfig = LoggingMessageParams & {
    options?: NavigateOptions;
};

/**
 * Custom hook to navigate to the Person index page with automated logging.
 */
export function useNavigateToPersonIndex(): (config: NavigateConfig) => void {
    const navigate = useLoggedNavigate();

    return ({message, ...rest}) => {
        navigate({
            to: `/admin/persons`,
            message: message ?? "Navigate To Person Index.",
            ...rest
        });
    };
}