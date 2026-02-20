import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import MovieInfoCreditsPageContent
    from "@/features/client/movies/movie-info/movie-info-credits/MovieInfoCreditsPageContent.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";

const MovieInfoCreditsPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to identify movie. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchMovieBySlug({
        slug,
        config: {virtuals: true, populate: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieDetailsSchema}>
            {(movie: MovieDetails) => <MovieInfoCreditsPageContent movie={movie}/>}
        </ValidatedDataLoader>
    );
};

export default MovieInfoCreditsPage;
