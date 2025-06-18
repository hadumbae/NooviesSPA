import {ZodTypeAny} from "zod";

/**
 * Parameters for the `useValidateData` hook.
 *
 * @template TSchema - A Zod schema type used to validate the data.
 */
export type UseValidateDataParams<TSchema extends ZodTypeAny> = {
    /**
     * The raw data to validate. This is typically the output from a data-fetching hook.
     */
    data: unknown;

    /**
     * The Zod schema used to validate and parse the provided data.
     */
    schema: TSchema;

    /**
     * Optional custom error message used when validation fails.
     * If omitted, a default message will be used.
     */
    message?: string;

    /**
     * Whether the data is still being fetched or is not yet ready for validation.
     * If true, validation is skipped and the result is marked as pending.
     */
    isPending?: boolean;
};