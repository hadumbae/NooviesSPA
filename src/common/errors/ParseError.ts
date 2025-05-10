import {ZodIssue} from "zod";

/**
 * Custom error class to represent parsing errors encountered during Zod schema validation.
 *
 * @extends Error
 */
export class ParseError extends Error {
    /* The raw data. */
    raw: unknown;

    /** Array of Zod issues encountered during parsing. */
    errors: ZodIssue[];

    /**
     * Creates an instance of ParseError.
     *
     * @param {Object} params - The parameters for the error.
     * @param {string} [params.message] - Optional error message.
     * @param {ZodIssue[]} params.errors - Array of Zod issues encountered during parsing.
     */
    constructor({message, errors, raw}: {message?: string, raw?: unknown, errors: ZodIssue[]}) {
        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);

        this.name = this.constructor.name;
        this.errors = errors;
        this.raw = raw;
    }

    /**
     * Returns a string representation of the ParseError instance.
     *
     * @returns {string} A string describing the error.
     */
    toString(): string {
        return `[${this.name}] ${this.message || "An Error Occurred."}`;
    }

    /**
     * Serializes the ParseError instance to a JSON object.
     *
     * @returns {Record<string, any>} A plain object representing the error.
     */
    toJSON(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            errors: this.errors,
        };
    }
}