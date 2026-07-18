/**
 * @fileoverview Administrative page for creating a new showing under a specific theatre.
 */

import {ReactElement} from "react";
import {PageLoader} from "@/views/common/_comp/page";
import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {
    QueryErrorBoundary
} from "@/views/common/_feat/error-boundary/query-error-fallback/boundary/QueryErrorBoundary.tsx";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/common/_feat";

import {Theatre, TheatreHttpStatusOverrideText, TheatreSchema} from "@/domains/theatres";
import {TheatreShowingCreatePageContent} from "@/views/admin/theatres/_pages/theatre-showings-create/content.tsx";

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