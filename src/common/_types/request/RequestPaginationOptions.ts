/**
 * @fileoverview Defines the structure for pagination parameters in API requests.
 */

/** Options for controlling pagination behaviour in data requests. */
export type RequestPaginationOptions =
    | { paginated: true, page: number, perPage: number }
    | { paginated?: false, page?: never, perPage?: never };