import {
    CustomerProfileViewData,
    CustomerProfileViewDataSchema
} from "@/domains/customers/features/profile-overview/viewDataSchema.ts";
import {
    useFetchCustomerProfileViewData
} from "@/domains/customers/features/profile-overview/useFetchCustomerProfileViewData.ts";
import {
    getFetchCustomerProfileViewData,
    type GetFetchCustomerProfileViewDataConfig
} from "@/domains/customers/features/profile-overview/repository.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/features/profile-overview/queryKeys.ts";
import {
    CustomerProfileOverviewRouteParams,
    CustomerProfileOverviewRouteParamsSchema
} from "@/domains/customers/features/profile-overview/routeParamsSchema.ts";

export {
    CustomerProfileOverviewViewQueryKeys,
    CustomerProfileViewDataSchema,
    useFetchCustomerProfileViewData,
    getFetchCustomerProfileViewData,
    CustomerProfileOverviewRouteParamsSchema,
}

export type {
    CustomerProfileViewData,
    GetFetchCustomerProfileViewDataConfig,
    CustomerProfileOverviewRouteParams,
}

