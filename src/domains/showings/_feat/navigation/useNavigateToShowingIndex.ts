/**
 * @fileoverview Navigation hook for redirecting to the showings administration index.
 */

import {NavigateOptions} from "react-router-dom";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/** Hook that returns a function to navigate to the showings management page. */
export function useNavigateToShowingIndex() {
    const navigate = useLoggedNavigate();

    return (options?: NavigateOptions) => {
        navigate({
            to: "/admin/showings",
            options,
        });
    };
}