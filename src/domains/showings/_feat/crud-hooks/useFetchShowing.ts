/**
 * @fileoverview React Query hook for fetching and validating a single showing by its ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {IDQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findByID} from "@/domains/showings/_feat/crud";
import {ShowingCRUDQueryKeys} from "@/domains/showings/_feat/crud-hooks/queryKeys.ts";

/** Custom hook to fetch a showing and validate the response against a schema. */
export function useFetchShowing<TData = unknown>(
    {_id, options, config, schema}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchShowing = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: ShowingCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchShowing,
        ...useQueryOptionDefaults(options),
    });
}
