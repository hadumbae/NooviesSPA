import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useQuery} from "@tanstack/react-query";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";
import {MovieCreditQueryFilters} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.types.ts";

/**
 * Props for fetching paginated movie credit data.
 */
interface PaginatedProps {
    /** The page number to fetch. Defaults to 1 if not provided. */
    page?: number;

    /** The number of items to return per page. Defaults to 10 if not specified. */
    perPage?: number;

    /** Optional filter criteria to apply to the movie credit query. */
    filters?: MovieCreditQueryFilters;

    /** Whether to populate related data in the response. Defaults to false. */
    populate?: boolean;
}

/**
 * A React Query hook to fetch paginated movie credits from the repository.
 *
 * Wraps `MovieCreditRepository.paginated` with `useQuery` and automatically
 * handles page, per-page, filters, and population options.
 *
 * @param params - Pagination and filtering options.
 * @returns A React Query result containing the paginated movie credit data.
 *
 * @example
 * ```tsx
 * const query = useFetchPaginatedMovieCredit({
 *   page: 2,
 *   perPage: 20,
 *   filters: { name: "Christopher" },
 *   populate: true
 * });
 * ```
 */
export default function useFetchPaginatedMovieCredit(params: PaginatedProps) {
    const {page = 1, perPage = 10, filters = {}, populate = false} = params;

    const queryKey = ["fetch_paginated_movie_credits", {page, perPage, filters, populate}];

    const action = async () => {
        const {response, result} = await MovieCreditRepository.paginated({
            populate,
            filters: {page, perPage, ...filters},
        });

        if (!response.ok) {
            const message = "Failed to fetch movie credits. Please try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: action,
    });
}