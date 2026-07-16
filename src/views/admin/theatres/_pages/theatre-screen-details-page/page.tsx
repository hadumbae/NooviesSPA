/**
 * @fileoverview Main entry component for the Theatre Screen details administration page.
 */

import {ReactElement} from "react";
import {PageLoader} from "@/views/common/_comp/page";
import {useFetchByIdentifierRouteParams} from "@/common/_feat";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {TheatreScreenDetailsPageContent} from "@/views/admin/theatres/_pages/theatre-screen-details-page/content.tsx";
import {
    ScreenDetailsUIContextProvider,
    TheatreScreenDetailsRouteParamSchema,
    TheatreScreenDetailsViewData,
    useFetchTheatreScreenDetailsViewData
} from "@/domains/theatre-screens";

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