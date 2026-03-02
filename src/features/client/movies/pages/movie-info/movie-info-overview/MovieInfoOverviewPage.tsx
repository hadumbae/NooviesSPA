/**
 * @file Movie info overview page container.
 * MovieInfoPage.tsx
 */

import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import MovieInfoOverviewPageContent
    from "@/features/client/movies/pages/movie-info/movie-info-overview/MovieInfoOverviewPageContent.tsx";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {ReviewDetailsByMovie} from "@/pages/review/schemas/models/ReviewDetailsByMovieSchema.ts";
import {
    useMovieInfoOverviewPageQueries
} from "@/pages/movies/hooks/pages/client/movie-info-overview/useMovieInfoOverviewPageQueries.ts";

/**
 * Validated query result shape.
 */
type QueryData = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
    reviewDetails: ReviewDetailsByMovie;
};

/**
 * Coordinates overview page data loading.
 */
const MovieInfoOverviewPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const queryDefinitions: QueryDefinition[] = useMovieInfoOverviewPageQueries({slug});

    return (
        <MultiQueryDataLoader queries={queryDefinitions}>
            {(data) => {
                const {movie, credits, reviewDetails} = data as QueryData;

                return (
                    <MovieInfoOverviewPageContent
                        movie={movie}
                        credits={credits}
                        reviewDetails={reviewDetails}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
};

export default MovieInfoOverviewPage;