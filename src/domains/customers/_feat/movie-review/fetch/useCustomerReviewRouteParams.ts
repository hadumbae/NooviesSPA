/**
 * @fileoverview Hook for extracting and validating URL parameters in the Customer Review domain.
 */

import {useLocation, useParams} from "react-router-dom";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {RouteError} from "@/common/errors/RouteError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {
    CustomerReviewRouteParams,
    CustomerReviewRouteParamsSchema
} from "@/domains/customers/_feat/movie-review/schema/routeParamsSchema.ts";

/**
 * Retrieves and validates the uniqueCode and reviewCode from the current route.
 */
export function useCustomerReviewRouteParams(): CustomerReviewRouteParams {
    const params = useParams();
    const {pathname, search, hash} = useLocation();

    const {data, success, error} = CustomerReviewRouteParamsSchema.safeParse(params);

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

    return data;
}