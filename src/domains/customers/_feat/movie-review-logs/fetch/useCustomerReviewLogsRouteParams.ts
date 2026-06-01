/**
 * @fileoverview Hook for retrieving and validating route parameters for customer review moderation logs.
 *
 */

import {useParams} from "react-router-dom"
import {CustomerReviewLogsRouteParamsSchema} from "@/domains/customers/_feat/movie-review-logs/schema/routeParamsSchema.ts"
import {useThrowRouteParamError} from "@/common/_feat/fetch-route-params/useThrowRouteParamError.ts"

/** Extracts and validates the customer and review codes from the current URL. */
export function useCustomerReviewLogsRouteParams() {
    const params = useParams()

    const {data, success, error} = CustomerReviewLogsRouteParamsSchema.safeParse(params)

    const throwError = useThrowRouteParamError({
        headerText: "Invalid Route Params",
        message: "Invalid Params, Codes Required For Customer And Review",
        description: "Valid customer [uniqueCode] and review [reviewCode] required."
    })

    if (!success) {
        throwError({raw: params, errors: error.errors})
    }

    return data
}