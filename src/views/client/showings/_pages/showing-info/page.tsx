/**
 * @fileoverview Page component for displaying detailed information about a specific movie showing.
 */

import {ReactElement} from "react";
import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {PageLoader} from "@/views/common/_comp/page";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat";

import {ShowingInfoPageContent} from "@/views/client/showings/_pages/showing-info/content.tsx";
import {ShowingDetails, ShowingDetailsSchema, useFetchShowingBySlug} from "@/domains/showings";

/**
 * Entry point for the showing details view.
 */
export function ShowingInfoPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingInfoPage.name,
        errorTo: "/",
        errorMessage: "Invalid Showing identifier.",
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
                <ShowingInfoPageContent showing={showing}/>
            )}
        </QueryDataLoader>
    );
}