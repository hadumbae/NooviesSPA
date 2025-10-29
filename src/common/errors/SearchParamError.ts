import { ZodIssue } from "zod";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import logger from "@/common/utility/features/logger/Logger.ts";

type ConstructorParams<TRaw = unknown> = {
    /** Optional error message. Defaults to a generic search params error message. */
    message?: string;

    /** The raw search parameters that caused the error. */
    raw: TRaw;

    /** Array of Zod issues representing validation errors. */
    errors: ZodIssue[];

    /** Optional URL associated with the error. */
    url?: string;

    /** Optional component name where the error occurred. */
    component?: string;
};

type JSONReturns<TRaw = unknown> = {
    /** The name of the error class. */
    name: string;

    /** The error message. */
    message: string;

    /** Validation errors captured from Zod. */
    errors: ZodIssue[];

    /** Optional URL associated with the error. */
    url?: string;

    /** Optional component name where the error occurred. */
    component?: string;

    /** The raw search parameters that caused the error. */
    raw?: TRaw;
};

/**
 * Custom error class for handling search parameter validation errors.
 *
 * @template TRaw Type of the raw search parameters that caused the error. Defaults to `unknown`.
 *
 * @example
 * ```ts
 * const error = new SearchParamError({
 *   raw: { page: "abc" },
 *   errors: zSchema.parseErrors,
 *   url: window.location.href,
 *   component: "SearchForm",
 * });
 * error.log();
 * console.log(error.toJSON());
 * ```
 */
export default class SearchParamError<TRaw = unknown> extends Error {
    /** The raw search parameters that caused the error. */
    raw: TRaw;

    /** Array of Zod validation issues. */
    errors: ZodIssue[];

    /** Optional URL where the error occurred. */
    url?: string;

    /** Optional component name where the error occurred. */
    component?: string;

    /**
     * Creates a new `SearchParamError`.
     *
     * @param params - Constructor parameters including message, raw data, validation errors, URL, and component.
     */
    constructor({ message, raw, errors, url, component }: ConstructorParams<TRaw>) {
        super(message ?? "An error occurred with the search params.");

        this.raw = raw;
        this.errors = errors;
        this.url = url;
        this.component = component;
    }

    /**
     * Logs the error using the application logger with contextual information.
     */
    log() {
        const context = buildContext([
            { key: "url", value: this.url },
            { key: "component", value: this.component },
            { key: "errors", value: this.errors },
            { key: "raw", value: this.raw },
        ]);

        logger.error({ type: "ERROR", error: this, context, msg: this.message });
    }

    /**
     * Returns a concise string representation of the error,
     * including the paths of all Zod issues.
     *
     * @returns Formatted error string.
     */
    toString(): string {
        const errorKeys = this.errors.map(e => e.path.join(".")).join(", ");
        return `[${this.name}] Error in search params: ${errorKeys}`;
    }

    /**
     * Returns a JSON-serializable object representing the error.
     *
     * @returns An object containing name, message, errors, raw data, URL, and component.
     */
    toJSON(): JSONReturns {
        return {
            name: this.name,
            message: this.message,
            errors: this.errors,
            raw: this.raw,
            url: this.url,
            component: this.component,
        };
    }
}
