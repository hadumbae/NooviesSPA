/**
 * @fileoverview Administrative page for displaying and managing the details of a specific theatre.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {TheatreDetailsPageContent} from "@/views/admin/theatres/theatre-details-page/content.tsx";
import TheatreDetailsUIContextProvider
    from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIContextProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {TheatreDetailsViewData, useFetchTheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data";
import {useParsedPaginationValue} from "@/common/features/fetch-pagination-search-params";

const SCREENS_PER_PAGE = 25;
const SHOWINGS_LIMIT = 10;

/**
 * Entry point for the Theatre Details view that handles route parameter validation and data fetching.
 * Requires a slug route parameter and provides TheatreDetailsUIContextProvider to its children.
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
                    {({theatre, screens, showings}: TheatreDetailsViewData) => (
                        <TheatreDetailsPageContent
                            theatre={theatre}
                            screens={screens}
                            showings={showings}
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