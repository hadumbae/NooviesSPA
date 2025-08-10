import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {EntityPaginatedQuery, RequestOptions,} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonFilter.types.ts";

/**
 * Combined query parameters type for fetching persons, including:
 * - Request options like population, virtuals, and limits ({@link RequestOptions})
 * - Pagination parameters like page and perPage ({@link EntityPaginatedQuery})
 * - Person-specific filters such as _id, name, nationality ({@link PersonQueryFilters})
 */
type QueryParams = RequestOptions & EntityPaginatedQuery & PersonQueryFilters;

/**
 * Hook to fetch a paginated list of persons filtered by various query parameters.
 *
 * @remarks
 * This hook uses React Query to fetch data from {@link PersonRepository.query} with support
 * for pagination, filtering, population of related documents, and inclusion of virtuals.
 *
 * It caches results for 60 seconds (`staleTime`) and retains previous data during refetches
 * (`placeholderData`) for a smoother UX.
 *
 * Errors during fetching are handled with a consistent user-facing message via {@link useQueryFnHandler}.
 *
 * @param queries - Query parameters to control filtering, pagination, and request options.
 *
 * This type is a combination of:
 * - {@link RequestOptions} — controls population, virtual fields, and result limits
 * - {@link EntityPaginatedQuery} — pagination settings such as page number and page size
 * - {@link PersonQueryFilters} — filters specific to the person entity like `_id`, `name`, and `nationality`
 *
 * @returns A React Query {@link UseQueryResult} containing the fetched data or an {@link HttpResponseError} on failure.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchPersons({
 *   paginated: true,
 *   page: 1,
 *   perPage: 20,
 *   name: "Alice",
 *   nationality: "US",
 *   populate: true,
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
 *
 * return <PersonTable persons={data?.results} />;
 * ```
 */
export default function useFetchPersons(queries: QueryParams): UseQueryResult<unknown, HttpResponseError> {
    const queryKey = ["fetch_person_by_query", queries] as const;

    const fetchPersons = useQueryFnHandler({
        action: () => PersonRepository.query({queries}),
        errorMessage: "Failed to fetch person(s) data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchPersons,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}