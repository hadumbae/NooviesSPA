import MovieInfoReviewsPageContent
    from "@/pages/movies/pages/client/movie-info/movie-info-reviews/MovieInfoReviewsPageContent.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";

const MovieInfoReviewsPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchMovieBySlug({
        slug,
        config: {populate: true, virtuals: true}
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieDetailsSchema}>
            {(movie: MovieDetails) => <MovieInfoReviewsPageContent movie={movie}/>}
        </ValidatedDataLoader>
    );
};

export default MovieInfoReviewsPage;
