/** @fileoverview Data-fetching component that manages a paginated list of movie credits. */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {MovieCreditQueryOptions} from "@/domains/movie-credits/_schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {ReactElement, ReactNode} from "react";
import {useFetchPaginatedMovieCredits} from "@/domains/movie-credits/_feat/crud-hooks";
import {PaginatedItems} from "@/common/_types";
import {MovieCreditDetails, MovieCreditDetailsSchema} from "@/domains/movie-credits";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

/** Props for the MovieCreditPaginatedListQuery component. */
type QueryProps = PaginationValues & MovieCreditQueryOptions & {
    children: (params: PaginatedItems<MovieCreditDetails>) => ReactNode;
    className?: string;
};

/** Renders a list of movie credits using paginated query state and validation. */
export function MovieCreditPaginatedLoader(
    {children, className, page, perPage, ...queries}: QueryProps
): ReactElement {
    const query = useFetchPaginatedMovieCredits({
        schema: generatePaginationSchema(MovieCreditDetailsSchema),
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