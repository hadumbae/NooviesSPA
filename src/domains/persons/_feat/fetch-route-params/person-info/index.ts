import {
    PersonInfoURLParams,
    PersonInfoURLParamsSchema
} from "@/domains/persons/_feat/fetch-route-params/person-info/urlSchema.ts";
import {
    usePersonInfoRouteParams
} from "@/domains/persons/_feat/fetch-route-params/person-info/usePersonInfoRouteParams.ts";

export {
    usePersonInfoRouteParams,
    PersonInfoURLParamsSchema,
}

export type {
    PersonInfoURLParams,
}