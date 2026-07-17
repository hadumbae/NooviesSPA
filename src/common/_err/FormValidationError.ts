import {ZodIssue} from "zod";

/**
 * Parameters for constructing a {@link FormValidationError}.
 *
 * @template TRaw The type of the raw input data associated with the validation error.
 */
type ConstructorParams<TRaw = unknown> = {
    /**
     * Optional error message describing the validation failure.
     * Defaults to `"Form validation failed."` if omitted.
     */
    message?: string;

    /**
     * Array of detailed issues returned by Zod validation.
     */
    errors: ZodIssue[];

    /**
     * The raw input data that caused the validation failure.
     */
    raw?: TRaw;
}

/**
 * Represents a validation error thrown when form input
 * fails schema validation using Zod.
 *
 * Contains structured validation issues and optionally
 * the raw form data that triggered the error.
 *
 * @template TRaw The type of the raw input data.
 */
export class FormValidationError<TRaw = unknown> extends Error {
    /**
     * The array of validation issues from Zod.
     */
    errors: ZodIssue[];

    /**
     * The raw input data that failed validation.
     */
    raw?: TRaw;

    /**
     * Creates a new {@link FormValidationError} instance.
     *
     * @param params - The constructor parameters including message, errors, and raw input.
     */
    constructor(params: ConstructorParams<TRaw>) {
        const { message, errors, raw } = params;

        super(message);

        this.name = this.constructor.name;
        this.errors = errors;
        this.raw = raw;

        console.debug(`[${this.name}] ${this.message || "Form validation failed."}`, this.raw);
    }

    /**
     * Returns a string representation of the error.
     *
     * @returns A string including the error name and message.
     */
    toString(): string {
        return `[${this.name}] ${this.message || "Form validation failed. Please check your values."}`;
    }

    /**
     * Converts the error to a plain object suitable for JSON serialization.
     *
     * @returns An object containing the error name, message, validation issues, and raw data.
     */
    toJSON(): {
        name: string;
        message: string;
        errors: ZodIssue[];
        raw?: TRaw;
    } {
        return {
            name: this.name,
            message: this.message,
            errors: this.errors,
            raw: this.raw,
        };
    }
}