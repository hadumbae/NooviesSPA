/**
 * @file High-level administrative page for browsing and managing the Genre collection.
 * @filename GenreIndexPage.tsx
 */

import {FC} from 'react';
import usePaginationSearchParams from "@/common/features/fetch-pagination-search-params/hooks/usePaginationSearchParams.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptions.schema.ts";
import GenreIndexPageContent from "@/views/admin/genres/pages/genre-index-page/GenreIndexPageContent.tsx";
import useFetchPaginatedGenres from "@/domains/genres/_feat/crud-hooks/useFetchPaginatedGenres.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {PaginatedGenres, PaginatedGenresSchema} from "@/domains/genres/schema/genre/PaginatedGenresSchema.ts";

/**
 * Acts as the orchestration layer for the Genre Index view.
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
        page,
        perPage,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedGenresSchema}>
            {({totalItems, items}: PaginatedGenres) => (
                <GenreIndexPageContent
                    genres={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default GenreIndexPage;