import {
    TheatreScreenDetailsRouteParams,
    TheatreScreenDetailsRouteParamSchema
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/routeParamSchema.ts";
import {
    useFetchTheatreScreenDetailsViewData
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/useFetchTheatreScreenDetailsViewData.ts";
import {
    TheatreScreenDetailsViewData,
    TheatreScreenDetailsViewDataSchema
} from "@/domains/theatre-screens/_feat/admin-view-data/theatre-screen-details/viewDataSchema.ts";

export {
    TheatreScreenDetailsRouteParamSchema,
    TheatreScreenDetailsViewDataSchema,
    useFetchTheatreScreenDetailsViewData,
}

export type {
    TheatreScreenDetailsViewData,
    TheatreScreenDetailsRouteParams,
}

