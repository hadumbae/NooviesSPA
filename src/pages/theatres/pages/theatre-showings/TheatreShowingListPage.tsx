/**
 * @file TheatreShowingListPage.tsx
 *
 * @summary
 * Admin page for listing paginated showings under a specific theatre.
 */

import useFetchIDRouteParams from "@/common/hooks/route-params/useFetchIDRouteParams.ts";
import { IDRouteParamSchema } from "@/common/schema/route-params/IDRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchTheatre from "@/pages/theatres/hooks/query/useFetchTheatre.ts";
import useFetchPaginatedShowings from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import { CombinedSchemaQuery } from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { PaginatedShowingDetailsSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import { PaginatedShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import TheatreShowingListPageContent from "@/pages/theatres/pages/theatre-showings/TheatreShowingListPageContent.tsx";

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
    // --- Route Params ---
    const { _id: theatreID } = useFetchIDRouteParams({
        errorTo: "/admin/theatres",
        schema: IDRouteParamSchema,
        sourceComponent: TheatreShowingListPage.name,
    }) ?? {};

    if (!theatreID) {
        return <PageLoader />;
    }

    // --- Search Params ---
    const { page, perPage, setPage } = usePaginationSearchParams();

    // --- Queries ---
    const theatreQuery = useFetchTheatre({ _id: theatreID });

    const showingQuery = useFetchPaginatedShowings({
        page,
        perPage,
        requestOptions: { populate: true, virtuals: true },
        queries: { theatre: theatreID },
    });

    const queries = [theatreQuery, showingQuery];
    const queryValidation: CombinedSchemaQuery[] = [
        { key: "theatre", query: theatreQuery, schema: TheatreSchema },
        {
            key: "paginatedShowings",
            query: showingQuery,
            schema: PaginatedShowingDetailsSchema,
        },
    ];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={queryValidation}>
                {(data: unknown) => {
                    const {
                        theatre,
                        paginatedShowings: { totalItems, items: showings },
                    } = data as QueryData;

                    return (
                        <TheatreShowingListPageContent
                            theatre={theatre}
                            totalShowings={totalItems}
                            showings={showings}
                            page={page}
                            perPage={perPage}
                            setPage={setPage}
                        />
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default TheatreShowingListPage;
