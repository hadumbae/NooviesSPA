/**
 * Represents a successful result from a validated query.
 *
 * @template TData - The type of the successfully returned data.
 */
type ValidReturnData<TData> = {
    /** The successfully retrieved data. */
    data: TData;

    /** Indicates that the operation was successful. */
    success: true;

    /** Always `null` in a successful response. */
    error: null;
};

/**
 * Represents a failed result from a validated query.
 */
type InvalidReturnData = {
    /** Always `null` in a failed response. */
    data: null;

    /** Indicates that the operation failed. */
    success: false;

    /** The error object describing the failure, or `null` if unknown. */
    error: Error | null;
};

/**
 * A union type representing the result of a validated query,
 * either a successful response with data, or a failure with an error.
 *
 * @template TReturnData - The type of data expected on success.
 *
 * @example
 * ```ts
 * const result: ValidatedQueryReturns<User> =
 *   Math.random() > 0.5
 *     ? { data: user, success: true, error: null }
 *     : { data: null, success: false, error: new Error("Failed to fetch user") };
 * ```
 */
export type ValidatedQueryReturns<TReturnData> =
    | ValidReturnData<TReturnData>
    | InvalidReturnData;