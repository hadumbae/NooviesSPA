/**
 * @file TheatreDetailsPage.tsx
 * Page for displaying full details of a single theatre.
 */

import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchTheatre from "@/pages/theatres/hooks/query/useFetchTheatre.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import TheatreDetailsPageContent from "@/pages/theatres/pages/theatre-details-page/TheatreDetailsPageContent.tsx";
import TheatreDetailsUIContextProvider from "@/pages/theatres/providers/TheatreDetailsUIContextProvider.tsx";
import useFetchIDRouteParams from "@/common/hooks/route-params/useFetchIDRouteParams.ts";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";

/**
 * **Component: TheatreDetailsPage**
 * Renders complete details for a single theatre.
 *
 * **Behaviour**
 * - Extracts `theatreID` from route params (validated)
 * - Redirects to index page on route parse failure
 * - Fetches theatre details with population + virtual fields
 *
 * **Query Safety**
 * - Uses {@link QueryBoundary} for async state handling
 * - Uses {@link ValidatedQueryBoundary} to enforce {@link TheatreDetailsSchema}
 *
 * **Render Flow**
 * - If theatreID missing → shows loader
 * - Validated result → passes theatre to {@link TheatreDetailsPageContent}
 *
 * **Example**
 * ```tsx
 * <TheatreDetailsPage />
 * ```
 *
 * @component
 */
const TheatreDetailsPage: FC = () => {
    // --- Fetch Route Params ---
    const {_id: theatreID} = useFetchIDRouteParams({
        schema: IDRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreDetailsPage.name,
    }) ?? {};

    if (!theatreID) {
        return <PageLoader />;
    }

    // --- Query ---
    const query = useFetchTheatre({
        _id: theatreID,
        populate: true,
        virtuals: true,
    });

    // --- Render ---
    return (
        <TheatreDetailsUIContextProvider>
            <QueryBoundary query={query}>
                <ValidatedQueryBoundary
                    query={query}
                    schema={TheatreDetailsSchema}
                    message="Invalid theatre data."
                >
                    {(theatre: TheatreDetails) => (
                        <TheatreDetailsPageContent theatre={theatre} />
                    )}
                </ValidatedQueryBoundary>
            </QueryBoundary>
        </TheatreDetailsUIContextProvider>
    );
};

export default TheatreDetailsPage;
