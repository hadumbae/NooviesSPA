import {FC} from 'react';
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";

import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import MovieIndexPageContent from "@/pages/movies/pages/admin/movie-edit-page/MovieIndexPageContent.tsx";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

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
