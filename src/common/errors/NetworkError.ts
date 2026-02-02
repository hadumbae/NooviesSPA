/**
 * @file NetworkError.ts
 *
 * Error type representing failures occurring at the network or transport layer.
 *
 * Used when a request fails before receiving a valid HTTP response,
 * such as connection issues, timeouts, or low-level fetch errors.
 */

import RequestMethod from "@/common/type/request/RequestMethod.ts";
import buildString from "@/common/utility/buildString.ts";

type ErrorParams = {
    /** Request URL */
    url: string;

    /** HTTP method used for the request */
    method: RequestMethod;

    /** Underlying error that triggered the failure */
    cause?: Error;

    /** Optional error message override */
    message?: string;
};

/**
 * Represents a non-HTTP network failure.
 *
 * Encapsulates request metadata and the originating error to provide
 * consistent logging, serialization, and error handling.
 */
export class NetworkError extends Error {
    /** Request URL */
    public readonly url: string;

    /** HTTP method used */
    public readonly method: RequestMethod;

    /** Original error that caused the network failure */
    public readonly cause?: Error;

    /**
     * Creates a new `NetworkError`.
     *
     * @param params - Network error construction input
     */
    constructor({message, url, method, cause}: ErrorParams) {
        super(message);

        this.url = url;
        this.method = method;
        this.cause = cause;
    }

    /**
     * Returns a human-readable string representation of the error.
     */
    toString(): string {
        return buildString([`[${this.method}]`, this.cause?.message, this.url]);
    }

    /**
     * Serializes the error into a safe, log-friendly object.
     */
    toJSON(): Record<string, any> {
        return {
            url: this.url,
            method: this.method,
            cause: this.cause?.message,
            message: this.message || "NETWORK_ERROR",
        };
    }
}
