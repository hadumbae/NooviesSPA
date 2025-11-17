import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Parameters for {@link useErrorNavigateToMovieIndex}.
 */
type NavigateParams = {
    /** The warning or error message to log before navigation. */
    message: string;

    /** Optional component name for logging context. Defaults to the hook's name. */
    component?: string;
};

/**
 * Custom hook for navigating to the movie index page (`/admin/movies`) while logging a warning.
 *
 * This hook returns a function that:
 * 1. Logs a warning message using `useLoggedNavigate`.
 * 2. Navigates to the `/admin/movies` route.
 *
 * Useful for handling error scenarios where you want to redirect the user to the movie
 * administration index while capturing context in logs.
 *
 * @returns A function that accepts {@link NavigateParams} to log a message and navigate.
 *
 * @example
 * ```ts
 * const navigateToMovieIndex = useErrorNavigateToMovieIndex();
 * navigateToMovieIndex({ message: "Failed to load movie details" });
 * ```
 */
export default function useErrorNavigateToMovieIndex(): (params: NavigateParams) => void {
    const navigate = useLoggedNavigate();

    return (params: NavigateParams) => {
        const {
            message,
            component = useErrorNavigateToMovieIndex.name,
        } = params;

        navigate({
            level: "warn",
            message,
            component,
            to: "/admin/movies"
        });
    };
}
