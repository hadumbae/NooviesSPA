import {
    getFetchCustomerProfileViewData, getFetchCustomerReviewsViewData, getFetchCustomerReviewViewData
} from "@/domains/customers/features/data/repository.ts";
import {CustomerViewQueryKeys} from "@/domains/customers/features/data/queryKeys.ts";
import {
    GetFetchCustomerProfileViewDataConfig,
    GetFetchCustomerReviewsViewDataConfig, GetFetchCustomerReviewViewDataConfig
} from "@/domains/customers/features/data/repository.types.ts";

export {
    CustomerViewQueryKeys,
    getFetchCustomerProfileViewData,
    getFetchCustomerReviewViewData,
    getFetchCustomerReviewsViewData,
}


export type {
    GetFetchCustomerProfileViewDataConfig,
    GetFetchCustomerReviewsViewDataConfig,
    GetFetchCustomerReviewViewDataConfig,
}