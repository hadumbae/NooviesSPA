/**
 * @file Custom Error class for managing and formatting client-side routing failures.
 * @filename RouteError.ts
 */

/**
 * Configuration for initializing a RouteError.
 * ---
 */
export type RouteErrorConfig = {
    /** Brief user-facing message describing the error. */
    message: string;
    /** The main heading to display in the UI (e.g., "Not Found"). */
    headerText: string;
    /** Optional detailed context or debugging instructions. */
    description?: string;
}

/**
 * Specialized Error class for routing and navigation failures.
 * ---
 */
export class RouteError extends Error {
    /** Primary display title for the error view. */
    readonly headerText: string;
    /** Expanded details regarding the routing failure. */
    readonly description?: string;

    constructor({message, description, headerText}: RouteErrorConfig) {
        super(message ?? "An Unknown Error Occurred");

        this.headerText = headerText ?? "Error";
        this.description = description;
    }

    /** Returns a formatted string representation of the error. */
    toString(): string {
        return `[${this.headerText}] ${this.message}`;
    }

    /** Serializes the error into a plain object for logging and network transmission. */
    toJSON(): Record<string, unknown> {
        return {
            message: this.message,
            headerText: this.headerText,
            description: this.description,
            stack: this.stack,
        };
    }
}