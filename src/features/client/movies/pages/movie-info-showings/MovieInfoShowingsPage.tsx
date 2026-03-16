/**
 * @file MovieInfoShowingsPage.tsx
 *
 * Client page for displaying all scheduled showings of a single movie.
 *
 * @remarks
 * This page:
 * - Resolves the movie slug from route parameters
 * - Fetches movie details and paginated showings in parallel
 * - Applies query-string–driven filters and pagination
 * - Delegates rendering to {@link MovieInfoShowingsPageContent}
 *
 * Data loading is coordinated via {@link MultiQueryDataLoader}
 * to ensure schema-safe, synchronized query resolution.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import MovieInfoShowingsPageContent
    from "@/features/client/movies/pages/movie-info-showings/MovieInfoShowingsPageContent.tsx";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    ShowingsPageQueryStringSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.schema.ts";
import {PaginatedShowingDetails} from "@/domains/showings/schema/showing/ShowingRelated.types.ts";
import {
    useMovieInfoShowingsPageQueries
} from "@/domains/movies/views/client/movie-info-showings-page/useMovieInfoShowingsPageQueries.ts";

/** Default number of showings displayed per page. */
const SHOWINGS_PER_PAGE = 20;

/**
 * Combined data contract for resolved page queries.
 */
type QueryData = {
    movie: MovieDetails;
    paginatedShowings: PaginatedShowingDetails;
};

/**
 * Page component for browsing showings associated with a movie.
 *
 * @returns Fully resolved movie showings page.
 */
const MovieInfoShowingsPage = () => {
    const routeParams = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    });

    if (!routeParams) {
        return <PageLoader />;
    }

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: ShowingsPageQueryStringSchema});

    const queries = useMovieInfoShowingsPageQueries({
       movieSlug: routeParams.slug,
       queryOptions: searchParams,
       showingsPage: page,
       showingsPerPage: SHOWINGS_PER_PAGE,
    });

    return (
        <MultiQueryDataLoader queries={queries}>
            {(data) => {
                const {
                    movie,
                    paginatedShowings: {
                        totalItems: totalShowings,
                        items: showings
                    }
                } = data as QueryData;

                return (
                    <MovieInfoShowingsPageContent
                        movie={movie}
                        page={page}
                        perPage={SHOWINGS_PER_PAGE}
                        setPage={setPage}
                        showings={showings}
                        totalShowings={totalShowings}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
};

export default MovieInfoShowingsPage;
