import {
    TheatreDetailsViewData,
    TheatreDetailsViewDataSchema
} from "@/domains/theatres/_feat/admin-view-data/schemas/TheatreDetailsViewDataSchema.ts";
import {
    GetFetchTheatreDetailsViewDataConfig
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.types.ts";
import {getFetchTheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data/repository/repository.ts";
import {TheatreAdminViewDataQueryKeys} from "@/domains/theatres/_feat/admin-view-data/fetch/queryKeys.ts";
import {
    useFetchTheatreDetailsViewData
} from "@/domains/theatres/_feat/admin-view-data/fetch/useFetchTheatreDetailsViewData.ts";


export {
    TheatreDetailsViewDataSchema,
    getFetchTheatreDetailsViewData,
    TheatreAdminViewDataQueryKeys,
    useFetchTheatreDetailsViewData,
}

export type {
    TheatreDetailsViewData,
    GetFetchTheatreDetailsViewDataConfig,
}
