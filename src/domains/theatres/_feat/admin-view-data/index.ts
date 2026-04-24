import {
    TheatreDetailsViewData,
    TheatreDetailsViewDataSchema
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreDetailsViewDataSchema.ts";
import {
    GetFetchTheatreDetailsViewDataConfig, GetFetchTheatreShowingListViewDataConfig
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.types.ts";
import {
    getFetchTheatreDetailsViewData,
    getFetchTheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.ts";
import {TheatreAdminViewDataQueryKeys} from "@/domains/theatres/_feat/admin-view-data/fetch/queryKeys.ts";
import {
    useFetchTheatreDetailsViewData
} from "@/domains/theatres/_feat/admin-view-data/fetch/useFetchTheatreDetailsViewData.ts";
import {
    useFetchTheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/fetch/useFetchTheatreShowingListViewData.ts";
import {
    TheatreShowingListViewData,
    TheatreShowingListViewDataSchema
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreShowingListViewDataSchema.ts";


export {
    TheatreAdminViewDataQueryKeys,

    // Theatre Details View Data
    TheatreDetailsViewDataSchema,
    getFetchTheatreDetailsViewData,
    useFetchTheatreDetailsViewData,

    // Theatre Showing List View Data
    TheatreShowingListViewDataSchema,
    getFetchTheatreShowingListViewData,
    useFetchTheatreShowingListViewData,
}
export type {
    // Theatre Details View Data
    TheatreDetailsViewData,
    GetFetchTheatreDetailsViewDataConfig,

    // Theatre Showing List View Data
    TheatreShowingListViewData,
    GetFetchTheatreShowingListViewDataConfig,
}
