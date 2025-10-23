import {ZodTypeAny} from "zod";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Common parameters for handling mutation submissions, such as create or update operations.
 *
 * Provides configuration for validation, success/error messages, and optional callbacks.
 *
 * @template TData - The type of the successfully returned data
 * @template TSchema - The Zod schema type used for validation (if applicable)
 */
export type MutationOnSubmitParams<
    TData = unknown,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /**
     * Optional Zod schema used to validate data before submission or after receiving a response.
     */
    validationSchema?: TSchema;

    /**
     * Optional message displayed upon successful mutation.
     */
    successMessage?: string;

    /**
     * Callback fired when the mutation succeeds.
     *
     * @param data - The successfully returned data
     */
    onSubmitSuccess?: (data: TData) => void;

    /**
     * Optional message displayed when the mutation fails.
     */
    errorMessage?: string;

    /**
     * Callback fired when the mutation encounters an error.
     *
     * @param error - The error object returned from the mutation
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Parameters describing whether a mutation is in "edit" mode or "create" mode.
 *
 * When `isEditing` is `true`, an `_id` must be provided.
 * When `isEditing` is `false` or omitted, `_id` must not be present.
 *
 * Useful for differentiating between creating a new resource and updating an existing one.
 *
 * @example
 * ```ts
 * // Edit mode
 * const editParams: MutationEditByIDParams = {
 *   isEditing: true,
 *   _id: "6540fa..." as ObjectId
 * };
 *
 * // Create mode
 * const createParams: MutationEditByIDParams = {
 *   isEditing: false
 * };
 * ```
 */
export type MutationEditByIDParams =
    | {
    /** Indicates the form is in edit mode and requires an existing record ID. */
    isEditing: true;

    /** The unique identifier of the record being edited. */
    _id: ObjectId;
}
    | {
    /** Indicates the form is in create mode (default). */
    isEditing?: false;

    /** Must not be provided in create mode. */
    _id?: never;
};
