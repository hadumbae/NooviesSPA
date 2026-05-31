/**
 * @fileoverview Data loader component for fetching and validating the current user's movie reviews.
 */

import {ReactElement, ReactNode} from "react";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {MyMovieReview, MyMovieReviewSchema} from "@/domains/movieReviews/schemas";
import {PaginatedItems} from "@/common/types";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchMyMovieReviews} from "@/domains/movieReviews/_feat";

/** Props for the MyReviewsLoader component. */
type LoaderProps = {
    page: number;
    perPage: number;
    children: (data: PaginatedItems<MyMovieReview>) => ReactNode
}

/**
 * Orchestrates the data-fetching and validation lifecycle for the current user's movie reviews.
 */
export function MyReviewsLoader({page, perPage, children}: LoaderProps): ReactElement {
    const query = useFetchMyMovieReviews({
        page,
        perPage,
        config: {virtuals: true, populate: true},
        schema: generatePaginationSchema(MyMovieReviewSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {children}
        </QueryDataLoader>
    );
}

