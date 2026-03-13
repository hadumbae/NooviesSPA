import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import MovieInfoCreditsPageContent
    from "@/features/client/movies/pages/movie-info-credits/MovieInfoCreditsPageContent.tsx";
import {
    useFetchMovieInfoCreditsData
} from "@/domains/movies/views/client/movie-info-credits-page/useFetchMovieInfoCreditsData.ts";
import {
    MovieInfoCreditViewData,
    MovieInfoCreditViewSchema
} from "@/domains/movies/views/client/movie-info-credits-page/MovieInfoCreditViewSchema.ts";

const MovieInfoCreditsPage = () => {
    const routeParams = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to identify movie. Please try again.",
    });

    if (!routeParams) {
        return <PageLoader/>;
    }

    const query = useFetchMovieInfoCreditsData({slug: routeParams.slug});

    return (
        <ValidatedDataLoader query={query} schema={MovieInfoCreditViewSchema}>
            {({movie, creditDetails: {castCredits, crewCredits}}: MovieInfoCreditViewData) => (
                <MovieInfoCreditsPageContent
                    movie={movie}
                    castCredits={castCredits}
                    crewCredits={crewCredits}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default MovieInfoCreditsPage;
