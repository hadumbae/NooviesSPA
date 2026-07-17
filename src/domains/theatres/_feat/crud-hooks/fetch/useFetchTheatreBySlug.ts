/**
 * @fileoverview React Query hook for fetching a single theatre by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {SlugQueryConfig} from "@/common/_types";

import {findBySlug} from "@/domains/theatres/_feat/crud";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/keys";

/**
 * Retrieves a specific theatre by its unique URL-safe slug.
 */
export function useFetchTheatreBySlug<TData = unknown>(
    {schema, slug, config, options}: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchTheatre = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchTheatre,
        ...useQueryOptionDefaults(options),
    });
}