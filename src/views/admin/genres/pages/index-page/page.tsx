/**
 * @fileoverview Administrative page for managing Genres.
 * Handles pagination, search param parsing, and validated data fetching.
 */

import {ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptions.schema.ts";
import {PaginatedGenres, PaginatedGenresSchema} from "@/domains/genres/schema/genre/PaginatedGenresSchema.ts";
import {useFetchPaginatedGenres} from "@/domains/genres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {GenreIndexPageContent} from "@/views/admin/genres/pages/index-page/content.tsx";
import {useParsedPaginationValue} from "@/common/features/fetch-pagination-search-params";

const GENRES_PER_PAGE = 20;

/**
 * The Genre Index Page entry point.
 * Orchestrates data fetching for the genre management table including pagination and filters.
 */
export function GenreIndexPage(): ReactElement {
    useTitle("Genres");

    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page ?? 1);
    const {searchParams} = useParsedSearchParams({schema: GenreQueryOptionSchema});

    const query = useFetchPaginatedGenres({
        page,
        perPage: GENRES_PER_PAGE,
        queries: searchParams,
        schema: PaginatedGenresSchema,
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedGenres) => (
                <GenreIndexPageContent
                    genres={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={GENRES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}
