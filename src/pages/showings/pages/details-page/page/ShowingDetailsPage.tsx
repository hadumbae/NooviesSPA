/**
 * @file ShowingDetailsPage.tsx
 *
 * @description
 * Admin page responsible for fetching, validating, and rendering
 * the Showing Details view.
 *
 * This page:
 * - Reads the showing ID from the route parameters
 * - Fetches the showing and its associated seat maps
 * - Combines multiple queries into a single loading and error boundary
 * - Validates query results against Zod schemas
 * - Provides validated data via {@link ShowingDetailsPageContextProvider}
 *
 * The actual UI rendering is delegated to
 * {@link ShowingDetailsPageContent}.
 */

import {FC} from "react";
import useFetchSeatMaps from "@/pages/seatmap/hooks/queries/useFetchSeatMaps.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {SeatMapDetailsArraySchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import ShowingDetailsPageContent from "@/pages/showings/pages/details-page/page/ShowingDetailsPageContent.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchShowingBySlug from "@/pages/showings/hooks/queries/useFetchShowingBySlug.ts";
import ShowingDetailsPageContextProvider
    from "@/pages/showings/context/showing-details-page-context/ShowingDetailsPageContextProvider.tsx";

/**
 * Shape of validated query data passed to the page context.
 */
type QueryData = {
    showing: ShowingDetails;
    seating: SeatMapDetails[];
};

/**
 * @component ShowingDetailsPage
 *
 * @description
 * Entry point for the Showing Details admin page.
 *
 * Handles:
 * - Route parameter validation
 * - Parallel data fetching
 * - Query loading and error boundaries
 * - Schema validation of API responses
 * - Context provisioning for child components
 *
 * @remarks
 * If route parameters are not yet available or invalid,
 * a {@link PageLoader} is rendered until resolution.
 */
const ShowingDetailsPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/showings",
        errorMessage: "Invalid showing. Please try again later.",
        sourceComponent: ShowingDetailsPage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const showingQuery = useFetchShowingBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    const seatingQuery = useFetchSeatMaps({
        queries: {showingSlug: slug},
        config: {populate: true, virtuals: true},
    });

    const queries = [showingQuery, seatingQuery];

    const validatedQueries: CombinedSchemaQuery[] = [
        {query: showingQuery, schema: ShowingDetailsSchema, key: "showing"},
        {query: seatingQuery, schema: SeatMapDetailsArraySchema, key: "seating"},
    ];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={validatedQueries}>
                {(data) => {
                    const {showing, seating} = data as QueryData;

                    return (
                        <ShowingDetailsPageContextProvider
                            showing={showing}
                            seating={seating}
                        >
                            <ShowingDetailsPageContent/>
                        </ShowingDetailsPageContextProvider>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default ShowingDetailsPage;
