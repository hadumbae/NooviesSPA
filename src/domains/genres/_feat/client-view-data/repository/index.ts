import {GenreClientViewDataBaseURL} from "@/domains/genres/_feat/client-view-data/repository/baseURL.ts";
import {getFetchGenreWithMovies} from "@/domains/genres/_feat/client-view-data/repository/repository.ts";
import {FetchGenreWithMoviesConfig} from "@/domains/genres/_feat/client-view-data/repository/repository.types.ts";

export {
    GenreClientViewDataBaseURL,
    getFetchGenreWithMovies,
}

export type {
    FetchGenreWithMoviesConfig,
}