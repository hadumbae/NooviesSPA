import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import handleAPIResponse from "@/common/utility/query/handleAPIResponse.ts";

/**
 * Parameters for `useQueryFnHandler`.
 *
 * @template TReturns - The expected return type of the API call.
 * @property action - A function that performs the API request and returns a `FetchReturns` object.
 * @property errorMessage - Optional custom error message shown if the response is not OK.
 */
type HandleParams<TReturns = unknown> = {
    action: () => Promise<FetchReturns<TReturns>>;
    errorMessage?: string;
}

/**
 * Wraps an asynchronous API action with built-in response validation and error handling.
 *
 * Designed to be passed directly into `queryFn` in `useQuery` from React Query,
 * this function ensures failed requests throw structured errors using `handleAPIResponse`.
 *
 * @template TReturns - The type of data expected from the API response.
 * @param params - The API call and optional custom error message.
 * @returns An async function suitable for use as a React Query `queryFn`.
 *
 * @example
 * ```ts
 * const queryFn = useQueryFnHandler({
 *   action: () => UserRepository.getById({ _id }),
 *   errorMessage: "Failed to load user profile",
 * });
 *
 * useQuery({ queryKey: ["user", _id], queryFn });
 * ```
 */
export default function useQueryFnHandler<TReturns = unknown>(params: HandleParams<TReturns>) {
    const {action, errorMessage} = params;

    return async () => handleAPIResponse<TReturns>({action, errorMessage});
}