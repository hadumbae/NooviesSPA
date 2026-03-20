import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import MovieEditPageContent from "@/views/admin/movies/pages/edit-page/MovieEditPageContent.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import useFetchMovieBySlug from "@/domains/movies/hooks/queries/useFetchMovieBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Admin movie edit page.
 *
 * Resolves route params, fetches the movie by slug,
 * validates the response, and renders the edit UI.
 */
const MovieEditPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchMovieBySlug({
        slug,
        config: {populate: false, virtuals: false},
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieSchema}>
            {(movie: Movie) => <MovieEditPageContent movie={movie}/>}
        </ValidatedDataLoader>
    );
};

export default MovieEditPage;
