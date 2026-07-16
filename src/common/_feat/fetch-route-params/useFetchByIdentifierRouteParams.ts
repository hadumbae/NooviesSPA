/**
 * @fileoverview Hook for fetching and validating route parameters with automatic error navigation.
 */

import {z, ZodTypeAny} from "zod";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {useFetchRouteParams} from "@/common/_feat/fetch-route-params/useFetchRouteParams.ts";

/** Configuration for fetching route parameters and handling validation errors. */
type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    schema: TSchema;
    errorTo: string;
    errorMessage?: string;
    sourceComponent?: string;
};

/**
 * Retrieves and validates route parameters, navigating to a fallback route on failure.
 */
export function useFetchByIdentifierRouteParams<TSchema extends ZodTypeAny = ZodTypeAny>(
    {schema, errorTo, errorMessage, sourceComponent}: FetchParams<TSchema>,
): z.infer<TSchema> | null {
    const navigate = useLoggedNavigate();
    const onErrorMessage = errorMessage ?? "Failed to fetch route params. Please try again.";

    const onError = () => {
        navigate({
            level: "warn",
            to: errorTo,
            component: sourceComponent ?? useFetchByIdentifierRouteParams.name,
            message: onErrorMessage,
        });
    };

    return useFetchRouteParams({
        schema,
        onError,
        onErrorMessage,
    });
}
