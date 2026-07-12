/**
 * @fileoverview Container orchestrating data loading for the movie reviews page.
 */

import {ReactElement} from "react";
import {PageLoader} from "@/views/common/_comp/page";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";

import {MovieInfoReviewsPageContent} from "@/views/client/movies/_pages/movie-reviews/content.tsx";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {useFetchMovieInfoReviewsData} from "@/domains/movies";

/** Number of reviews displayed per page */
const REVIEWS_PER_PAGE = 20;

/** Coordinates routing, pagination, and multi-query data loading for movie reviews. */
export function MovieInfoReviewsPage(): ReactElement {
    const params = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/movies",
        errorMessage: "Failed to fetch movie. Please try again.",
    });

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    // const queries = useMovieInfoReviewsPageQueries({
    //     page,
    //     perPage: REVIEWS_PER_PAGE,
    //     movieSlug: params.slug,
    // });

    const query = useFetchMovieInfoReviewsData({
        slug: params!.slug!,
        queries: {
            reviewPage: page,
            reviewPerPage: REVIEWS_PER_PAGE,
        },
        options: {enabled: !!params?.slug},
    });

    if (!params?.slug) return <PageLoader/>;


    return (
        <QueryDataLoader query={query}>
            {({movie, reviewDetails}) => (
                <MovieInfoReviewsPageContent
                    {...reviewDetails}
                    movie={movie}
                    reviews={reviewDetails.items}
                    page={page}
                    perPage={REVIEWS_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}