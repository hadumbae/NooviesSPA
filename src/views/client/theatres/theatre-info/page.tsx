/**
 * @fileoverview Client page for displaying theatre details and available screens with showings.
 */

import useFetchByIdentifierRouteParams
    from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {TheatreInfoPageContent} from "./content.tsx";
import {
    TheatreScreenSchedule, TheatreScreenScheduleSchema
} from "@/domains/theatre-screens/schema/model";
import MultiQueryDataLoader
    from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import {QueryDefinition}
    from "@/common/type/query/loader/MultiQuery.types.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";
import {TheatreDetails, TheatreDetailsSchema} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";
import {ReactElement} from "react";
import {useFetchScreensWithShowings} from "@/domains/theatre-screens/_feat/client-view-data";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

/** Props for the TheatreInfoPage component. */
type QueryData = {
    theatre: TheatreDetails;
    screens: TheatreScreenSchedule[];
};

/**
 * Theatre information page.
 */
export function TheatreInfoPage(): ReactElement {
    const {slug: theatreSlug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/theatres",
        errorMessage: "Invalid theatre.",
        sourceComponent: TheatreInfoPage.name,
    }) ?? {};

    if (!theatreSlug) {
        return <PageLoader/>;
    }

    const theatreQuery = useFetchTheatreBySlug({
        schema: TheatreDetailsSchema,
        slug: theatreSlug,
        config: {populate: true, virtuals: true},
    });

    const screenQuery = useFetchScreensWithShowings({
        theatreID: theatreSlug,
        dateString: "2026-02-12",
    });

    const queries: QueryDefinition[] = [
        {key: "theatre", query: theatreQuery, schema: TheatreDetailsSchema},
        {key: "screens", query: screenQuery, schema: generateArraySchema(TheatreScreenScheduleSchema)},
    ];

    return (
        <MultiQueryDataLoader queries={queries}>
            {(data) => {
                const {theatre, screens} = data as QueryData;

                return (
                    <TheatreInfoPageContent
                        theatre={theatre}
                        screens={screens}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
}