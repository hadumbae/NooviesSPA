/**
 * @fileoverview Data loader component for fetching and validating the current user's movie reviews.
 *
 */

import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchMyMovieReviews} from "@/domains/review/fetch/my-reviews/useFetchMyMovieReviews.ts";
import {ReactElement, ReactNode} from "react";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MyMovieReview, MyMovieReviewSchema} from "@/domains/review/schemas/my-reviews";
import {PaginatedItems} from "@/common/types";

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
    const query = useFetchMyMovieReviews({page, perPage, config: {virtuals: true, populate: true}});

    return (
        <ValidatedDataLoader query={query} schema={generatePaginationSchema(MyMovieReviewSchema)}>
            {children}
        </ValidatedDataLoader>
    );
}

