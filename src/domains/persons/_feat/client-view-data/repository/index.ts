import {PersonClientViewBaseURL} from "@/domains/persons/_feat/client-view-data/repository/baseURL.ts";
import {
    GetFetchPersonInfoViewDataConfig
} from "@/domains/persons/_feat/client-view-data/repository/repository.types.ts";
import {getFetchPersonInfoViewData} from "@/domains/persons/_feat/client-view-data/repository/repository.ts";

export {
    PersonClientViewBaseURL,
    getFetchPersonInfoViewData,
}

export type {
    GetFetchPersonInfoViewDataConfig,
}