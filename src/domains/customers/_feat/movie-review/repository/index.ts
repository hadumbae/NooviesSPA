import {ManageCustomerMovieReviewBaseURL} from "@/domains/customers/_feat/movie-review/repository/baseURL.ts";
import {
    GetFetchCustomerReviewViewDataConfig
} from "@/domains/customers/_feat/movie-review/repository/repository.types.ts";
import {getFetchCustomerReviewViewData} from "@/domains/customers/_feat/movie-review/repository/repository.ts";

export {
    ManageCustomerMovieReviewBaseURL,
    getFetchCustomerReviewViewData,
}

export type {
    GetFetchCustomerReviewViewDataConfig,
}
