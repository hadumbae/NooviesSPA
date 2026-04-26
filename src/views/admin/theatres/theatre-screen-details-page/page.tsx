/**
 * @fileoverview Main entry component for the Theatre Screen details administration page.
 */

import {PageLoader} from "@/views/common/_comp/page";
import {TheatreScreenDetailsPageContent} from "@/views/admin/theatres/theatre-screen-details-page/content.tsx";
import {ReactElement} from "react";
import ScreenDetailsUIContextProvider
    from "@/domains/theatre-screens/contexts/screen-details/ScreenDetailsUIContextProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {
    TheatreScreenDetailsRouteParamSchema, TheatreScreenDetailsViewData,
    useFetchTheatreScreenDetailsViewData
} from "@/domains/theatre-screens/_feat/admin-view-data";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Orchestrates route parameter validation and data fetching for the screen details view.
 */
export function TheatreScreenDetailsPage(): ReactElement {
    const routeParams = useFetchByIdentifierRouteParams({
        schema: TheatreScreenDetailsRouteParamSchema,
        errorTo: "admin/theatres",
        errorMessage: "Failed to parse theatre and screen route parameters.",
        sourceComponent: TheatreScreenDetailsPage.name,
    });

    const query = useFetchTheatreScreenDetailsViewData({
        slugs: routeParams!,
        options: {enabled: !!routeParams},
    });

    if (!routeParams) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({theatre, screen, seats}: TheatreScreenDetailsViewData) => (
                <ScreenDetailsUIContextProvider>
                    <TheatreScreenDetailsPageContent
                        theatre={theatre}
                        screen={screen}
                        seats={seats}
                    />
                </ScreenDetailsUIContextProvider>
            )}
        </QueryDataLoader>
    );
}