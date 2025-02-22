import {ZodIssue} from "zod";

export class ParseError extends Error {
    errors: ZodIssue[];
    
    constructor({message, errors}: {message?: string, errors: ZodIssue[]}) {
        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);

        this.name = this.constructor.name;
        this.errors = errors;
    }

    toString(): string {
        return `[${this.name}] ${this.message || "An Error Occurred."}`;
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            errors: this.errors,
        };
    }
}