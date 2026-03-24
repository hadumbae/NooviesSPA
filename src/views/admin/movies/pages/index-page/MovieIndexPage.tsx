import {FC} from 'react';
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";

import useFetchPaginatedMovies from "@/domains/movies/hooks/queries/useFetchPaginatedMovies.ts";
import MovieIndexPageContent from "@/views/admin/movies/pages/edit-page/MovieIndexPageContent.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {MovieQueryOptionSchema} from "@/domains/movies/schema/queries/MovieQueryOption.schema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    PaginatedMovieDetails,
    PaginatedMovieDetailsSchema
} from "@/domains/movies/schema/movie/PaginatedMovieDetailsSchema.ts";

/** Number of movies displayed per page */
const MOVIES_PER_PAGE = 20;

/**
 * Admin movie index page.
 *
 * @remarks
 * Responsible for:
 * - Parsing pagination and filter state from the URL
 * - Fetching paginated movie data
 * - Handling loading, error, and validation boundaries
 * - Delegating rendering to {@link MovieIndexPageContent}
 */
const MovieIndexPage: FC = () => {
    // --- STATE ---
    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page);
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    // --- QUERY ---
    const query = useFetchPaginatedMovies({
        page,
        perPage: MOVIES_PER_PAGE,
        queries: searchParams,
        config: {populate: true, virtuals: true},
    });

    // --- RENDER ---
    return (
        <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
            {(paginatedMovies: PaginatedMovieDetails) => {
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
        </ValidatedDataLoader>
    );
};

export default MovieIndexPage;
