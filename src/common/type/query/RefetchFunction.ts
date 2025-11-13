import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * A function type representing a refetch operation for a `React Query` query.
 *
 * @template TData - The type of the data returned by the query. Defaults to `unknown`.
 * @template TError - The type of error that may be thrown during the refetch. Defaults to `HttpResponseError`.
 *
 * @param options - Optional configuration for the refetch operation, following React Query's `RefetchOptions`.
 *
 * @returns A `Promise` that resolves to a `QueryObserverResult`, containing the latest query data, error, and status.
 *
 * @example
 * ```ts
 * const refetchUsers: RefetchFunction<User[]> = async (options) => {
 *   return queryClient.refetchQuery(['users'], options);
 * };
 * ```
 */
export type RefetchFunction<
    TData = unknown,
    TError extends Error = HttpResponseError
> = (options?: RefetchOptions) => Promise<QueryObserverResult<TData, TError>>;
