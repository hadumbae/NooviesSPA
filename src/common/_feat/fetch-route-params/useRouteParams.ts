/**
 * @fileoverview Provides a hook for retrieving and validating URL parameters using Zod schemas.
 */

import {useMemo} from "react";
import {useParams} from "react-router-dom";
import {z, ZodTypeAny} from "zod";
import {RouteError, RouteErrorConfig} from "@/common/_err/RouteError.ts";

/** Configuration for fetching and validating route parameters. */
type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    schema: TSchema;
    errorConfig?: Partial<RouteErrorConfig>;
};

/** Validates current URL parameters against a schema and throws a RouteError on failure. */
export function useRouteParams<TSchema extends ZodTypeAny = ZodTypeAny>(
    {schema, errorConfig}: FetchParams<TSchema>
): z.infer<TSchema> {
    const urlParams = useParams();
    const {data, success, error} = useMemo(() => schema.safeParse(urlParams), [urlParams, schema]);

    if (!success || !data || error) {
        throw new RouteError({
            headerText: "Invalid Route Error",
            message: "Invalid Params For Route. Please try again.",
            ...errorConfig
        });
    }

    return data;
}
