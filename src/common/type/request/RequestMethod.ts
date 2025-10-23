/**
 * HTTP request methods supported by the application.
 *
 * Can be used to strongly-type API calls and ensure only valid methods are passed.
 *
 * @example
 * ```ts
 * const method: RequestMethod = "POST";
 * ```
 */
type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export default RequestMethod;
