/**
 * @fileoverview Hook for retrieving and validating route and pagination parameters for the person info view.
 */

import {useParams} from "react-router-dom";
import {PersonInfoURLParamsSchema} from "src/domains/persons/_feat/fetch-route-params/person-info/urlSchema.ts";
import {useThrowRouteParamError} from "@/common/_feat/fetch-route-params";
import {SlugString} from "@/common/_schemas";

/** Validated route and pagination parameters for the person info domain. */
type RouteReturns = {
    slug: SlugString;
}

/** Extracts and validates the person slug from the URL and manages pagination state. */
export function usePersonInfoRouteParams(): RouteReturns {
    const urlParams = useParams();

    const throwRouteError = useThrowRouteParamError({
        headerText: "Invalid Route Params",
        message: "Person Identifier Is Invalid",
    });

    const {data, success, error} = PersonInfoURLParamsSchema.safeParse(urlParams);
    if (!success) throwRouteError({raw: urlParams, errors: error?.errors});

    return {
        ...data!,
    };
}