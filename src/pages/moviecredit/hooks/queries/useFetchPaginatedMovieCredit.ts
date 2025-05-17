import QueryFilters from "@/common/type/QueryFilters.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {
    MovieCreditPaginationSchema,
    PaginatedMovieCredit
} from "@/pages/moviecredit/schemas/MovieCreditPaginationSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";

/**
 * Props for fetching paginated movie credit data.
 */
interface PaginatedProps {
    /** The page number to fetch. Defaults to 1 if not provided. */
    page?: number;

    /** The number of items to return per page. Defaults to 10 if not specified. */
    perPage?: number;

    /** Optional filter criteria to apply to the movie credit query. */
    filters?: QueryFilters;

    /** Whether to populate related data in the response. Defaults to false. */
    populate?: boolean;
}

/**
 * React hook to fetch and validate paginated movie credit data from the API.
 *
 * This hook wraps the `MovieCreditRepository.paginated` call with client-side validation using
 * the {@link MovieCreditPaginationSchema}. It automatically redirects on validation failure.
 *
 * The returned data includes:
 * - `totalItems`: Total number of movie credits matching the query.
 * - `items`: The array of movie credit entries for the current page.
 *
 * It uses `useFetchValidatedDataWithRedirect`, which handles data fetching, caching,
 * Zod-based validation, and redirecting on schema mismatch.
 *
 * @param params - Pagination and filtering options.
 * @returns A query result with validated `PaginatedMovieCredit` data.
 */
export default function useFetchPaginatedMovieCredit(params: PaginatedProps) {
    const {page = 1, perPage = 10, filters = {}, populate = false} = params;

    const queryKey = ["fetch_paginated_movie_credits", {page, perPage, filters, populate}];
    const schema = MovieCreditPaginationSchema;
    const action = () => MovieCreditRepository.paginated({populate, filters: {page, perPage, ...filters}});

    return useFetchValidatedDataWithRedirect<typeof MovieCreditPaginationSchema, PaginatedMovieCredit>({
        queryKey,
        schema,
        action,
    });
}