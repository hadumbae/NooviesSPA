type ErrorParams = {
    raw: string;
    status?: number;
    message?: string;
}

/**
 * Represents an error that occurs when parsing JSON data fails.
 *
 * @remarks
 * This custom error class extends the built-in `Error` class to provide additional context
 * about the raw response and the HTTP status code, if available. It's useful for handling
 * and distinguishing JSON parsing errors in API responses.
 *
 * @example
 * ```typescript
 * try {
 *   const data = await response.json();
 * } catch (error) {
 *   if (error instanceof JSONParseError) {
 *     console.error("Failed to parse JSON:", error.raw);
 *     // Handle the error appropriately
 *   }
 * }
 * ```
 */
export default class JSONParseError extends Error {
    /**
     * The raw response body as a string before parsing.
     * This property is useful for logging and debugging purposes.
     */
    public raw: unknown;

    /**
     * The HTTP status code of the response, if available.
     * This property helps to understand the context of the error.
     */
    public status?: number;

    /**
     * Creates an instance of the `JSONParseError` class.
     *
     * @param params - An object containing the error details.
     * @param params.raw - The raw response body as a string.
     * @param params.status - The HTTP status code of the response.
     * @param params.message - A custom error message.
     */
    constructor(params: ErrorParams) {
        const {raw, status, message = "Invalid JSON. Possibly Corrupted."} = params;

        super(message);

        this.name = "JSONParseError";
        this.raw = raw;
        this.status = status;

        Object.setPrototypeOf(this, JSONParseError.prototype);
    }

    /**
     * Returns a string representation of the error.
     * This method can be overridden to provide a custom error message.
     *
     * @returns A string describing the error.
     */
    toString(): string {
        return "[JSONParseError] Failed to parse JSON. Possible corrupted data.";
    }

    /**
     * Serializes the error details into a plain object.
     * This method is useful for logging and transmitting error information.
     *
     * @returns An object containing the error details.
     */
    toJson(): { message?: string, raw: unknown, status?: number } {
        return {
            message: this.message,
            raw: this.raw,
            status: this.status,
        };
    }
}