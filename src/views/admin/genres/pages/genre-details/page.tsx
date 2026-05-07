/**
 * @file Administrative page for managing a specific genre and its associated movie catalog.
 * @filename GenreDetailsPage.tsx
 */

import {ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";

import {GenreDetailsViewData, useFetchGenreDetailsViewData} from "@/domains/genres/_feat/admin-view-data";
import {GenreDetailsPageContent} from "@/views/admin/genres/pages/genre-details/content.tsx";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {GenreDetailsUIContextProvider} from "@/domains/genres/context/genre-details-ui-context";

/** Default limit for the paginated movie sub-collection. */
const MOVIES_PER_PAGE = 12;

/**
 * The administrative entry point for the Genre Details view.
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
        </GenreDetailsUIContextProvider>
    );
}

