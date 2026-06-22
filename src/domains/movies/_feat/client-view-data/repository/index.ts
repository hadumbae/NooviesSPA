import {MovieClientViewBaseURL} from "@/domains/movies/_feat/client-view-data/repository/baseURL.ts";
import {
    getFetchMovieInfoCreditsViewData,
    getFetchMovieInfoOverviewViewData,
    getShowingsForMovieView
} from "@/domains/movies/_feat/client-view-data/repository/repository.ts";
import {
    FetchInfoOverviewConfig,
    GetCreditsForMovieViewConfig,
    GetShowingsForMovieViewConfig,
    GetShowingsForMovieViewQueryStrings
} from "@/domains/movies/_feat/client-view-data/repository/repository.types.ts";

export {
    MovieClientViewBaseURL,
    getFetchMovieInfoOverviewViewData,
    getFetchMovieInfoCreditsViewData,
    getShowingsForMovieView,
}

export type {
    FetchInfoOverviewConfig,
    GetCreditsForMovieViewConfig,
    GetShowingsForMovieViewQueryStrings,
    GetShowingsForMovieViewConfig,
}

