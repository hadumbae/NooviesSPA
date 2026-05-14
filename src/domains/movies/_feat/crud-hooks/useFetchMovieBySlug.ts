/**
 * @fileoverview Hook for fetching and validating a single movie by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SlugQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/queryKeys.ts";
import {findBySlug} from "@/domains/movies/_feat/crud";

/** Fetches a movie by slug and validates the response against a schema. */
export function useFetchMovieBySlug<TData = unknown>(
    {schema, slug, config, options}: SlugQueryConfig<TData>,
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovie = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchMovie,
        ...useQueryOptionDefaults(options),
    });
}
