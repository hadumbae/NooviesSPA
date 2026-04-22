/**
 * @file TheatreInfoPage.tsx
 *
 * Client page for displaying theatre details and available screens with showings.
 *
 * Responsibilities:
 * - Validate theatre slug from route params
 * - Fetch theatre details and screens-with-showings
 * - Coordinate multi-query loading and schema validation
 * - Delegate rendering to {@link TheatreInfoPageContent}
 */

import useFetchByIdentifierRouteParams
    from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {useFetchScreensWithShowings}
    from "@/domains/theatre-screens/hooks/browse/useFetchScreensWithShowings.ts";
import {TheatreDetailsSchema}
    from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import TheatreInfoPageContent
    from "@/domains/theatres/pages/client/theatre-info/TheatreInfoPageContent.tsx";
import {
    ScreenWithShowings
} from "@/domains/theatre-screens/schema/model/ScreenWithShowingsSchema.ts";
import MultiQueryDataLoader
    from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import {QueryDefinition}
    from "@/common/type/query/loader/MultiQuery.types.ts";
import {TheatreDetails}
    from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {ScreenWithShowingsArraySchema} from "@/domains/theatre-screens/schema/model/ScreenWithShowingsArraySchema.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";

/**
 * Combined query payload for {@link TheatreInfoPage}.
 */
type QueryData = {
    /** Populated theatre details */
    theatre: TheatreDetails;
    /** Screens with associated showings */
    screens: ScreenWithShowings[];
};

/**
 * Theatre information page.
 *
 * Orchestrates route validation, data fetching, and loading states
 * before rendering the theatre overview and screen selection UI.
 */
const TheatreInfoPage = () => {
    // --- SLUG ---
    const {slug: theatreSlug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/theatres",
        errorMessage: "Invalid theatre.",
        sourceComponent: TheatreInfoPage.name,
    }) ?? {};

    if (!theatreSlug) {
        return <PageLoader/>;
    }

    // --- QUERIES ---
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
        {key: "screens", query: screenQuery, schema: ScreenWithShowingsArraySchema},
    ];

    // --- RENDER ---
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
};

export default TheatreInfoPage;
