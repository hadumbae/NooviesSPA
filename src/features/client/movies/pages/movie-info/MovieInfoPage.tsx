/**
 * @file Container coordinating data loading for the movie overview page.
 *
 * MovieInfoPage.tsx
 */

import { FC } from "react";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import { SlugRouteParamSchema } from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import MovieInfoPageContent
    from "@/features/client/movies/pages/movie-info/MovieInfoPageContent.tsx";
import { QueryDefinition } from "@/common/type/query/loader/MultiQuery.types.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import { MovieCreditDetails } from "@/pages/moviecredit/schemas/model/movie-credit-schema/MovieCredit.types.ts";
import { ReviewDetailsByMovie } from "@/pages/review/schemas/models/ReviewDetailsByMovieSchema.ts";
import {
    useMovieInfoOverviewPageQueries
} from "@/pages/movies/hooks/pages/client/movie-info-overview/useMovieInfoOverviewPageQueries.ts";

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
    reviewDetails: ReviewDetailsByMovie;
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