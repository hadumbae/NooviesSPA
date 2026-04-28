/**
 * @file Container coordinating data loading for the movie overview page.
 *
 * MovieInfoPage.tsx
 */

import { FC } from "react";

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import { SlugRouteParamSchema } from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import MovieInfoPageContent
    from "@/views/client/movies/pages/movie-info/MovieInfoPageContent.tsx";
import { QueryDefinition } from "@/common/type/query/loader/MultiQuery.types.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import { MovieReviewViewData } from "@/domains/review/schemas/models/MovieReviewViewDataSchema.ts";
import {
    useMovieInfoOverviewPageQueries
} from "@/domains/movies/_feat/client-view-data/useMovieInfoOverviewPageQueries.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";

/**
 * Aggregated query result shape for the overview page.
 */
type QueryData = {
    /**
     * Movie details.
     */
    movie: MovieDetails;

    /**
     * Associated credits.
     */
    credits: MovieCreditDetails[];

    /**
     * Review summary data.
     */
    reviewDetails: MovieReviewViewData;
};

/**
 * Loads data and renders the movie overview page.
 */
const MovieInfoPage: FC = () => {
    const { slug } = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    const queryDefinitions: QueryDefinition[] =
        useMovieInfoOverviewPageQueries({ slug });

    return (
        <MultiQueryDataLoader queries={queryDefinitions}>
            {(data) => {
                const { movie, credits, reviewDetails } =
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
};

export default MovieInfoPage;