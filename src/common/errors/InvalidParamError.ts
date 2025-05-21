export class InvalidParamError extends Error {
    data: any;

    constructor({message, data}: { message?: string, data?: any }) {
        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidParamError);

        this.name = this.constructor.name;
        this.data = data;
    }

    /**
     * Returns a string representation of the InvalidParamError instance.
     *
     * @returns {string} A string describing the error.
     */
    toString(): string {
        return `[${this.name}] ${this.message || "Invalid Parameter."}`;
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
            data: this.data,
        };
    }
}