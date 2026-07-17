/**
 * @fileoverview React Query hook for fetching a single Person record by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {SlugQueryConfig} from "@/common/_types";
import {findBySlug} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/keys";

/** Custom hook to retrieve and validate a Person entity by its unique slug. */
export function useFetchPersonBySlug<TData = unknown>(
    {slug, schema, config, options}: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPerson = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: PersonCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchPerson,
        ...useQueryOptionDefaults(options),
    });
}