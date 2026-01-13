/**
 * @file GenreDetailsPage.tsx
 *
 * Admin page for displaying genre details and its related movies.
 *
 * Responsibilities:
 * - Resolve and validate the genre slug from route params
 * - Fetch genre details and paginated related movies
 * - Coordinate multi-query loading and schema validation
 * - Provide UI context for genre-level interactions
 * - Delegate rendering to the page content component
 *
 * Route params:
 * - `slug` — Genre identifier
 */

import {FC, ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import GenreDetailsUIContextProvider
    from "@/pages/genres/components/admin/genre-details/GenreDetailsUIContextProvider.tsx";
import GenreDetailsPageContent
    from "@/pages/genres/pages/genre-index-page/GenreDetailsPageContent.tsx";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useGenreDetailsPageQueries from "@/pages/genres/hooks/pages/details-page/useGenreDetailsPageQueries.ts";

/**
 * Number of movies displayed per page.
 */
const MOVIES_PER_PAGE = 12;

/**
 * Combined validated query payload.
 */
type ValidatedData = {
    genre: GenreDetails;
    movies: PaginatedMovieDetails;
};

/**
 * **GenreDetailsPage**
 *
 * Admin entry point for the Genre Details view.
 *
 * Flow:
 * 1. Set document title
 * 2. Parse pagination state from URL
 * 3. Resolve and validate genre slug
 * 4. Execute genre + movie queries
 * 5. Validate responses via schemas
 * 6. Provide UI context
 * 7. Delegate rendering to {@link GenreDetailsPageContent}
 *
 * @component
 */
const GenreDetailsPage: FC = (): ReactElement => {
    useTitle("Genre Details");

    const {value: page, setValue: setPage} =
        useParsedPaginationValue("page", 1);

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        errorMessage: "Failed to fetch genre slug. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    const queries = useGenreDetailsPageQueries({
        genreConfig: {slug},
        movieConfig: {page, perPage: MOVIES_PER_PAGE},
    });

    return (
        <GenreDetailsUIContextProvider>
            <MultiQueryDataLoader queries={queries}>
                {(data) => {
                    const {
                        genre,
                        movies: {totalItems, items: movies},
                    } = data as ValidatedData;

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
            </MultiQueryDataLoader>
        </GenreDetailsUIContextProvider>
    );
};

export default GenreDetailsPage;
