/**
 * Genre details page.
 *
 * Fetches a genre by slug and displays its details alongside a paginated
 * list of related movies. Query loading, error handling, and schema
 * validation are coordinated via combined query boundaries.
 *
 * Route params:
 * - `slug` — Genre identifier
 */
import {FC, ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";

import useFetchGenreBySlug from "@/pages/genres/hooks/fetch-data/useFetchGenreBySlug.ts";
import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";

import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {GenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";

import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";

import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";

import GenreDetailsUIContextProvider
    from "@/pages/genres/components/admin/genre-details/GenreDetailsUIContextProvider.tsx";
import GenreDetailsPageContent
    from "@/pages/genres/pages/genre-index-page/GenreDetailsPageContent.tsx";

const MOVIES_PER_PAGE = 12;

/**
 * Combined validated query payload.
 *
 * @property genre  - Validated genre details
 * @property movies - Validated paginated movie data
 */
type ValidatedData = {
    genre: GenreDetails;
    movies: PaginatedMovieDetails;
};

/**
 * Genre details page component.
 *
 * Responsibilities:
 * - Resolve slug route param
 * - Fetch genre and paginated movies
 * - Validate responses via schemas
 * - Provide UI context for edit/delete flows
 */
const GenreDetailsPage: FC = (): ReactElement => {
    // --- Page Setup ---
    useTitle("Genre Details");
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    // --- Route Params ---
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        errorMessage: "Failed to fetch genre slug. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    // --- Queries ---
    const genreQuery = useFetchGenreBySlug({
        slug,
        queryConfig: {populate: true, virtuals: true},
    });

    const movieQuery = useFetchPaginatedMovies({
        page,
        perPage: MOVIES_PER_PAGE,
        queryConfig: {populate: true, virtuals: true},
    });

    // --- Query Setup ---
    const queries = [
        genreQuery,
        movieQuery,
    ];

    const validationQueries: CombinedSchemaQuery[] = [
        {key: "genre", query: genreQuery, schema: GenreDetailsSchema},
        {key: "movies", query: movieQuery, schema: PaginatedMovieDetailsSchema},
    ];

    // --- Render ---
    return (
        <GenreDetailsUIContextProvider>
            <CombinedQueryBoundary queries={queries}>
                <CombinedValidatedQueryBoundary queries={validationQueries}>
                    {(data) => {
                        const {genre, movies: {totalItems, items: movies}} = data as ValidatedData;

                        return (
                            <GenreDetailsPageContent
                                genre={genre}
                                movies={movies}
                                totalItems={totalItems}
                                page={page}
                                perPage={MOVIES_PER_PAGE}
                                setPage={setPage}
                            />
                        );
                    }}
                </CombinedValidatedQueryBoundary>
            </CombinedQueryBoundary>
        </GenreDetailsUIContextProvider>
    );
};

export default GenreDetailsPage;
