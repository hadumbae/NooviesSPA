/**
 * @file Data loader component for fetching and validating the current user's movie reviews.
 * @filename MyReviewsLoader.tsx
 */

import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchMyMovieReviews} from "@/domains/review/fetch/my-reviews/useFetchMyMovieReviews.ts";
import {ReactNode} from "react";
import {MyMovieReviewPaginatedSchema, MyPaginatedMovieReviews} from "@/domains/review/schemas/models/my-reviews";

/**
 * Props for {@link MyReviewsLoader}.
 */
type LoaderProps = {
    /** The current page number for pagination. */
    page: number;
    /** The number of reviews to fetch per page. */
    perPage: number;
    /** Render-prop function called with the validated {@link MyPaginatedMovieReviews} data.*/
    children: (data: MyPaginatedMovieReviews) => ReactNode
}

/**
 * Orchestrates the data-fetching and validation lifecycle for "My Reviews".
 * @param props - {@link LoaderProps}
 */
const MyReviewsLoader = ({page, perPage, children}: LoaderProps) => {
    const query = useFetchMyMovieReviews({
        page,
        perPage,
        config: {
            virtuals: true,
            populate: true,
        }
    });

    return (
        <ValidatedDataLoader query={query} schema={MyMovieReviewPaginatedSchema}>
            {children}
        </ValidatedDataLoader>
    );
};

export default MyReviewsLoader;