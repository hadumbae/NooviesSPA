/**
 * Generic return type for HTTP fetch operations.
 *
 * @template T - The type of the result data. Defaults to `any` if not specified.
 *
 * @property response - The raw `Response` object returned from the fetch.
 * @property result - The parsed and typed result data from the response body.
 */
type FetchReturns<T = any> = { response: Response; result: T }

export default FetchReturns;