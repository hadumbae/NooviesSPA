/**
 * @file Public entry point for administrative Genre details data management.
 * @filename index.ts
 */

import {GenreDetailsViewData, GenreDetailsViewDataSchema} from "@/domains/genres/_feat/admin-view-data/GenreDetailsViewDataSchema.ts";
import {useFetchGenreDetailsViewData} from "@/domains/genres/_feat/admin-view-data/useFetchGenreDetailsViewData.ts";

export {
    GenreDetailsViewDataSchema,
    useFetchGenreDetailsViewData,
}

export type {
    GenreDetailsViewData,
}