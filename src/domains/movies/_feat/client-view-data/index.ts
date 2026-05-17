import {
    MovieInfoOverviewViewData,
    MovieInfoOverviewViewSchema
} from "@/domains/movies/_feat/client-view-data/schemas/MovieInfoOverviewViewSchema.ts";
import {MovieClientViewBaseURL} from "@/domains/movies/_feat/client-view-data/repositories/baseURL.ts";
import {
    MovieInfoCreditViewData,
    MovieInfoCreditViewSchema
} from "@/domains/movies/_feat/client-view-data/schemas/MovieInfoCreditViewSchema.ts";
import {
    MovieInfoShowingViewData,
    MovieInfoShowingViewSchema
} from "@/domains/movies/_feat/client-view-data/schemas/MovieInfoShowingViewSchema.ts";
import {
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data/schemas/ShowingsPageQueryStringSchema.ts";
import {
    ShowingsPageQueryFormStarterValues,
    ShowingsPageQueryFormValuesSchema
} from "@/domains/movies/_feat/manage-showing-page/ShowingsPageQueryFormValuesSchema.ts";
import {
    useFetchMovieInfoOverviewViewData
} from "@/domains/movies/_feat/client-view-data/hooks/useFetchMovieInfoOverviewViewData.ts";

export {
    MovieClientViewBaseURL,
    MovieInfoOverviewViewSchema,
    MovieInfoCreditViewSchema,
    MovieInfoShowingViewSchema,
    ShowingsPageQueryStringSchema,
    ShowingsPageQueryFormValuesSchema,
    useFetchMovieInfoOverviewViewData,
}


export type {
    MovieInfoOverviewViewData,
    MovieInfoCreditViewData,
    MovieInfoShowingViewData,
    ShowingsPageQueryStrings,
    ShowingsPageQueryFormStarterValues,
}