import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import useFetchGenre from "@/domains/genres/_feat/crud-hooks/useFetchGenre.ts";
import useFetchPaginatedGenres from "@/domains/genres/_feat/crud-hooks/useFetchPaginatedGenres.ts";
import useFetchGenreBySlug from "@/domains/genres/_feat/crud-hooks/useFetchGenreBySlug.ts";
import useFetchGenres from "@/domains/genres/_feat/crud-hooks/useFetchGenres.ts";
import useGenreDataSubmit, {UseGenreDataSubmitConfig} from "@/domains/genres/_feat/crud-hooks/useGenreDataSubmit.ts";
import {GenreCRUDMutationKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDMutationKeys.ts";
import useDeleteGenre from "@/domains/genres/_feat/crud-hooks/useDeleteGenre.ts";

export {
    GenreCRUDQueryKeys,
    GenreCRUDMutationKeys,
    useFetchGenre,
    useFetchGenres,
    useFetchGenreBySlug,
    useFetchPaginatedGenres,
    useGenreDataSubmit,
    useDeleteGenre,
}

export type {
    UseGenreDataSubmitConfig,
}