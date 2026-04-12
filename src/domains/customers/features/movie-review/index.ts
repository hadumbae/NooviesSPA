import {
    CustomerReviewViewData,
    CustomerReviewViewSchema
} from "@/domains/customers/features/movie-review/viewDataSchema.ts";
import {
    CustomerReviewRouteParams,
    CustomerReviewRouteParamsSchema
} from "@/domains/customers/features/movie-review/routeParamsSchema.ts";
import {useCustomerReviewRouteParams} from "@/domains/customers/features/movie-review/useCustomerReviewRouteParams.ts";
import {
    useFetchCustomerReviewViewData
} from "@/domains/customers/features/movie-review/useFetchCustomerReviewViewData.ts";
import {
    getFetchCustomerReviewViewData,
    GetFetchCustomerReviewViewDataConfig
} from "@/domains/customers/features/movie-review/repository.ts";
import {CustomerReviewViewQueryKeys} from "@/domains/customers/features/movie-review/queryKeys.ts";

export {
    CustomerReviewViewSchema,
    CustomerReviewRouteParamsSchema,
    useCustomerReviewRouteParams,
    useFetchCustomerReviewViewData,
    getFetchCustomerReviewViewData,
    CustomerReviewViewQueryKeys,
}
export type {
    CustomerReviewViewData,
    CustomerReviewRouteParams,
    GetFetchCustomerReviewViewDataConfig,
}
