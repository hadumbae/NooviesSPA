/**
 * Metadata describing an HTTP response or failure context.
 *
 * @remarks
 * Intended for error handling, logging, and response normalization.
 * Captures transport-level details independent of domain models.
 */
export type ResponseMeta = {
    /** Request URL associated with the response */
    url: string;

    /** Response headers */
    headers: Headers;

    /** HTTP status code */
    status: number;

    /** HTTP status text */
    statusText?: string;

    /** Optional parsed response payload */
    payload?: unknown;
};
