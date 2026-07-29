/**
 * @fileoverview Hook for retrieving and validating route parameters for the customer reviews view.
 */

import {useParams} from "react-router-dom";
import {RouteError} from "@/common/_err/RouteError.ts";
import {CustomerReviewsRouteParams, CustomerReviewsRouteParamsSchema} from "@/domains/customers";

/**
 * Extracts and validates customer review route parameters from the URL.
 * Throws a RouteError if the customer ID is missing or invalid.
 */
export function useCustomerReviewsRouteParams(): CustomerReviewsRouteParams {
    const params = useParams();
    const {data, success} = CustomerReviewsRouteParamsSchema.safeParse(params);

    if (!success) {
        throw new RouteError({
            headerText: "Invalid Route Params",
            message: "Invalid Params, Valid ID Required For Customer",
            description: `Valid customer [customerID] required.`
        });

    }

    return data;
}