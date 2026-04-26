/**
 * @fileoverview Hook for fetching a single seat by its slug with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {QueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findBySlug} from "@/domains/seats/_feat/crud";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/queryKeys.ts";

/** Props for the useFetchSeatBySlug hook. */
type FetchParams<TData = unknown> = QueryConfig<TData> & {
    slug: string;
};

/**
 * Retrieves a single seat entity by its unique slug and validates the response against a Zod schema.
 */
export function useFetchSeatBySlug<TData = unknown>(
    {schema, slug, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeat = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: SeatCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchSeat,
        ...useQueryOptionDefaults(options),
    });
}