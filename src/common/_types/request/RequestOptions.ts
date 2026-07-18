/**
 * @fileoverview Defines configuration options for data fetching requests.
 */

/** Options to configure population, virtual fields, and pagination limits for requests. */
export type RequestOptions = {
    populate?: boolean;
    virtuals?: boolean;
    limit?: number;
};
