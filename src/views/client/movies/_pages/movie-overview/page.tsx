/**
 * @fileoverview Container coordinating data loading for the movie overview page.
 */

import {ReactElement} from "react";

import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {MovieInfoPageContent} from "@/views/client/movies/_pages/movie-overview/content.tsx";
import {MovieInfoOverviewViewData, useFetchMovieInfoOverviewViewData} from "@/domains/movies/_feat/client-view-data";
import {QueryDataLoader} from "@/views/common/_feat";

/** Loads data and renders the movie overview page. */
export function MovieInfoPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    const query = useFetchMovieInfoOverviewViewData({
        slug: slug!,
        queries: {reviewPage: 1, reviewPerPage: 3},
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({movie, credits, reviewDetails}: MovieInfoOverviewViewData) => {
                return (
                    <MovieInfoPageContent
                        movie={movie}
                        credits={credits}
                        reviewDetails={reviewDetails}
                    />
                );
            }}
        </QueryDataLoader>
    );
}

