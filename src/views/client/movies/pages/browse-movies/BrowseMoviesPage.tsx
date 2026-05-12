/**
 * @fileoverview Page component for browsing and paginating through the movie catalog.
 */

import {ReactElement} from 'react';
import useFetchPaginatedMovies from "@/domains/movies/_feat/crud-hooks/useFetchPaginatedMovies.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    PaginatedMovieDetails,
    PaginatedMovieDetailsSchema
} from "@/domains/movies/schema/movie/PaginatedMovieDetailsSchema.ts";
import {useParsedPaginationValue} from "@/common/features/fetch-pagination-search-params";
import {BrowseMoviesPageContent} from "@/views/client/movies/pages/browse-movies/BrowseMoviesPageContent.tsx";

const MOVIES_PER_PAGE = 25;

/**
 * Renders the movie browsing page with pagination and data validation.
 */
export function BrowseMoviesPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchPaginatedMovies({
        page: page,
        perPage: 25,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
            {({totalItems, items: movies}: PaginatedMovieDetails) => (
                <BrowseMoviesPageContent
                    movies={movies}
                    totalMovies={totalItems}
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </ValidatedDataLoader>
    );
}
