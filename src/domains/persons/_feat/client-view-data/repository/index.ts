import {PersonClientViewBaseURL} from "@/domains/persons/_feat/client-view-data/repository/baseURL.ts";
import {
    GetFetchBrowsePersonsViewDataConfig,
    GetFetchPersonInfoViewDataConfig
} from "@/domains/persons/_feat/client-view-data/repository/repository.types.ts";
import {
    getFetchBrowsePersonsViewData,
    getFetchPersonInfoViewData
} from "@/domains/persons/_feat/client-view-data/repository/repository.ts";

export {
    PersonClientViewBaseURL,
    getFetchPersonInfoViewData,
    getFetchBrowsePersonsViewData,
}

export type {
    GetFetchPersonInfoViewDataConfig,
    GetFetchBrowsePersonsViewDataConfig,
}