/**
 * @file HttpResponseError.ts
 *
 * Custom error type representing a failed HTTP response.
 *
 * Wraps transport-level metadata (URL, headers, status)
 * along with optional payload and domain model context.
 */

type ErrorConstructor = {
    /** Request URL that produced the error */
    url: string;

    /** Response headers */
    headers: Headers;

    /** HTTP status code */
    status: number;

    /** HTTP status text */
    statusText?: string;

    /** Optional parsed response payload */
    payload?: unknown;

    /** Optional domain or model identifier */
    model?: string;

    /** Human-readable error message */
    message?: string;
};

/**
 * Error thrown for non-successful HTTP responses.
 *
 * Designed for API, fetch, and repository layers where
 * response metadata must be preserved for debugging
 * and error handling.
 */
export default class HttpResponseError extends Error {
    /** Request URL */
    public readonly url: string;

    /** Response headers */
    public readonly headers: Headers;

    /** HTTP status code */
    public readonly status: number;

    /** HTTP status text */
    public readonly statusText?: string;

    /** Optional response payload */
    public readonly payload?: unknown;

    /** Optional domain or model identifier */
    public readonly model?: string;

    /**
     * Creates a new HttpResponseError instance.
     *
     * @param params - Error construction parameters
     */
    constructor(params: ErrorConstructor) {
        const {message, url, headers, statusText, status, model, payload} = params;

        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, HttpResponseError);

        this.url = url;
        this.headers = headers;
        this.status = status;
        this.statusText = statusText;
        this.payload = payload;
        this.model = model;

        this.name = this.constructor.name;
    }

    /**
     * Returns a concise string representation of the error.
     */
    toString(): string {
        return `[HTTP ${this.status}] ${this.statusText ?? "Unknown status"}`;
    }

    /**
     * Serializes the error into a JSON-safe structure.
     */
    toJSON(): Record<string, any> {
        return {
            url: this.url,
            headers: this.headers,
            status: this.status,
            statusText: this.statusText,
            model: this.model,
            message: this.message,
        };
    }
}
