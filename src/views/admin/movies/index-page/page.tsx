/**
 * @fileoverview Main controller component for the Movie Index page.
 * Manages URL-driven state for pagination and filtering while fetching
 * movie data through TanStack Query.
 */

import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {MovieQueryOptionSchema} from "@/domains/movies/schema/queries";
import {MovieIndexPageContent} from "@/views/admin/movies/index-page/content.tsx";
import {PaginatedItems} from "@/common/types";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchPaginatedMovies} from "@/domains/movies/_feat/crud-hooks";

const MOVIES_PER_PAGE = 20;

/**
 * Higher-order page component that orchestrates data fetching and state management
 * for the administrative movie library index.
 */
export function MovieIndexPage() {
    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page);
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    const query = useFetchPaginatedMovies({
        schema: generatePaginationSchema(MovieDetailsSchema),
        page,
        perPage: MOVIES_PER_PAGE,
        queries: searchParams,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {(paginatedMovies: PaginatedItems<MovieDetails>) => {
                const {totalItems, items: movies} = paginatedMovies;

                return (
                    <MovieIndexPageContent
                        page={page}
                        perPage={MOVIES_PER_PAGE}
                        setPage={setPage}
                        movies={movies}
                        totalItems={totalItems}
                    />
                );
            }}
        </QueryDataLoader>
    );
}