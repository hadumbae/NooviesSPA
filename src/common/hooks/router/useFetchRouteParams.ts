import { Params, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ZodTypeAny } from "zod";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";

type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    /**
     * A Zod schema used to validate the URL route parameters.
     * The hook parses the parameters against this schema.
     */
    schema: TSchema;

    /**
     * Optional callback executed when validation fails.
     */
    onError?: () => void;

    /**
     * Custom message shown in the toast and log when validation fails.
     * Defaults to `"Invalid Route Params."`
     */
    onErrorMessage?: string;
};

/**
 * React hook to fetch and validate route parameters using a Zod schema.
 *
 * ## Overview
 * This hook provides type-safe access to route parameters defined by React Router.
 * It validates them with a Zod schema and handles any invalid inputs automatically.
 *
 * ### Behavior
 * - Reads the current route parameters via `useParams()`.
 * - Validates them with the provided Zod schema.
 * - If validation fails:
 *   - Logs a detailed context via `buildStandardLog()`.
 *   - Displays an error toast using `react-toastify`.
 *   - Calls the optional `onError()` callback.
 *   - Returns `null`.
 * - If validation succeeds, returns the validated parameters.
 *
 * @template TParams - The expected shape of the route parameters (from `useParams`).
 * @template TSchema - The Zod schema type used for validation.
 *
 * @param params - Configuration object containing:
 *  - `schema`: The Zod schema used to validate params.
 *  - `onError?`: Optional callback when validation fails.
 *  - `onErrorMessage?`: Optional error message for toast/logs.
 *
 * @returns The validated route parameters (`TParams`), or `null` if validation fails.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const schema = z.object({
 *   theatreID: z.string().uuid(),
 *   screenID: z.string().uuid(),
 * });
 *
 * const params = useFetchRouteParams({ schema });
 * if (params) {
 *   console.log(params.theatreID, params.screenID);
 * }
 * ```
 */
export default function useFetchRouteParams<
    TParams extends Params,
    TSchema extends ZodTypeAny = ZodTypeAny
>(params: FetchParams<TSchema>): TParams | null {
    const { schema, onError, onErrorMessage = "Invalid Route Params." } = params;

    const { pathname, search, hash } = useLocation();
    const urlParams = useParams<TParams>();

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
