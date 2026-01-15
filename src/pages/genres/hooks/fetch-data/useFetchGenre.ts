/**
 * @file useFetchGenre.ts
 *
 * React Query hook for fetching a single `Genre` by ObjectId.
 *
 * Responsibilities:
 * - Invoke {@link GenreRepository.get}
 * - Apply centralized query error handling
 * - Normalize React Query options
 */

import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchGenre}.
 *
 * @template TData - Optional transformed response type.
 */
export type FetchParams<TData = unknown> = {
    /** Genre ObjectId. */
    _id: ObjectId;

    /**
     * Repository request options.
     *
     * Excludes `limit`, as ID-based queries always return a single document.
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * Fetches a single `Genre` by its ObjectId.
 *
 * @remarks
 * - Uses {@link useQueryFnHandler} for standardized error handling
 * - Applies shared defaults via {@link useQueryOptionDefaults}
 *
 * @param params - Fetch configuration.
 * @returns React Query result containing genre data or {@link HttpResponseError}.
 */
export default function useFetchGenre(
    { _id, config, options }: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.get({ _id, config }),
        errorMessage: "Failed to fetch the genre data. Please try again.",
    });

    return useQuery({
        queryKey: ["genres", "_id", { _id, ...config }],
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}
