import {ZodIssue} from "zod";

export class FetchError extends Error {
    errors: ZodIssue[];
    
    constructor({message, errors}: {message?: string, errors: ZodIssue[]}) {
        super(message);
        this.errors = errors;
    }
}