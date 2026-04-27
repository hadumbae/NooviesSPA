/** @fileoverview Data-fetching component that manages a paginated list of movie credits. */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {MovieCreditQueryOptions} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {
    PaginatedMovieCreditDetails,
    PaginatedMovieCreditDetailsSchema
} from "@/domains/moviecredit/schemas/model/PaginatedMovieCreditDetailsSchema.ts";
import {ReactElement, ReactNode} from "react";
import {useFetchPaginatedMovieCredits} from "@/domains/moviecredit/_feat/crud-hooks";

/** Props for the MovieCreditPaginatedListQuery component. */
type QueryProps = PaginationValues & MovieCreditQueryOptions & {
    children: (params: PaginatedMovieCreditDetails) => ReactNode;
    className?: string;
};

/** Renders a list of movie credits using paginated query state and validation. */
export function MovieCreditPaginatedLoader(
    {children, className, page, perPage, ...queries}: QueryProps
): ReactElement {
    const query = useFetchPaginatedMovieCredits({
        schema: PaginatedMovieCreditDetailsSchema,
        page,
        perPage,
        queries: queries,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {children}
        </QueryDataLoader>
    );
}