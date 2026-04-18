import {
    PersonDetailsViewData,
    PersonDetailsViewSchema
} from "@/domains/persons/_feat/admin-view-data/schema/PersonDetailsViewSchema.ts";
import {PersonAdminViewDataBaseURL} from "@/domains/persons/_feat/admin-view-data/repository/baseURL.ts";
import {FetchPersonDetailsViewDataConfig} from "@/domains/persons/_feat/admin-view-data/repository/repository.types.ts";
import {getFetchPersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data/repository/repository.ts";
import {
    useFetchPersonDetailsViewData
} from "@/domains/persons/_feat/admin-view-data/fetch/useFetchPersonDetailsViewData.ts";


export {
    PersonDetailsViewSchema,
    PersonAdminViewDataBaseURL,
    getFetchPersonDetailsViewData,
    useFetchPersonDetailsViewData,
}
export type {
    PersonDetailsViewData,
    FetchPersonDetailsViewDataConfig,
}
