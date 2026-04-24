/**
 * @fileoverview Administrative page for displaying a paginated list of showings for a specific theatre.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {TheatreShowingListPageContent} from "@/views/admin/theatres/theatre-showings-list/content.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {TheatreShowingListViewData, useFetchTheatreShowingListViewData} from "@/domains/theatres/_feat/admin-view-data";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {ReactElement} from "react";

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