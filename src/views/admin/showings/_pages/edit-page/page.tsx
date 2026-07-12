/**
 * @fileoverview Admin page for editing an existing Showing.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";

import {ShowingDetails, ShowingDetailsSchema, useFetchShowingBySlug} from "@/domains/showings";
import {ShowingEditPageContent} from "@/views/admin/showings/_pages/edit-page/content.tsx";

/**
 * Page component for editing a Showing.
 */
export function ShowingEditPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingEditPage.name,
        errorTo: "/admin/showings",
        errorMessage: "Failed to resolve route parameters.",
    }) ?? {};

    const query = useFetchShowingBySlug({
        slug: slug!,
        config: {populate: true, virtuals: true},
        schema: ShowingDetailsSchema,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(showing: ShowingDetails) => (
                <ShowingEditPageContent showing={showing}/>
            )}
        </QueryDataLoader>
    );
}


