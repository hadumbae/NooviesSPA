/**
 * @fileoverview Administrative page for creating a new showing under a specific theatre.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {TheatreShowingCreatePageContent}
    from "@/views/admin/theatres/theatre-showings-create/content.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {Theatre, TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";

/**
 * Page component that resolves theatre route parameters and initializes the showing creation flow.
 */
export function TheatreShowingCreatePage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreShowingCreatePage.name,
    }) ?? {};

    const query = useFetchTheatreBySlug({
        schema: TheatreSchema,
        slug: slug!,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <QueryDataLoader query={query}>
                {(theatre: Theatre) => <TheatreShowingCreatePageContent theatre={theatre}/>}
            </QueryDataLoader>
        </QueryErrorBoundary>
    );
}