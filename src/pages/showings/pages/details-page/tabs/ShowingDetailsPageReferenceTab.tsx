/**
 * @file ShowingDetailsPageReferenceTab.tsx
 *
 * @description
 * Reference tab for the Showing Details page.
 *
 * Fetches and displays contextual reference information for:
 * - The associated theatre
 * - The associated screen
 *
 * This component coordinates multiple queries and validates their results
 * against schemas before rendering summary cards.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchTheatre from "@/pages/theatres/hooks/fetch-theatre/useFetchTheatre.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import TheatreSummaryCard from "@/pages/showings/components/admin/card/showing-reference-cards/TheatreSummaryCard.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import ScreenSummaryCard from "@/pages/showings/components/admin/card/showing-reference-cards/ScreenSummaryCard.tsx";

/**
 * Props for {@link ShowingDetailsPageReferenceTab}.
 */
type TabProps = {
    /** ID of the screen being referenced */
    screenID: ObjectId;

    /** ID of the theatre being referenced */
    theatreID: ObjectId;
};

/**
 * Combined validated query result shape.
 */
type QueryData = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
};

/**
 * Displays validated theatre and screen reference data for a showing.
 *
 * @param props - {@link TabProps}
 * @returns A reference tab containing theatre and screen summary cards
 */
const ShowingDetailsPageReferenceTab = ({screenID, theatreID}: TabProps) => {
    // --- Queries ---
    const theatreQuery = useFetchTheatre({_id: theatreID, populate: true, virtuals: true});
    const screenQuery = useFetchScreen({_id: screenID, populate: true, virtuals: true});

    const queries = [theatreQuery, screenQuery];

    const queryValidation: CombinedSchemaQuery[] = [
        {query: theatreQuery, key: "theatre", schema: TheatreDetailsSchema},
        {query: screenQuery, key: "screen", schema: ScreenDetailsSchema},
    ];

    // --- Render ---
    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={queryValidation}>
                {(data: unknown) => {
                    const {theatre, screen} = data as QueryData;

                    return (
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <PrimaryHeaderText>Theatre</PrimaryHeaderText>
                                <TheatreSummaryCard theatre={theatre}/>
                            </div>

                            <div className="space-y-1">
                                <PrimaryHeaderText>Screen</PrimaryHeaderText>
                                <ScreenSummaryCard screen={screen}/>
                            </div>
                        </div>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default ShowingDetailsPageReferenceTab;
