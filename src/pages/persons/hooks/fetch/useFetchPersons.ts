import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { EntityPaginatedQuery, RequestOptions } from "@/common/type/repositories/EntityRequestParamTypes.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { PersonQueryFilters } from "@/pages/persons/schema/queries/PersonFilter.types.ts";
import { UseQueryOptions } from "@/common/type/UseQueryOptions.ts";

/**
 * Combined query parameters type for fetching persons.
 *
 * @template TData The expected type of the data returned by the query.
 *
 * This type combines:
 * - {@link RequestOptions} — controls population, virtual fields, and result limits
 * - {@link EntityPaginatedQuery} — pagination settings such as page number and page size
 * - {@link PersonQueryFilters} — filters specific to the person entity like `_id`, `name`, and `nationality`
 * - {@link UseQueryOptions} — optional query behavior settings such as `staleTime`, `enabled`, `initialData`, and `placeholderData`
 */
export type QueryParams<TData = unknown> = {
    queries?: RequestOptions & EntityPaginatedQuery & PersonQueryFilters;
    options?: UseQueryOptions<TData>;
};

/**
 * Hook to fetch a paginated list of persons filtered by query parameters.
 *
 * @template TData The expected type of the data returned by the query. Can be an array or object.
 *
 * @param params - Object containing query parameters and optional query options.
 * @param params.queries - Combined filters, pagination, and request options.
 *   @see {@link RequestOptions}
 *   @see {@link EntityPaginatedQuery}
 *   @see {@link PersonQueryFilters}
 * @param params.options - Optional query behavior settings.
 *   @see {@link UseQueryOptions#enabled}
 *   @see {@link UseQueryOptions#staleTime}
 *   @see {@link UseQueryOptions#initialData}
 *   @see {@link UseQueryOptions#placeholderData}
 *
 * @returns A {@link UseQueryResult} containing the fetched persons or an {@link HttpResponseError} on failure.
 *
 * @remarks
 * - Uses {@link PersonRepository.query} for data fetching.
 * - Errors are handled via {@link useQueryFnHandler} with a standardized message.
 * - Defaults: `staleTime = 60_000ms`, `enabled = true`.
 * - `placeholderData` retains previous results during background refetches for smoother UX.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchPersons({
 *   queries: {
 *     paginated: true,
 *     page: 1,
 *     perPage: 20,
 *     name: "Alice",
 *     nationality: "US",
 *     populate: true
 *   },
 *   options: { staleTime: 1000 * 30 }
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
 *
 * return <PersonTable persons={data?.results} />;
 * ```
 */
export default function useFetchPersons<TData = unknown>(
    params?: QueryParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {
        queries = {},
        options: {
            enabled = true,
            staleTime = 1000 * 60,
            placeholderData = (previousData: TData | undefined) => previousData,
            initialData
        } = {}
    } = params || {};

    const queryKey = ["fetch_person_by_query", queries] as const;

    const fetchPersons = useQueryFnHandler({
        action: () => PersonRepository.query({ queries }),
        errorMessage: "Failed to fetch person(s) data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchPersons,
        enabled,
        staleTime,
        placeholderData,
        initialData
    });
}
