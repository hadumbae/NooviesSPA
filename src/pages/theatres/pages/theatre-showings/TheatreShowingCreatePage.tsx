/**
 * @file TheatreShowingCreatePage.tsx
 *
 * @summary
 * Admin page for creating a new showing under a specific theatre.
 */

import useFetchIDRouteParams from "@/common/hooks/route-params/useFetchIDRouteParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import { IDRouteParamSchema } from "@/common/schema/route-params/IDRouteParamSchema.ts";
import useFetchTheatre from "@/pages/theatres/hooks/fetch-theatre/useFetchTheatre.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import TheatreShowingCreatePageContent
    from "@/pages/theatres/pages/theatre-showings/TheatreShowingCreatePageContent.tsx";

/**
 * Page component for creating a new showing for a theatre.
 *
 * Responsibilities:
 * - Resolve and validate theatre ID from route params
 * - Fetch and validate theatre data
 * - Delegate rendering to the page content component
 *
 * @returns Theatre showing creation page
 */
const TheatreShowingCreatePage = () => {
    // --- Route Params ---
    const { _id } = useFetchIDRouteParams({
        schema: IDRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreShowingCreatePage.name,
    }) ?? {};

    if (!_id) return <PageLoader />;

    // --- Query ---
    const query = useFetchTheatre({ _id });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={TheatreSchema}>
                {(theatre: Theatre) => (
                    <TheatreShowingCreatePageContent theatre={theatre} />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreShowingCreatePage;
