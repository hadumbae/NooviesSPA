/**
 * @fileoverview Administrative page for displaying and managing the details of a specific theatre.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {useFetchByIdentifierRouteParams} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {
    QueryErrorBoundary
} from "@/views/common/_feat/error-boundary/query-error-fallback/boundary/QueryErrorBoundary.tsx";
import {QueryDataLoader} from "@/views/common/_feat";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";

import {TheatreDetailsPageContent} from "@/views/admin/theatres/_pages/theatre-details-page/content.tsx";
import {
    TheatreDetailsUIContextProvider,
    TheatreDetailsViewData,
    TheatreHttpStatusOverrideText,
    useFetchTheatreDetailsViewData
} from "@/domains/theatres";

/** Number of screens displayed per pagination page. */
const SCREENS_PER_PAGE = 25;
/** Maximum number of upcoming showings to display in the overview. */
const SHOWINGS_LIMIT = 10;

/**
 * Administrative page component for viewing and managing a specific theatre's details.
 */
export function TheatreDetailsPage(): ReactElement {
    const routeParams = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreDetailsPage.name,
    });

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchTheatreDetailsViewData({
        slug: routeParams?.slug!,
        queries: {screenPage: page, screenPerPage: SCREENS_PER_PAGE, showingLimit: SHOWINGS_LIMIT},
        options: {enabled: !!routeParams?.slug},
    });

    if (!routeParams?.slug) {
        return <PageLoader/>;
    }

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <TheatreDetailsUIContextProvider>
                <QueryDataLoader query={query}>
                    {(data: TheatreDetailsViewData) => (
                        <TheatreDetailsPageContent
                            pageData={data}
                            screenPage={page}
                            screenPerPage={SCREENS_PER_PAGE}
                            setScreenPage={setPage}
                        />
                    )}
                </QueryDataLoader>
            </TheatreDetailsUIContextProvider>
        </QueryErrorBoundary>
    );
}