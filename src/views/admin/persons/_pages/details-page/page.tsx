/**
 * @fileoverview Page component for displaying detailed information about a person in the admin dashboard.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {PersonDetailsUIProvider} from "@/domains/persons/_ctx/PersonDetailsUIProvider.tsx";
import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {PersonDetailsPageContent} from "@/views/admin/persons/_pages/details-page/content.tsx";
import {PersonDetailsViewData, useFetchPersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data";

/**
 * Renders the person's detailed profile page using route parameters to fetch biographical and filmography data.
 */
export function PersonDetailsPage(): ReactElement {
    const routeParams = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: PersonDetailsPage.name,
        errorTo: "/admin/persons",
        errorMessage: "Invalid Person Identifier."
    });

    const query = useFetchPersonDetailsViewData({
        slug: routeParams!.slug,
        limit: 5,
        options: {enabled: !!routeParams?.slug},
    });

    if (!routeParams?.slug) {
        return <PageLoader/>;
    }

    return (
        <PersonDetailsUIProvider>
            <QueryDataLoader query={query}>
                {({person, stats, filmography}: PersonDetailsViewData) => (
                    <PersonDetailsPageContent
                        person={person}
                        creditCount={stats.creditCount}
                        movieCount={stats.movieCount}
                        filmography={filmography}
                    />
                )}
            </QueryDataLoader>
        </PersonDetailsUIProvider>
    );
}