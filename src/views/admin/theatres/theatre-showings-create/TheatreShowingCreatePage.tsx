/**
 * @file TheatreShowingCreatePage.tsx
 *
 * @summary
 * Admin page for creating a new showing under a specific theatre.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {TheatreSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {Theatre} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import TheatreShowingCreatePageContent
    from "@/views/admin/theatres/theatre-showings-create/TheatreShowingCreatePageContent.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";

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
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreShowingCreatePage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchTheatreBySlug({slug, schema: TheatreSchema});

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <ValidatedDataLoader query={query} schema={TheatreSchema}>
                {(theatre: Theatre) => <TheatreShowingCreatePageContent theatre={theatre}/>}
            </ValidatedDataLoader>
        </QueryErrorBoundary>
    );
};

export default TheatreShowingCreatePage;
