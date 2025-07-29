import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Represents the standardized return shape for one or more `react-query` fetch operations.
 *
 * @template TQuery - A type describing the collection of queries being returned (usually
 * an object containing `UseQueryResult` instances).
 *
 * @property queries - The set of queries executed (typed as `TQuery`).
 * @property isSuccess - `true` if at least one query has completed successfully.
 * @property isPending - `true` if at least one query is in a pending (loading) state.
 * @property isFetching - `true` if at least one query is actively fetching in the background.
 * @property isError - `true` if at least one query has encountered an error.
 * @property error - The first {@link HttpResponseError} encountered among the queries, or `null` if none.
 */
export type FetchQueryReturns<TQuery> = {
    queries: TQuery;
    isSuccess: boolean;
    isPending: boolean;
    isFetching: boolean;
    isError: boolean;
    error: HttpResponseError | null;
};