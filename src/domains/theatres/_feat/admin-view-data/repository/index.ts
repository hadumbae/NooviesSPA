import {TheatreAdminViewDataBaseURL} from "@/domains/theatres/_feat/admin-view-data/repository/baseURL.ts";
import {
    getFetchTheatreDetailsViewData,
    getFetchTheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.ts";
import {
    GetFetchTheatreDetailsViewDataConfig,
    GetFetchTheatreShowingListViewDataConfig
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.types.ts";


export {
    TheatreAdminViewDataBaseURL,
    getFetchTheatreDetailsViewData,
    getFetchTheatreShowingListViewData,
}

export type {
    GetFetchTheatreDetailsViewDataConfig,
    GetFetchTheatreShowingListViewDataConfig,
}