/**
 * @fileoverview Admin page for fetching and rendering showing details and associated seat maps.
 */

import {FC} from "react";
import {PageLoader} from "@/views/common/_comp/page";
import {ShowingDetailsPageContent} from "@/views/admin/showings/_pages/details-page/content.tsx";
import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {
    ShowingDetailsViewDataSchema,
    useFetchShowingDetailsViewData
} from "@/views/admin/showings/_feat/admin-view-data";
import {ShowingDetailsUIContextProvider} from "@/domains/showings/_ctx/showing-details-ui-context/provider.tsx";

/**
 * Entry point for the Showing Details admin page.
 * Validates route parameters and orchestrates parallel data fetching for showings and seating.
 */
export const ShowingDetailsPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/showings",
        errorMessage: "Invalid showing. Please try again later.",
        sourceComponent: ShowingDetailsPage.name,
    }) ?? {};

    const query = useFetchShowingDetailsViewData({
        slug: slug!,
        schema: ShowingDetailsViewDataSchema,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({showing, seating, theatre, screen, movie}) => (
                <ShowingDetailsUIContextProvider>
                    <ShowingDetailsPageContent
                        showing={showing}
                        seating={seating}
                        theatre={theatre}
                        screen={screen}
                        movie={movie}
                    />
                </ShowingDetailsUIContextProvider>
            )}
        </QueryDataLoader>
    );
}


