import {CustomerProfileOverviewBaseURL} from "@/domains/customers/_feat/profile-overview/repository/baseURL.ts";
import {
    GetFetchCustomerProfileViewDataConfig
} from "@/domains/customers/_feat/profile-overview/repository/repository.types.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/repository/repository.ts";

export {
    CustomerProfileOverviewBaseURL,
    getFetchCustomerProfileViewData,
}

export type {
    GetFetchCustomerProfileViewDataConfig,
}

