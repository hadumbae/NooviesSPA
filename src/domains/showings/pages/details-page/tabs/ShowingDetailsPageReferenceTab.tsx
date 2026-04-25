/**
 * @fileoverview Reference tab for the Showing Details page.
 * Coordinates fetching and validation of theatre and screen context.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchTheatre from "@/domains/theatres/hooks/fetch-theatre/useFetchTheatre.ts";
import {useFetchScreen} from "@/domains/theatre-screens/_feat/crud-hooks";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import TheatreSummaryCard
    from "@/domains/showings/components/admin/card/showing-reference-cards/TheatreSummaryCard.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import ScreenSummaryCard from "@/domains/showings/components/admin/card/showing-reference-cards/ScreenSummaryCard.tsx";
import {
    TheatreScreenDetails,
    TheatreScreenDetailsSchema
} from "@/domains/theatre-screens/schema/model/TheatreScreenDetailsSchema.ts";

/** Props for the ShowingDetailsPageReferenceTab component. */
type TabProps = {
    screenID: ObjectId;
    theatreID: ObjectId;
};

/** Aggregated validated query data. */
type QueryData = {
    theatre: TheatreDetails;
    screen: TheatreScreenDetails;
};

/**
 * Tab content that displays summary cards for the associated theatre and screen.
 */
const ShowingDetailsPageReferenceTab = ({screenID, theatreID}: TabProps) => {
    const theatreQuery = useFetchTheatre({
        _id: theatreID,
        config: {populate: true, virtuals: true},
    });

    const screenQuery = useFetchScreen({
        schema: TheatreScreenDetailsSchema,
        _id: screenID,
        config: {populate: true, virtuals: true}
    });

    const queries = [theatreQuery, screenQuery];

    const queryValidation: CombinedSchemaQuery[] = [
        {query: theatreQuery, key: "theatre", schema: TheatreDetailsSchema},
        {query: screenQuery, key: "screen", schema: TheatreScreenDetailsSchema},
    ];

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