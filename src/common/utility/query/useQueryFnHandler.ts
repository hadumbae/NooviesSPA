import RequestReturns from "@/common/type/request/RequestReturns.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";

/**
 * Parameters for {@link useQueryFnHandler}.
 *
 * @template TReturns - Type of the successful response payload.
 */
type HandleParams<TReturns = unknown> = {
    /**
     * The async function that performs the fetch or API request.
     * Must return a {@link RequestReturns} object containing:
     * - `response` - the raw `Response` object.
     * - `result` - the parsed response body.
     */
    action: () => Promise<RequestReturns<TReturns>>;

    /**
     * Optional custom error message to use if the response is not OK.
     * Defaults to `"Failed to fetch data. Please try again."`.
     */
    errorMessage?: string;
};

/**
 * A small utility that wraps an API call into a query function
 * compatible with React Query.
 *
 * This function:
 * - Wraps the `action` inside {@link handleQueryResponse}.
 * - Automatically throws `HttpResponseError` or `ParseError` when needed.
 * - Returns a function suitable for passing to React Query's `queryFn`.
 *
 * @template TReturns - Type of the successful response payload.
 *
 * @param params - {@link HandleParams} containing the action and optional error message.
 *
 * @returns A function that can be passed directly to React Query's `queryFn`.
 *
 * @example
 * ```ts
 * const userQuery = useQuery({
 *   queryKey: ["user", userId],
 *   queryFn: useQueryFnHandler({
 *     action: () => fetchUser(userId),
 *     errorMessage: "Failed to load user."
 *   })
 * });
 * ```
 */
export default function useQueryFnHandler<TReturns = unknown>(params: HandleParams<TReturns>) {
    const {action, errorMessage} = params;
    return async () => handleQueryResponse<TReturns>({action, errorMessage});
}