/**
 * @file useNavigateToTheatre.ts
 *
 * Provides a memoized navigation handler for routing to
 * a theatre detail page with structured logging context.
 *
 * Encapsulates:
 * - Route construction from theatre slug
 * - Optional log source and message metadata
 * - Consistent logger context generation
 */

import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

/**
 * Parameters used to construct the theatre navigation action.
 */
type NavigateParams = {
    /** Theatre slug used for route resolution */
    slug: string;

    /** Optional source identifier for logging */
    source?: string;

    /** Optional navigation log message */
    message?: string;
};

/**
 * Theatre navigation hook.
 *
 * Returns a callback that navigates to the admin theatre
 * detail page while emitting a structured log entry.
 *
 * @param params.slug - Target theatre slug
 * @param params.source - Optional logging source
 * @param params.message - Optional log message
 * @returns Navigation callback
 */
export default function useNavigateToTheatre(
    params: NavigateParams
): () => void {
    const {slug, source, message} = params;

    const navigate = useLoggedNavigate();

    const context = buildContext([
        {key: "source", value: source},
        {key: "slug", value: slug},
    ]);

    return () =>
        navigate({
            to: `/admin/theatre/get/${slug}`,
            message,
            context,
        });
}
