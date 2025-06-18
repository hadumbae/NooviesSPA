/**
 * Represents a successful validation result.
 *
 * @template TReturn - The inferred type from the provided Zod schema.
 */
type ValidParseDataResults<TReturn> = {
    /**
     * Indicates that the validation was successful.
     */
    success: true;

    /**
     * The parsed and validated data.
     */
    data: TReturn;

    /**
     * Always `null` since there was no error.
     */
    error: null;
};

/**
 * Represents a failed validation result (i.e., schema parse error).
 */
type InvalidParseDataResults = {
    /**
     * Indicates that validation failed.
     */
    success: false;

    /**
     * Always `null` since the data could not be parsed.
     */
    data: null;

    /**
     * The error describing why validation failed.
     */
    error: Error;
};

/**
 * Represents a pending validation state (e.g., data is still loading).
 */
type PendingParseDataResults = {
    /**
     * Validation has not occurred yet (e.g., data is still pending).
     */
    success: false;

    /**
     * Always `null` since validation has not run.
     */
    data: null;

    /**
     * Always `null` since there's no error yet.
     */
    error: null;
};

/**
 * The union of all possible validation result states:
 * - Validated successfully
 * - Failed validation
 * - Waiting for data (pending)
 *
 * @template TReturn - The inferred type from the provided Zod schema.
 */
export type UseValidateDataResults<TReturn> =
    | ValidParseDataResults<TReturn>
    | InvalidParseDataResults
    | PendingParseDataResults;