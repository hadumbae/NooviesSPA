/**
 * @file Type-safe hook for extracting and validating URL parameters in the Customer Review domain.
 * @filename useCustomerReviewRouteParams.ts
 */

import {useLocation, useParams} from "react-router-dom";
import {
    CustomerReviewRouteParams,
    CustomerReviewRouteParamsSchema
} from "@/domains/customers/features/movie-review/schemas/routeParamsSchema.ts";
import {useEffect} from "react";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {RouteError} from "@/common/errors/RouteError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";

/**
 * Hook to retrieve and validate the `uniqueCode` and `reviewCode` from the current route.
 * ---
 * @returns {CustomerReviewRouteParams | null} The validated parameters or null on failure.
 */
export function useCustomerReviewRouteParams(): CustomerReviewRouteParams | null {
    const params = useParams();
    const {pathname, search, hash} = useLocation();

    const {data, success, error} = CustomerReviewRouteParamsSchema.safeParse(params);

    useEffect(() => {
        if (!success) {
            const context = buildContext([
                {key: "source", value: useCustomerReviewRouteParams.name},
                {key: "url", value: `${pathname}${search}${hash}`},
                {key: "raw", value: params},
                {key: "errors", value: error.errors},
            ]);

            const routeError = new RouteError({
                headerText: "Invalid Route Params",
                message: "Invalid Params, Codes Required For Customer And Review",
                description: `Valid customer [uniqueCode] and review [reviewCode] required.`
            });

            Logger.error({
                type: "ERROR",
                error: routeError,
                msg: "Failed to fetch route params.",
                context,
            });

            throw routeError;
        }
    }, [success, error, pathname, search, hash, params]);

    if (!success || !data) {
        return null;
    }

    return data;
}