/** @fileoverview Hook for fetching a single movie credit by its unique identifier. */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {QueryConfig} from "@/common/types";
import {MovieCreditCRUDQueryKeys} from "@/domains/moviecredit/_feat/crud/queryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findByID} from "@/domains/moviecredit/_feat/crud/repository.ts";

/** Configuration for fetching a movie credit including the identifier and validation schema. */
type FetchParams<TData = unknown> = QueryConfig<TData> & {
    _id: ObjectId;
};

/** Fetches a movie credit record and validates it against the provided schema. */
export function useFetchMovieCredit<TData = unknown>(
    {schema, _id, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovieCredit = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCreditCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchMovieCredit,
        ...useQueryOptionDefaults(options),
    });
}