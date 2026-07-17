/**
 * @fileoverview Administrative page for managing and listing movie genres.
 *
 */

import {ReactElement} from 'react';
import {useTitle} from "@/common/_feat";
import {
    usePaginationLocationState
} from "@/common/_feat/navigation/usePaginationLocationState.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {useFetchPaginatedGenres} from "@/domains/genres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {GenreIndexPageContent} from "@/views/admin/genres/_pages/index-page/content.tsx";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {Genre, GenreQueryOptionSchema, GenreSchema} from "@/domains/genres/_schema";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {PaginatedItems} from "@/common/_types";

const GENRES_PER_PAGE = 20;

/**
 * Entry point for the Genre management index page.
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
        schema: generatePaginationSchema(GenreSchema),
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedItems<Genre>) => (
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
