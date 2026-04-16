import {GenreClientViewDataBaseURL} from "@/domains/genres/_feat/client-view-data/baseURL.ts";
import {
    BrowseGenreWithMoviesViewData,
    BrowseGenreWithMoviesViewSchema
} from "@/domains/genres/_feat/client-view-data/schemas.ts";
import {GenreClientViewDataQueryKeys} from "@/domains/genres/_feat/client-view-data/GenreClientViewDataQueryKeys.ts";
import {FetchGenreWithMoviesConfig} from "@/domains/genres/_feat/client-view-data/repository.types.ts";
import {getFetchGenreWithMovies} from "@/domains/genres/_feat/client-view-data/repository.ts";
import {
    useFetchGenreWithMoviesViewData
} from "@/domains/genres/_feat/client-view-data/useFetchGenreWithMoviesViewData.ts";

export {
    GenreClientViewDataBaseURL,
    BrowseGenreWithMoviesViewSchema,
    GenreClientViewDataQueryKeys,
    getFetchGenreWithMovies,
    useFetchGenreWithMoviesViewData,
}

export type {
    BrowseGenreWithMoviesViewData,
    FetchGenreWithMoviesConfig,
}