/**
 * @fileoverview Utility for constructing structured logging context objects.
 */

/** Represents a single key-value pair for a logging context. */
export type LoggerContextKeyData = {
    key: string;
    value: unknown;
};

/** Converts an array of context data into a record, filtering out null or undefined values. */
export function buildContext(
    values: LoggerContextKeyData[]
): Record<string, unknown> {
    const filteredValues = values
        .filter((val) => val.value !== undefined && val.value !== null)
        .map(({key, value}) => [key, value]);

    return Object.fromEntries(filteredValues);
}
