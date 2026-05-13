/**
 * @fileoverview Page component for browsing and paginating through the movie catalog.
 *
 */

import {ReactElement} from 'react';
import useFetchPaginatedMovies from "@/domains/movies/_feat/crud-hooks/useFetchPaginatedMovies.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useParsedPaginationValue} from "@/common/features/fetch-pagination-search-params";
import {BrowseMoviesPageContent} from "@/views/client/movies/pages/browse-movies/BrowseMoviesPageContent.tsx";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie";
import {PaginatedItems} from "@/common/types";

/** The number of movie items displayed per page. */
const MOVIES_PER_PAGE = 25;

/** Renders the movie browsing page with pagination and data validation. */
export function BrowseMoviesPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchPaginatedMovies({
        page: page,
        perPage: 25,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={generatePaginationSchema(MovieDetailsSchema)}>
            {({totalItems, items: movies}: PaginatedItems<MovieDetails>) => (
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
