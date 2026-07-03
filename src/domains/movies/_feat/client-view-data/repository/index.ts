import {MovieClientViewBaseURL} from "@/domains/movies/_feat/client-view-data/repository/baseURL.ts";
import {
    getCreditForMovieInfoView,
    getOverviewDataForMovieInfoView,
    getReviewsForMovieInfoView,
    getShowingsForMovieInfoView
} from "@/domains/movies/_feat/client-view-data/repository/repository.ts";
import {
    GetOverviewDataForMovieInfoViewConfig,
    GetReviewsForMovieInfoViewConfig,
    GetCreditsForMovieInfoViewConfig,
    GetShowingsForMovieInfoViewConfig,
    GetShowingsForMovieViewQueryStrings
} from "@/domains/movies/_feat/client-view-data/repository/repository.types.ts";

export {
    MovieClientViewBaseURL,
    getOverviewDataForMovieInfoView,
    getCreditForMovieInfoView,
    getReviewsForMovieInfoView,
    getShowingsForMovieInfoView,
}

export type {
    GetOverviewDataForMovieInfoViewConfig,
    GetReviewsForMovieInfoViewConfig,
    GetCreditsForMovieInfoViewConfig,
    GetShowingsForMovieViewQueryStrings,
    GetShowingsForMovieInfoViewConfig,
}

