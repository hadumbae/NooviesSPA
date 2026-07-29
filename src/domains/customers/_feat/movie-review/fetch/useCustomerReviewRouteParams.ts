/**
 * @fileoverview Hook for extracting and validating URL parameters in the Customer Review domain.
 */

import {useParams} from "react-router-dom";
import {RouteError} from "@/common/_err/RouteError.ts";
import {
    CustomerReviewRouteParams,
    CustomerReviewRouteParamsSchema
} from "@/domains/customers/_feat/movie-review/schema/routeParamsSchema.ts";

/**
 * Retrieves and validates the uniqueCode and reviewCode from the current route.
 */
export function useCustomerReviewRouteParams(): CustomerReviewRouteParams {
    const params = useParams();
    const {data, success} = CustomerReviewRouteParamsSchema.safeParse(params);

    if (!success) {
        throw new RouteError({
            headerText: "Invalid Route Params",
            message: "Invalid Params, Codes Required For Customer And Review",
            description: `Valid customer [customerID] and review [reviewID] required.`
        });
    }

    return data;
}