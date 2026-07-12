/**
 * @fileoverview Page component that displays the full cast and crew credits for a specific movie.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {MovieInfoCreditsPageContent} from "@/views/client/movies/_pages/movie-credits/content.tsx";
import {useFetchMovieInfoCreditsData} from "@/domains/movies/_feat/client-view-data/hooks/useFetchMovieInfoCreditsData.ts";
import {MovieInfoCreditViewData} from "@/domains/movies/_feat/client-view-data";
import { ReactElement } from "react";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";

/**
 * Fetches and renders the movie credits page based on the URL slug.
 */
export function MovieInfoCreditsPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to identify movie. Please try again.",
    }) || {};

    const query = useFetchMovieInfoCreditsData({
        slug: slug!,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({movie, creditDetails: {castCredits, crewCredits}}: MovieInfoCreditViewData) => (
                <MovieInfoCreditsPageContent
                    movie={movie}
                    castCredits={castCredits}
                    crewCredits={crewCredits}
                />
            )}
        </QueryDataLoader>
    );
}
