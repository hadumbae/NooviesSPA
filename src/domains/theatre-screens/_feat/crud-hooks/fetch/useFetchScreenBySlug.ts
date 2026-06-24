/**
 * @fileoverview React Query hook for fetching a single theatre screen by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

import {findBySlug} from "@/domains/theatre-screens/_feat/crud";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/keys";
import {SlugQueryConfig} from "@/common/types";

/**
 * Fetches and validates a single theatre screen record using its slug.
 */
export function useFetchScreenBySlug<TData = unknown>(
    {schema, slug, config, options}: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreen = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchScreen,
        ...useQueryOptionDefaults(options),
    });
}