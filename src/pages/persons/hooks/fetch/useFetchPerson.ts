import { useQuery, UseQueryResult } from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { FetchByIDParams } from "@/common/type/query/FetchByIDParams.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * Combined parameters for fetching a single person.
 *
 * @template TData The expected type of the person data returned by the query.
 * @see {@link FetchByIDParams}
 * @see {@link UseQueryOptions}
 */
export type FetchProps<TData = unknown> = FetchByIDParams & UseQueryOptions<TData>;

/**
 * React Query hook to fetch a single person by ID, with optional population of related documents and inclusion of virtual fields.
 *
 * @template TData The expected type of the person data returned by the query. Can be an object or array.
 *
 * @param params - Object containing the person ID and optional query settings.
 * @param params._id - The unique identifier of the person.
 * @param params.populate - Optional. Whether to populate related entities (default: `false`).
 * @param params.virtuals - Optional. Whether to include virtual fields (default: `false`).
 * @param params.limit - Optional. Maximum number of results (if applicable).
 * @param params.enabled - See {@link UseQueryOptions#enabled}.
 * @param params.staleTime - See {@link UseQueryOptions#staleTime}.
 * @param params.initialData - See {@link UseQueryOptions#initialData}.
 * @param params.placeholderData - See {@link UseQueryOptions#placeholderData}.
 *
 * @returns A {@link UseQueryResult} containing the fetched person data or an {@link HttpResponseError} if the fetch fails.
 *
 * @remarks
 * - This hook returns raw, unvalidated data. Use a separate validation hook or schema if you need strict type enforcement.
 * - Errors are handled via {@link useQueryFnHandler} with a consistent user-facing message.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchPerson<Person>({
 *   _id: "12345",
 *   populate: true
 * });
 * if (isLoading) return <Spinner />;
 * if (error) return <div>{error.message}</div>;
 * return <PersonDetails person={data} />;
 * ```
 */
export default function useFetchPerson<TData = unknown>(
    params: FetchProps<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {
        _id,
        populate = false,
        virtuals = false,
        limit,
        enabled = true,
        staleTime = 1000 * 60,
        placeholderData = (previousData: TData | undefined) => previousData,
        initialData,
    } = params;

    const queryKey = ["fetch_single_person", { _id, populate, virtuals, limit }] as const;

    const fetchPerson = useQueryFnHandler({
        action: () => PersonRepository.get({ _id, populate, virtuals, limit }),
        errorMessage: "Failed to fetch person. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchPerson,
        enabled,
        staleTime,
        placeholderData,
        initialData,
    });
}
