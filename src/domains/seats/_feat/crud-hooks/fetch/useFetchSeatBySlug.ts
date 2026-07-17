/**
 * @fileoverview Hook for fetching a single seat by its slug with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {SlugQueryConfig} from "@/common/_types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

import {findBySlug} from "@/domains/seats/_feat/crud";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/keys";

/**
 * Retrieves a single seat entity by its unique slug and validates the response against a Zod schema.
 */
export function useFetchSeatBySlug<TData = unknown>(
    {schema, slug, config, options}: SlugQueryConfig<TData>
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