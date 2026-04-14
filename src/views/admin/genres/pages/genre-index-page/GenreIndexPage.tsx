/**
 * @fileoverview Administrative page for managing Genres.
 * Handles pagination, search param parsing, and validated data fetching.
 */

import {FC} from 'react';
import usePaginationSearchParams from "@/common/features/fetch-pagination-search-params/hooks/usePaginationSearchParams.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptions.schema.ts";
import GenreIndexPageContent from "@/views/admin/genres/pages/genre-index-page/GenreIndexPageContent.tsx";
import {PaginatedGenres, PaginatedGenresSchema} from "@/domains/genres/schema/genre/PaginatedGenresSchema.ts";
import {useFetchPaginatedGenres} from "@/domains/genres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Orchestration layer for the Genre Index view.
 */
const GenreIndexPage: FC = () => {
    useTitle("Genres");

    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage, setPage} = usePaginationSearchParams(
        paginationState ?? {page: 1, perPage: 25}
    );

    const {searchParams} = useParsedSearchParams({
        schema: GenreQueryOptionSchema
    });

    const query = useFetchPaginatedGenres({
        schema: PaginatedGenresSchema,
        page,
        perPage,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedGenres) => (
                <GenreIndexPageContent
                    genres={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
};

export default GenreIndexPage;