/**
 * @fileoverview Navigation hook for redirecting to the showings administration index.
 */

import {NavigateOptions} from "react-router-dom";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";

/** Hook that returns a function to navigate to the showings management page. */
export function useNavigateToShowingIndex() {
    const navigate = useLoggedNavigate();

    return (options?: NavigateOptions) => {
        console.log("Navigating to Showings Index");

        navigate({
            to: "/admin/showings",
            options,
        });
    };
}