/**
 * @fileoverview Administrative page for displaying and managing the details of a specific theatre.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {TheatreDetailsPageContent} from "@/views/admin/theatres/theatre-details-page/content.tsx";
import TheatreDetailsUIContextProvider
    from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIContextProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Entry point for the Theatre Details view that handles route parameter validation and data fetching.
 * Requires a slug parameter from the route and provides TheatreDetailsUIContextProvider to its children.
 */
export function TheatreDetailsPage(): ReactElement {
    const routeParams = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreDetailsPage.name,
    });

    const query = useFetchTheatreBySlug({
        slug: routeParams?.slug!,
        schema: TheatreDetailsSchema,
        config: {populate: true, virtuals: true},
        options: {enabled: !!routeParams?.slug},
    });

    if (!routeParams?.slug) {
        return <PageLoader/>;
    }

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <TheatreDetailsUIContextProvider>
                <QueryDataLoader query={query}>
                    {(theatre: TheatreDetails) => <TheatreDetailsPageContent theatre={theatre}/>}
                </QueryDataLoader>
            </TheatreDetailsUIContextProvider>
        </QueryErrorBoundary>
    );
}