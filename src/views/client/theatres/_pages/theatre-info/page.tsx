/**
 * @fileoverview Client page for displaying theatre details and available screens with showings.
 */

import {ReactElement} from "react";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

import {useFetchTheatreInfoViewData} from "@/domains/theatres/_feat";
import {TheatreInfoPageContent} from "@/views/client/theatres/_pages/theatre-info/content.tsx";

/**
 * Theatre information page.
 */
export function TheatreInfoPage(): ReactElement {
    const {slug: theatreSlug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/theatres",
        errorMessage: "Invalid theatre.",
        sourceComponent: TheatreInfoPage.name,
    }) ?? {};

    const query = useFetchTheatreInfoViewData({
        theatreSlug: theatreSlug!,
        localDateString: "2026-02-12",
        queries: {limit: 3},
        options: {enabled: !!theatreSlug}
    });

    if (!theatreSlug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({theatre, screens}) => (
                <TheatreInfoPageContent theatre={theatre} screens={screens}/>
            )}
        </QueryDataLoader>
    );
}