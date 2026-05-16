/**
 * @fileoverview Container coordinating data loading for the movie overview page.
 *
 */

import {ReactElement} from "react";

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import {
    useMovieInfoOverviewPageQueries
} from "@/domains/movies/_feat/client-view-data/useMovieInfoOverviewPageQueries.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {MovieCreditDetails} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {MovieInfoPageContent} from "@/views/client/movies/pages/movie-info/content.tsx";
import {MovieReviewSummaryData} from "@/domains/review/schemas/models";

/** Aggregated query result shape for the overview page. */
type QueryData = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
    reviewDetails: MovieReviewSummaryData;
};

/** Loads data and renders the movie overview page. */
export function MovieInfoPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const queryDefinitions: QueryDefinition[] =
        useMovieInfoOverviewPageQueries({slug});

    return (
        <MultiQueryDataLoader queries={queryDefinitions}>
            {(data) => {
                const {movie, credits, reviewDetails} =
                    data as QueryData;

                return (
                    <MovieInfoPageContent
                        movie={movie}
                        credits={credits}
                        reviewDetails={reviewDetails}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
}

