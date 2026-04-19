/**
 * @fileoverview Route-level page for displaying detailed information about a single Person.
 * Orchestrates data fetching for biographical details and grouped movie credits.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import PersonDetailsUIProvider from "@/domains/persons/context/PersonDetailsUIProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {PersonDetailsPageContent} from "@/views/admin/persons/details-page/content.tsx";
import {PersonDetailsViewData, useFetchPersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data";

/**
 * Page component for rendering a person's detailed profile.
 */
export function PersonDetailsPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: PersonDetailsPage.name,
        errorTo: "/admin/persons",
        errorMessage: "Invalid Person Identifier."
    }) ?? {};

    const query = useFetchPersonDetailsViewData({
        slug: slug!,
        limit: 5,
        options: {enabled: !!slug},
    });

    if (!slug) {
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