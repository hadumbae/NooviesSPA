import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchIDRouteParams from "@/common/hooks/route-params/useFetchIDRouteParams.ts";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

const MovieInfoPage: FC = () => {
    // --- Route Params ---
    const {_id} = useFetchIDRouteParams({
        schema: IDRouteParamSchema,
        errorTo: "/browse/movies",
    }) ?? {};

    if (!_id) {
        return <PageLoader />;
    }

    // --- Query ---
    const query = useFetchMovie({
        _id,
        virtuals: true,
        populate: true,
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
