/**
 * Represents an error thrown when a function receives an invalid or unexpected parameter.
 *
 * @remarks
 * The `ParamError` class extends the built-in `Error` class to provide additional context
 * about the function and parameter that caused the error. This is useful for debugging
 * and logging purposes, as it clearly indicates the source of the parameter-related issue.
 *
 * @example
 * ```ts
 * throw new ParamError({
 *   fnName: 'processData',
 *   paramName: 'input',
 *   message: 'Input must be a non-empty string.'
 * });
 * ```
 *
 * @public
 */
export class ParamError extends Error {
    /**
     * The name of the function where the error occurred.
     */
    fnName: string;

    /**
     * The name of the parameter that caused the error.
     */
    paramName: string;

    /**
     * Creates a new instance of `ParamError`.
     *
     * @param options - An object containing the function name, parameter name, and an optional error message.
     * @param options.fnName - The name of the function where the error occurred.
     * @param options.paramName - The name of the parameter that caused the error.
     * @param options.message - An optional custom error message.
     */
    constructor({ fnName, paramName, message }: {fnName: string, paramName: string, message?: string}) {
        super(message);

        this.fnName = fnName;
        this.paramName = paramName;
    }

    /**
     * Returns a string representation of the error, including the function and parameter names.
     *
     * @returns A string in the format: `[FunctionName | ParameterName] ErrorMessage`
     */
    toString(): string {
        return `[${this.fnName} | ${this.paramName}] ${this.message || "An Error Occurred."}`;
    }

    /**
     * Converts the error details to a JSON object.
     *
     * @returns An object containing the function name, parameter name, and error message.
     */
    toJSON(): Record<string, any> {
        return {
            fnName: this.fnName,
            paramName: this.paramName,
            message: this.message,
        };
    }
}