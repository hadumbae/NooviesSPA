import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";

const MovieInfoPage: FC = () => {
    // --- Route Params ---
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    // --- Query ---
    const query = useFetchMovieBySlug({
        slug,
        queryConfig: {virtuals: true, populate: true},
    });

    // --- RENDER ---
    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={MovieDetailsSchema}>
                {(movie: MovieDetails) => {
                    const {_id: movieID, title, originalTitle} = movie;

                    return (
                      <PageFlexWrapper>
                          ID: {movieID}
                          Title: {title}
                          Original Title: {originalTitle}
                      </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieInfoPage;
