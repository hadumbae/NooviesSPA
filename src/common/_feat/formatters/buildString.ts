/**
 * @fileoverview Utility for constructing formatted strings from mixed input types.
 */

/** Concatenates valid strings and numbers into a single string using a specified separator. */
export function buildString(args: unknown[], separator: string = " "): string {
    return args
        .filter(arg => typeof arg === "number" || (typeof arg === "string" && arg.trim() !== ""))
        .map(arg => `${arg}`)
        .join(separator);
}
