/**
 * @file TheatreShowingListPage.tsx
 *
 * @summary
 * Admin page for listing paginated showings under a specific theatre.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {Theatre} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import TheatreShowingListPageContent from "@/pages/theatres/pages/theatre-showings/TheatreShowingListPageContent.tsx";
import {PaginatedShowingDetails} from "@/pages/showings/schema/showing/ShowingRelated.types.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useTheatreShowingListPageQueries from "@/pages/theatres/hooks/pages/showing-list-page/useTheatreShowingListPageQueries.ts";

const SHOWINGS_PER_PAGE = 10;

/**
 * Combined query data shape for the page.
 */
type QueryData = {
    theatre: Theatre;
    paginatedShowings: PaginatedShowingDetails;
};

/**
 * Page component for displaying a paginated list of showings for a theatre.
 *
 * Responsibilities:
 * - Resolve and validate theatre ID from route params
 * - Manage pagination via search params
 * - Fetch and validate theatre and showing data
 * - Delegate rendering to the page content component
 *
 * @returns Theatre showing list page
 */
const TheatreShowingListPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        errorTo: "/admin/theatres",
        schema: SlugRouteParamSchema,
        sourceComponent: TheatreShowingListPage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const queries = useTheatreShowingListPageQueries({
        theatre: {slug},
        showing: {page, perPage: SHOWINGS_PER_PAGE}
    });

    return (
        <MultiQueryDataLoader queries={queries}>
            {(data: unknown) => {
                const {theatre, paginatedShowings: {totalItems, items: showings}} = data as QueryData;

                return (
                    <TheatreShowingListPageContent
                        theatre={theatre}
                        totalShowings={totalItems}
                        showings={showings}
                        page={page}
                        perPage={SHOWINGS_PER_PAGE}
                        setPage={setPage}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
};

export default TheatreShowingListPage;