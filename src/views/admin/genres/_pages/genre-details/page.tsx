/**
 * @fileoverview Administrative page for managing a specific genre and its associated movie catalog.
 */

import {ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {
    GenreDetailsUIContextProvider,
    GenreDetailsUIPendingContextProvider,
    GenreDetailsViewData,
    useFetchGenreDetailsViewData
} from "@/domains/genres";
import {GenreDetailsPageContent} from "@/views/admin/genres/_pages/genre-details/content.tsx";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {PageLoader} from "@/views/common/_comp/page";

/** Default limit for the paginated movie sub-collection. */
const MOVIES_PER_PAGE = 12;

/**
 * Administrative entry point for the Genre Details view.
 */
export function GenreDetailsPage(): ReactElement {
    useTitle("Genre Details");

    const {value: page, setValue: setPage} =
        useParsedPaginationValue("page", 1);

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        errorMessage: "Failed to fetch genre slug. Please try again.",
    }) ?? {};

    const query = useFetchGenreDetailsViewData({
        slug: slug!,
        queries: {page, perPage: MOVIES_PER_PAGE},
        options: {enabled: !!slug}
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <GenreDetailsUIContextProvider>
            <GenreDetailsUIPendingContextProvider>
                <QueryDataLoader query={query}>
                    {
                        ({genre, details: {movies: {totalItems, items: movies}}}: GenreDetailsViewData) => (
                            <GenreDetailsPageContent
                                genre={genre}
                                movies={movies}
                                totalItems={totalItems}
                                page={page}
                                perPage={MOVIES_PER_PAGE}
                                setPage={setPage}
                            />
                        )
                    }
                </QueryDataLoader>
            </GenreDetailsUIPendingContextProvider>
        </GenreDetailsUIContextProvider>
    );
}
