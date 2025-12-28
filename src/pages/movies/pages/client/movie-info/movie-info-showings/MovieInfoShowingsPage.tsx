import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieInfoShowingsPageContent
    from "@/pages/movies/pages/client/movie-info/movie-info-showings/MovieInfoShowingsPageContent.tsx";

const MovieInfoShowingsPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
       schema: SlugRouteParamSchema,
       errorTo: "/browse/movies",
       errorMessage: "Failed to fetch movie. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    const query = useFetchMovieBySlug({
        slug,
        queryConfig: {populate: true, virtuals: true}
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieDetailsSchema}>
            {(movie: MovieDetails) => <MovieInfoShowingsPageContent movie={movie} />}
        </ValidatedDataLoader>
    );
};

export default MovieInfoShowingsPage;
