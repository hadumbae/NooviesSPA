/**
 * @fileoverview Defines types for standardized API response metadata.
 */

/** Metadata containing details about an HTTP response. */
export type ResponseMeta = {
    url: string;
    headers: Headers;
    status: number;
    statusText?: string;
    payload?: unknown;
};
