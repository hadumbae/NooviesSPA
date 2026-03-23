/**
 * @file Public entry point for administrative Genre details data management.
 * @filename index.ts
 */

import {GenreDetailsViewData, GenreDetailsViewDataSchema} from "@/domains/genres/views/admin/details-page/data/GenreDetailsViewDataSchema.ts";
import {useFetchGenreDetailsViewData} from "@/domains/genres/views/admin/details-page/data/useFetchGenreDetailsViewData.ts";

export {
    GenreDetailsViewDataSchema,
    useFetchGenreDetailsViewData,
}

export type {
    GenreDetailsViewData,
}