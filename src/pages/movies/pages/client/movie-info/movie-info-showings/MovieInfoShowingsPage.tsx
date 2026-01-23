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
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieInfoShowingsPageContent
    from "@/pages/movies/pages/client/movie-info/movie-info-showings/MovieInfoShowingsPageContent.tsx";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import useFetchPaginatedShowings from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    TheatreShowingQueryOptionSchema
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.schema.ts";
import {PaginatedShowingDetailsSchema} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";
import {PaginatedShowingDetails} from "@/pages/showings/schema/showing/ShowingRelated.types.ts";

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
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({
        schema: TheatreShowingQueryOptionSchema
    });

    const movieQuery = useFetchMovieBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    const showingQuery = useFetchPaginatedShowings({
        page,
        perPage: SHOWINGS_PER_PAGE,
        config: {populate: true, virtuals: true},
        queries: {
            ...searchParams,
            movieSlug: slug,
            status: "SCHEDULED",
            isActive: true,
            sortByStartTime: "desc",
        },
    });

    const queries: QueryDefinition[] = [
        {key: "movie", query: movieQuery, schema: MovieDetailsSchema},
        {
            key: "paginatedShowings",
            query: showingQuery,
            schema: PaginatedShowingDetailsSchema
        },
    ];

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
