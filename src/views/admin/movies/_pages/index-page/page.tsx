/**
 * @fileoverview Controller component for the administrative movie library index page.
 */

import {
    usePaginationLocationState
} from "@/common/_feat/navigation/usePaginationLocationState.ts";
import useParsedPaginationValue
    from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {MovieQueryOptionSchema} from "@/domains/movies/_schema/queries";
import {MovieIndexPageContent} from "@/views/admin/movies/_pages/index-page/content.tsx";
import {PaginatedItems} from "@/common/types";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {useFetchPaginatedMovies} from "@/domains/movies/_feat/crud-hooks";

const MOVIES_PER_PAGE = 20;

/**
 * Orchestrates data fetching and state management for the movie library index.
 */
export function MovieIndexPage() {
    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page ?? 1);
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    const query = useFetchPaginatedMovies({
        page,
        perPage: MOVIES_PER_PAGE,
        queries: searchParams,
        config: {populate: true, virtuals: true},
        schema: generatePaginationSchema(MovieDetailsSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedItems<MovieDetails>) => (
                <MovieIndexPageContent
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                    movies={items}
                    totalItems={totalItems}
                />
            )}
        </QueryDataLoader>
    );
}