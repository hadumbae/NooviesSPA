/**
 * Represents a successful return data structure.
 *
 * @template TData - The type of the successful `data` payload.
 */
type ValidReturnData<TData> = {
    /** The successfully parsed data. */
    data: TData;

    /** Indicates the parse operation was successful. */
    parseSuccess: true;

    /** No parse error occurred, so this is always `null`.*/
    parseError: null;
};

/**
 * Represents a failed return data structure.
 */
type InvalidReturnData = {
    /** Data is `null` because parsing failed. */
    data: null;

    /** Indicates the parse operation failed. */
    parseSuccess: false;

    /** The error that caused the parse to fail, or `null` if unknown. */
    parseError: Error | null;
};

/**
 * The full return type of the fetch operation, combining fetch state and parsing results.
 *
 * @template TReturnData - The type of the successful `data` payload.
 */
export type FetchHookReturns<TReturnData> = {
    /** Indicates whether the fetch operation is currently pending. */
    isPending: boolean;

    /** Indicates whether the fetch operation encountered an error. */
    isError: boolean;

    /** The error from the fetch operation, or `null` if none. */
    queryError: Error | null;
} & (ValidReturnData<TReturnData> | InvalidReturnData);