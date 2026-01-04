/**
 * @file RequestParamTypes.ts
 *
 * Shared request parameter type definitions.
 */

/**
 * Generic payload type for submit requests.
 *
 * Represents an arbitrary key–value map sent to an API endpoint.
 */
export type RequestSubmitData = Record<string, unknown>;
