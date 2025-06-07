/**
 * Represents an error thrown when an HTTP response returns a status code other than 200.
 * Optionally associates the error with a specific data model.
 */
export default class HttpResponseError extends Error {
    /**
     * The HTTP response associated with this error.
     */
    public readonly response: Response;

    /**
     * The payload associated with this error.
     */
    public readonly payload?: unknown;

    /**
     * The name of the data model related to the error, if applicable.
     */
    public readonly model?: string;

    /**
     * Creates an instance of HttpResponseError.
     *
     * @param params - The parameters for initializing the error.
     * @param params.message - Optional. A descriptive message for the error.
     * @param params.response - The HTTP response that triggered the error.
     * @param params.payload - Optional. The payload related to the error.
     * @param params.model - Optional. The name of the data model related to the error.
     */
    constructor(params: { message?: string, response: Response, payload?: unknown, model?: string }) {
        const {message, response, model, payload} = params;

        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, HttpResponseError);

        this.response = response;
        this.payload = payload;
        this.model = model;

        this.name = this.constructor.name;
    }

    /**
     * Returns a string representation of the error, including its name, HTTP status, and message.
     *
     * @returns A string describing the error.
     */
    toString(): string {
        return `[${this.name}] Status : ${this.response.status} | ${this.message || "An Error Occurred."}`;
    }

    /**
     * Converts the error instance to a JSON object.
     *
     * @returns An object containing the error's name, message, status code, and response URL.
     */
    toJSON(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            status: this.response.status,
            url: this.response.url,
        };
    }
}