/**
 * @file Container orchestrating data loading for the movie reviews page.
 * @filename MovieInfoReviewsPage.tsx
 */

import MovieInfoReviewsPageContent
    from "@/views/client/movies/pages/movie-info-reviews/MovieInfoReviewsPageContent.tsx";
import {PageLoader} from "@/views/common/_comp/page";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams
    from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {
    MovieInfoReviewsPageData,
    useMovieInfoReviewsPageQueries
} from "@/domains/movies/hooks/pages/client/useMovieInfoReviewsPageQueries.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";

/** Number of reviews displayed per page */
const REVIEWS_PER_PAGE = 20;

/**
 * Coordinates routing, pagination, and multi-query data loading.
 */
const MovieInfoReviewsPage = () => {
    const params = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    });

    if (!params?.slug) return <PageLoader/>;

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const queries = useMovieInfoReviewsPageQueries({
        page,
        perPage: REVIEWS_PER_PAGE,
        movieSlug: params.slug,
    });

    return (
        <MultiQueryDataLoader queries={queries}>
            {(data) => {
                const {movie, reviewDetails} =
                    data as MovieInfoReviewsPageData;

                return (
                    <MovieInfoReviewsPageContent
                        {...reviewDetails}
                        movie={movie}
                        reviews={reviewDetails.items}
                        page={page}
                        perPage={REVIEWS_PER_PAGE}
                        setPage={setPage}
                    />
                );
            }}
        </MultiQueryDataLoader>
    );
};

export default MovieInfoReviewsPage;