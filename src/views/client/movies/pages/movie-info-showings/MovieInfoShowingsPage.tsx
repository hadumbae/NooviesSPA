/**
 * @file Orchestrates route params and data fetching for movie showings.
 * @filename MovieInfoShowingsPage.tsx
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import { SlugRouteParamSchema } from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import MovieInfoShowingsPageContent
    from "@/views/client/movies/pages/movie-info-showings/MovieInfoShowingsPageContent.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    ShowingsPageQueryStringSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.schema.ts";
import {
    useFetchMovieInfoShowingsData
} from "@/domains/movies/views/client/movie-info-showings-page/useFetchMovieInfoShowingsData.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    MovieInfoShowingsViewData,
    MovieInfoShowingsViewSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/MovieInfoShowingsViewSchema.ts";

/** Pagination limit for showing queries. */
const SHOWINGS_PER_PAGE = 20;

/**
 * Resolves search and route params to render a validated {@link MovieInfoShowingsViewSchema}.
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

    const {
        searchParams: { near, page },
        setSearchParams
    } = useParsedSearchParams({ schema: ShowingsPageQueryStringSchema });

    const setPage = (pageValue: number) => {
        setSearchParams({ near, page: pageValue });
    };

    const query = useFetchMovieInfoShowingsData({
        slug: routeParams.slug,
        queries: {
            near,
            page: page ?? 1,
            perPage: SHOWINGS_PER_PAGE,
            country: "NZ",
        }
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieInfoShowingsViewSchema}>
            {({ movie, showingDetails: { totalItems, items } }: MovieInfoShowingsViewData) => {
                return (
                    <MovieInfoShowingsPageContent
                        movie={movie}
                        page={page ?? 1}
                        perPage={SHOWINGS_PER_PAGE}
                        setPage={setPage}
                        showings={items}
                        totalShowings={totalItems}
                    />
                );
            }}
        </ValidatedDataLoader>
    );
};

export default MovieInfoShowingsPage;