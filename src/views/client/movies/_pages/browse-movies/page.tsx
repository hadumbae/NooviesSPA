/**
 * @fileoverview Page component for browsing and paginating through the movie catalog.
 */

import {ReactElement} from 'react';
import {PaginatedItems} from "@/common/_types";
import {QueryDataLoader} from "@/views/common/_feat";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

import {MovieDetails, MovieDetailsSchema, useFetchPaginatedMovies} from "@/domains/movies";
import {BrowseMoviesPageContent} from "@/views/client/movies/_pages/browse-movies/content.tsx";

/** The number of movie items displayed per page. */
const MOVIES_PER_PAGE = 25;

/** Renders the movie browsing page with pagination and data validation. */
export function BrowseMoviesPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchPaginatedMovies({
        schema: generatePaginationSchema(MovieDetailsSchema),
        page: page,
        perPage: 25,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: movies}: PaginatedItems<MovieDetails>) => (
                <BrowseMoviesPageContent
                    movies={movies}
                    totalMovies={totalItems}
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}
