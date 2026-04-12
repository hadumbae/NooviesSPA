import {
    CustomerReviewsViewData,
    CustomerReviewsViewDataSchema
} from "@/domains/customers/features/movie-reviews/viewDataSchema.ts";
import {
    useFetchCustomerReviewsViewData
} from "@/domains/customers/features/movie-reviews/useFetchCustomerReviewsViewData.ts";
import {
    getFetchCustomerReviewsViewData,
    type GetFetchCustomerReviewsViewDataConfig
} from "@/domains/customers/features/movie-reviews/repository.ts";
import {CustomerReviewsViewQueryKeys} from "@/domains/customers/features/movie-reviews/queryKeys.ts";
import {
    CustomerReviewRouteParamsSchema,
    CustomerReviewsRouteParams
} from "@/domains/customers/features/movie-reviews/routeParamsSchema.ts";

export {
    CustomerReviewsViewQueryKeys,
    CustomerReviewsViewDataSchema,
    useFetchCustomerReviewsViewData,
    getFetchCustomerReviewsViewData,
    CustomerReviewRouteParamsSchema,
}

export type {
    CustomerReviewsViewData,
    GetFetchCustomerReviewsViewDataConfig,
    CustomerReviewsRouteParams,
}
