/**
 * @fileoverview React Query hook for fetching a single Genre by its ObjectId.
 * Orchestrates ID-based retrieval with standardized error handling and
 * consistent query key management.
 */

import GenreRepository from "@/domains/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";

/**
 * Parameters for the useFetchGenre hook.
 */
export type FetchParams<TData = unknown> = {
    _id: ObjectId;
    config?: Omit<RequestOptions, "limit">;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook for retrieving a single genre via the Genre repository.
 */
export default function useFetchGenre(
    {_id, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.get({_id, config}),
        errorMessage: "Failed to fetch the genre data. Please try again.",
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}