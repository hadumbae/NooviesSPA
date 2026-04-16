/**
 * @fileoverview Client-facing page for displaying detailed genre information.
 * Orchestrates URL parameter extraction, pagination state, and aggregated data retrieval.
 */

import { ReactElement } from "react";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import { SlugRouteParamSchema } from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import { PageLoader } from "@/views/common/_comp/page";
import { BrowseGenreInfoPageContent } from "@/views/client/genres/browse-genre-info/content.tsx";
import { QueryDataLoader } from "@/common/components/query/loaders/QueryDataLoader.tsx";
import { useFetchGenreWithMoviesViewData } from "@/domains/genres/_feat/client-view-data";
import { useParsedPaginationValue } from "@/common/features/fetch-pagination-search-params";

/** Global constant defining the number of movie results per page. */
const MOVIES_PER_PAGE = 10;

/**
 * Page component that manages the lifecycle of fetching a specific genre and its associated movies.
 */
export function BrowseGenreInfoPage(): ReactElement {
    const { slug } = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/genres",
        errorMessage: "Genre Not Found.",
    }) ?? {};

    const { value: page, setValue: setPage } = useParsedPaginationValue("page", 1);

    const query = useFetchGenreWithMoviesViewData({
        slug: slug!,
        moviePagination: { page, perPage: MOVIES_PER_PAGE },
        options: { enabled: !!slug }
    });

    if (!slug) {
        return <PageLoader />;
    }

    return (
        <QueryDataLoader query={query}>
            {({ genre, movies: { totalItems, items } }) => (
                <BrowseGenreInfoPageContent
                    genre={genre}
                    movies={items}
                    totalMovies={totalItems}
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}