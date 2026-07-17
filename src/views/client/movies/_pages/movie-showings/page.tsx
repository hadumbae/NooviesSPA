/**
 * @fileoverview Orchestrates route params and data fetching for movie showings.
 */

import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {MovieInfoShowingsPageContent} from "@/views/client/movies/_pages/movie-showings/content.tsx";
import {MovieInfoShowingViewData, ShowingsPageQueryStringSchema, useFetchMovieInfoShowingsData} from "@/domains/movies";

/** Pagination limit for showing queries. */
const SHOWINGS_PER_PAGE = 20;

/**
 * Resolves search and route params to render a validated movie showings view.
 */
export const MovieInfoShowingsPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    }) ?? {};

    const {
        searchParams: {near, page},
        setSearchParams,
    } = useParsedSearchParams({schema: ShowingsPageQueryStringSchema});

    const setPage = (pageValue: number) => {
        setSearchParams({near, page: pageValue});
    };

    const query = useFetchMovieInfoShowingsData({
        slug: slug!,
        options: {enabled: !!slug},
        queries: {
            near,
            page: page ?? 1,
            perPage: SHOWINGS_PER_PAGE,
            country: "NZ",
        },
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({movie, showingDetails: {totalItems, items}}: MovieInfoShowingViewData) => {
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
        </QueryDataLoader>
    );
}

