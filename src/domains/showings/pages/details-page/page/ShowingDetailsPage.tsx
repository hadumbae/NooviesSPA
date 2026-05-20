/**
 * @fileoverview Admin page for fetching and rendering showing details and associated seat maps.
 */

import {FC} from "react";
import useFetchSeatMaps from "@/domains/seatmap/hooks/queries/useFetchSeatMaps.ts";
import {PageLoader} from "@/views/common/_comp/page";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {SeatMapDetailsArraySchema} from "@/domains/seatmap/schema/model/SeatMap.schema.ts";
import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import ShowingDetailsPageContent from "@/domains/showings/pages/details-page/page/ShowingDetailsPageContent.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import ShowingDetailsPageContextProvider
    from "@/domains/showings/context/showing-details-page-context/ShowingDetailsPageContextProvider.tsx";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {useFetchShowingBySlug} from "@/domains/showings/_feat/crud-hooks";

/** Validated query data provided to the page context. */
type QueryData = {
    showing: ShowingDetails;
    seating: SeatMapDetails[];
};

/**
 * Entry point for the Showing Details admin page.
 * Validates route parameters and orchestrates parallel data fetching for showings and seating.
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
        schema: ShowingDetailsSchema,
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
