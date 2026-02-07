/**
 * @file UnauthorisedError.ts
 *
 * Custom error representing an unauthorised access attempt.
 * Optionally carries redirect and source metadata for
 * client-side handling and logging.
 */

import {DateTime} from "luxon";

type ErrorProps = {
    /** Optional error message */
    message?: string;

    /** Optional path to redirect the user to */
    redirectPath?: string;

    /** Optional identifier describing where the error originated */
    source?: string;
};

/**
 * Error thrown when an action is attempted without
 * sufficient authorisation.
 *
 * Captures a UTC timestamp at instantiation time and
 * supports structured serialization for logging
 * and API responses.
 */
export class UnauthorisedError extends Error {
    /** Optional redirect target associated with the error */
    readonly redirectPath?: string;

    /** Timestamp indicating when the error was created */
    readonly timestamp: Date;

    /** Optional identifier describing the error source */
    readonly source?: string;

    constructor({message, redirectPath, source}: ErrorProps = {}) {
        super(message);

        this.name = "UnauthorisedError";

        this.source = source;
        this.redirectPath = redirectPath;
        this.timestamp = DateTime.now().toUTC().toJSDate();
    }

    /**
     * Returns a concise string representation of the error.
     */
    toString(): string {
        return `[${this.timestamp.toISOString()}] Unauthorised`;
    }

    /**
     * Serializes the error into a JSON-safe object.
     *
     * Includes stack trace for diagnostic purposes.
     */
    toJSON(): Record<string, unknown> {
        return {
            message: this.message,
            timestamp: this.timestamp.toISOString(),
            redirectPath: this.redirectPath,
            source: this.source,
            stack: this.stack,
        };
    }
}
