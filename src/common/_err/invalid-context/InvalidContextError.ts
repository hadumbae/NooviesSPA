/**
 * @fileoverview Error class and types for handling invalid or missing React context.
 */

import {InvalidContextErrorCode} from "@/common/_err/invalid-context/InvalidContextErrorCodeSchema.ts";

/** Configuration object for initializing an InvalidContextError. */
type InvalidContextErrorConfig = {
    message?: string;
    code: InvalidContextErrorCode;
    contextName?: string;
};

/** Shape of the serialized InvalidContextError object. */
type JSONReturns = {
    code: InvalidContextErrorCode;
    message?: string;
    contextName?: string;
    stack?: string;
}

/** Error thrown when a required context is missing or in an invalid state. */
export class InvalidContextError extends Error {
    public readonly code: InvalidContextErrorCode;
    public readonly contextName?: string;

    constructor({message, contextName, code}: InvalidContextErrorConfig) {
        super(message);

        this.code = code;
        this.contextName = contextName;
        this.name = this.constructor.name;
    }

    public toString(): string {
        return `[${this.code}] ${this.message}`;
    }

    public toJSON(): JSONReturns {
        return {
            message: this.message,
            code: this.code,
            contextName: this.contextName,
            stack: this.stack
        }
    }
}