/**
 * @file MovieInfoPage.tsx
 *
 * Page-level container for displaying detailed movie information.
 *
 * Responsibilities:
 * - Validates and extracts the `slug` route parameter
 * - Fetches movie details and associated credits in parallel
 * - Validates query results using Zod schemas
 * - Delegates rendering to `MovieInfoPageContent`
 *
 * Data loading is coordinated via `MultiQueryDataLoader` to ensure
 * consistent loading, error, and validation handling.
 */

import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import MovieInfoPageContent from "@/features/client/movies/movie-info/movie-info/MovieInfoPageContent.tsx";
import {useFetchMovieCredits} from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

/**
 * Shape of validated data returned from `MultiQueryDataLoader`.
 */
type QueryData = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
};

/**
 * Movie information page.
 *
 * Fetches:
 * - A single movie by slug
 * - All associated credit entries for that movie
 *
 * Redirects or suspends rendering if route parameters are invalid
 * or missing.
 */
const MovieInfoPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const movieQuery = useFetchMovieBySlug({
        slug,
        config: {virtuals: true, populate: true},
    });

    const creditQuery = useFetchMovieCredits({
        queries: {movieSlug: slug},
        config: {populate: true, virtuals: true},
    });

    const queryDefinitions: QueryDefinition[] = [
        {query: movieQuery, key: "movie", schema: MovieDetailsSchema},
        {query: creditQuery, key: "credits", schema: MovieCreditDetailsArraySchema},
    ];

    return (
        <MultiQueryDataLoader queries={queryDefinitions}>
            {(data) => {
                const {movie, credits} = data as QueryData;
                return (<MovieInfoPageContent movie={movie} credits={credits}/>);
            }}
        </MultiQueryDataLoader>
    );
};

export default MovieInfoPage;
