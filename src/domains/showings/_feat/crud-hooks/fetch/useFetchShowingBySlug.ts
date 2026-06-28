/**
 * @fileoverview Hook for fetching and validating a single showing by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SlugQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {findBySlug} from "@/domains/showings/_feat/crud";
import {ShowingCRUDQueryKeys} from "@/domains/showings/_feat/crud-hooks/keys";

/** Fetches a showing by slug and validates the response against a schema. */
export function useFetchShowingBySlug<TData = unknown>(
    {slug, config, options, schema}: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchShowing = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: ShowingCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchShowing,
        ...useQueryOptionDefaults(options),
    });
}
