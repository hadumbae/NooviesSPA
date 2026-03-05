/**
 * @file Client page container for the Movie Reviews view.
 *
 * MovieInfoReviewsPage.tsx
 */

import MovieInfoReviewsPageContent
    from "@/features/client/movies/pages/movie-info-reviews/MovieInfoReviewsPageContent.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import { SlugRouteParamSchema } from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams
    from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {
    MovieInfoReviewsPageData,
    useMovieInfoReviewsPageQueries
} from "@/pages/movies/hooks/pages/client/useMovieInfoReviewsPageQueries.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";

/**
 * Movie reviews page container.
 *
 * Responsibilities:
 * - Validates and parses the `slug` route parameter
 * - Redirects on invalid route params
 * - Composes required data queries via a dedicated hook
 * - Delegates loading/error handling to MultiQueryDataLoader
 * - Renders the page content with fully validated data
 *
 * This component does not implement business logic directly.
 * Instead, it orchestrates routing and data loading concerns.
 */
const MovieInfoReviewsPage = () => {
    const params = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    });

    if (!params?.slug) {
        return <PageLoader />;
    }

    const queries = useMovieInfoReviewsPageQueries({
        movieSlug: params.slug
    });

    return (
        <MultiQueryDataLoader queries={queries}>
            {(data) => {
                const { movie, reviewDetails } =
                    data as MovieInfoReviewsPageData;

                return (
                    <MovieInfoReviewsPageContent
                        {...reviewDetails}
                        movie={movie}
                        reviews={reviewDetails.items}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
};

export default MovieInfoReviewsPage;