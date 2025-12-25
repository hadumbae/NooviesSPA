import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import MovieEditPageContent from "@/pages/movies/pages/admin/movie-edit-page/MovieEditPageContent.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";

/**
 * Admin movie edit page.
 *
 * Resolves route params, fetches the movie by slug,
 * validates the response, and renders the edit UI.
 */
const MovieEditPage: FC = () => {
    // --- ROUTE PARAMS ---
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    // --- QUERY ---
    const query = useFetchMovieBySlug({
        slug,
        queryConfig: {populate: false, virtuals: false},
    });

    // --- RENDER ---
    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={MovieSchema}>
                {(movie: Movie) => (
                    <MovieEditPageContent movie={movie}/>
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieEditPage;
