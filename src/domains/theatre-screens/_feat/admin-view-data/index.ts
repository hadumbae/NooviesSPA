import {
    TheatreScreenDetailsRouteParams,
    TheatreScreenDetailsRouteParamSchema
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/routeParamSchema.ts";
import {TheatreScreenAdminViewDataBaseURL} from "@/domains/theatre-screens/_feat/admin-view-data/baseURL.ts";
import {
    TheatreScreenDetailsViewData,
    TheatreScreenDetailsViewDataSchema
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/viewDataSchema.ts";
import {
    getFetchTheatreScreenAdminViewData
} from "@/domains/theatre-screens/_feat/admin-view-data/repository/repository.ts";
import {
    FetchTheatreScreenAdminViewDataConfig
} from "@/domains/theatre-screens/_feat/admin-view-data/repository/repository.types.ts";
import {
    useFetchTheatreScreenDetailsViewData
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/useFetchTheatreScreenDetailsViewData.ts";


export {
    TheatreScreenAdminViewDataBaseURL,
    TheatreScreenDetailsRouteParamSchema,
    TheatreScreenDetailsViewDataSchema,
    getFetchTheatreScreenAdminViewData,
    useFetchTheatreScreenDetailsViewData,
}

export type {
    TheatreScreenDetailsRouteParams,
    TheatreScreenDetailsViewData,
    FetchTheatreScreenAdminViewDataConfig,
}

