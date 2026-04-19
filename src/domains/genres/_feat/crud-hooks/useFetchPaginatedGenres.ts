/**
 * @fileoverview React Query hook for fetching validated paginated Genre collections.
 */

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {paginated} from "@/domains/genres/_feat/crud";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {ZodType, ZodTypeDef} from "zod";
import {GenreQueryOptions} from "@/domains/genres/schema";

/**
 * Parameters for the useFetchPaginatedGenres hook.
 */
type FetchQueries<TData = unknown> = PaginationValues & {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: GenreQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/**
 * Custom hook for retrieving validated paginated genres.
 */
export default function useFetchPaginatedGenres<TData = unknown>(
    {schema, page, perPage, queries, config, options}: FetchQueries<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenres = buildQueryFn<TData>({
        action: () => paginated({config, queries, pagination: {page, perPage}}),
        schema,
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchGenres,
        ...useQueryOptionDefaults(options),
    });
}