import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { z, ZodTypeAny } from "zod";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    /**
     * Zod schema used to validate the incoming URL route parameters.
     * The hook will parse and validate the extracted parameters using this schema.
     */
    schema: TSchema;

    /**
     * Optional callback function executed when validation fails.
     * This is typically used for navigation or recovery behaviors.
     */
    onError?: () => void;

    /**
     * Custom error message used both for log entries and toast notifications
     * when validation fails.
     *
     * @default "Invalid Route Params."
     */
    onErrorMessage?: string;
};

/**
 * React hook for retrieving and validating route parameters using a Zod schema.
 *
 * ## Purpose
 * Ensures that React Router parameters are:
 * - Extracted safely using {@link useParams}
 * - Validated against a known Zod schema
 * - Logged with structured detail when invalid
 * - Reported to the user via toast notification
 * - Passed through to components only if valid
 *
 * This greatly improves reliability in routes that depend on strict parameter formats
 * (e.g., object IDs, UUIDs, or compound route params).
 *
 * ## How It Works
 * 1. `useParams()` retrieves the raw route parameters.
 * 2. The provided Zod schema validates the params.
 * 3. On validation **failure**:
 *    - A detailed log is created using {@link buildStandardLog}.
 *    - The log includes URL info, raw params, and Zod validation errors.
 *    - An error toast is shown using `react-toastify`.
 *    - The optional `onError()` callback is invoked.
 *    - The hook returns `null`.
 * 4. On **success**, the hook returns the fully typed Zod-validated data.
 *
 * ## Parameters
 * @template TSchema extends ZodTypeAny
 * @param params.schema - Zod schema for validating route params.
 * @param params.onError - Optional function called when validation fails.
 * @param params.onErrorMessage - Optional custom message for logs and toast notifications.
 *
 * ## Returns
 * - The parsed and validated route parameters (`z.infer<TSchema>`)
 * - `null` if validation fails
 *
 * ## Logging Behavior
 * When validation fails, the generated log includes:
 * - `url`: Full path including pathname, search string, and hash
 * - `routeParams`: Raw params obtained from `useParams()`
 * - `errors`: Detailed Zod validation errors
 *
 * This ensures route issues are highly debuggable.
 *
 * ## Example
 * ```ts
 * const RouteSchema = z.object({
 *   movieID: z.string().uuid(),
 * });
 *
 * const params = useFetchRouteParams({ schema: RouteSchema });
 *
 * if (params) {
 *   console.log("Movie ID:", params.movieID);
 * }
 * ```
 *
 * ## Remarks
 * - All side effects (logs, toasts, navigation triggers) occur inside a `useEffect`
 *   to avoid repeated calls during rendering and to ensure correct lifecycle behavior.
 * - This hook is often used alongside navigation helpers such as
 *   `useErrorNavigateToMovieIndex()` for graceful fallback handling.
 */
export default function useFetchRouteParams<
    TSchema extends ZodTypeAny = ZodTypeAny
>(params: FetchParams<TSchema>): z.infer<TSchema> | null {
    const { schema, onError, onErrorMessage = "Invalid Route Params." } = params;

    const { pathname, search, hash } = useLocation();
    const urlParams = useParams<z.infer<TSchema>>();

    const { data, success, error } = schema.safeParse(urlParams);

    useEffect(() => {
        if (!success) {
            const context = buildContext([
                { key: "url", value: `${pathname}${search}${hash}` },
                { key: "routeParams", value: urlParams },
                { key: "errors", value: error.errors },
            ]);

            buildStandardLog({
                level: "error",
                component: useFetchRouteParams.name,
                msg: onErrorMessage,
                context,
            });

            toast.error(onErrorMessage);
            onError?.();
        }
    }, [success, data]);

    if (!success || !data) {
        return null;
    }

    return data;
}
