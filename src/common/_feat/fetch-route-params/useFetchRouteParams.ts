/**
 * @fileoverview Custom hook for extracting and validating URL route parameters using Zod schemas.
 */

import {useEffect, useMemo} from "react";
import {useLocation, useParams} from "react-router-dom";
import {z, ZodTypeAny} from "zod";
import {toast} from "react-toastify";
import {buildStandardLog} from "@/common/_feat/logger-builders/buildStandardLog.ts";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";

/** Configuration options for fetching and validating route parameters. */
type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    schema: TSchema;
    onError?: () => void;
    onErrorMessage?: string;
};

/**
 * Validates current route parameters against a Zod schema and triggers error side effects on failure.
 */
export function useFetchRouteParams<TSchema extends ZodTypeAny = ZodTypeAny>(
    {schema, onError, onErrorMessage = "Invalid Route Params."}: FetchParams<TSchema>
): z.infer<TSchema> | null {
    const {pathname, search, hash} = useLocation();
    const urlParams = useParams();

    const parseResults = useMemo(() => schema.safeParse(urlParams), [urlParams, schema]);

    useEffect(() => {
        if (parseResults.success) return;

        const context = buildContext([
            {key: "url", value: `${pathname}${search}${hash}`},
            {key: "routeParams", value: urlParams},
            {key: "errors", value: parseResults.error?.errors},
        ]);

        buildStandardLog({
            level: "error",
            component: useFetchRouteParams.name,
            msg: onErrorMessage,
            context,
        });

        toast.error(onErrorMessage);
        onError?.();
    }, [parseResults, onError, onErrorMessage, pathname, search, hash]);

    return !parseResults.success || !parseResults.data
        ? parseResults.data
        : null;
}
