/**
 * @fileoverview Page component for displaying detailed information about a specific movie showing.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import ShowingInfoPageContent from "@/views/client/showings/showing-info/ShowingInfoPageContent.tsx";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchShowingBySlug} from "@/domains/showings/_feat/crud-hooks";

/**
 * Entry point for the showing details view.
 */
export const ShowingInfoPage = () => {
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