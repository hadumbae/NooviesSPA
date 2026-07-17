/**
 * @fileoverview Administrative page for displaying a paginated list of showings for a specific theatre.
 */

import {ReactElement} from "react";
import {PageLoader} from "@/views/common/_comp/page";
import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";

import {TheatreShowingListViewData, useFetchTheatreShowingListViewData} from "@/domains/theatres";
import {TheatreShowingListPageContent} from "@/views/admin/theatres/_pages/theatre-showings-list/content.tsx";

const SHOWINGS_PER_PAGE = 10;

/**
 * Page component that resolves theatre route parameters and fetches paginated showing data.
 */
export function TheatreShowingListPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        errorTo: "/admin/theatres",
        schema: SlugRouteParamSchema,
        sourceComponent: TheatreShowingListPage.name,
    }) ?? {};

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const queries = useFetchTheatreShowingListViewData({
        slug: slug!,
        queries: {page, perPage: SHOWINGS_PER_PAGE},
        options: {enabled: !!slug}
    })

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={queries}>
            {({theatre, showings: {totalItems, items}}: TheatreShowingListViewData) => (
                <TheatreShowingListPageContent
                    theatre={theatre}
                    totalShowings={totalItems}
                    showings={items}
                    page={page}
                    perPage={SHOWINGS_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}