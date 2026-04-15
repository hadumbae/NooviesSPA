/**
 * @file Public entry point for administrative Genre details data management.
 * @filename index.ts
 */

import {
    GenreDetailsViewData,
    GenreDetailsViewDataSchema
} from "@/domains/genres/_feat/admin-view-data/GenreDetailsViewDataSchema.ts";
import {useFetchGenreDetailsViewData} from "@/domains/genres/_feat/admin-view-data/useFetchGenreDetailsViewData.ts";
import {GenreAdminViewDataBaseURL} from "@/domains/genres/_feat/admin-view-data/baseURL.ts";
import {FetchGenreDetailsConfig} from "@/domains/genres/_feat/admin-view-data/repository.types.ts";
import {getFetchGenreDetails} from "@/domains/genres/_feat/admin-view-data/repository.ts";

export {
    GenreDetailsViewDataSchema,
    useFetchGenreDetailsViewData,
    GenreAdminViewDataBaseURL,
    getFetchGenreDetails,
}

export type {
    GenreDetailsViewData,
    FetchGenreDetailsConfig,
}