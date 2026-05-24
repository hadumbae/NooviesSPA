/**
 * @fileoverview Custom hook for fetching and validating a list of showing records.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {ListQueryConfig} from "@/common/types";
import {find} from "@/domains/showings/_feat/crud";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {ShowingCRUDQueryKeys} from "@/domains/showings/_feat/crud-hooks/queryKeys.ts";

/** Fetches a list of showings based on provided query parameters and validates the response against a schema. */
export function useFetchShowings<TData = unknown>(
    {queries, config, options, schema}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchShowingsByQuery = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: ShowingCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchShowingsByQuery,
        ...useQueryOptionDefaults(options),
    });
}
