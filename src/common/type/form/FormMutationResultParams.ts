import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ZodTypeAny} from "zod";

/**
 * Parameters related to form submission mutation handling.
 *
 * @template TData - The type of data expected on successful submission.
 * @template TError - The type of error expected on submission failure.
 * @template TSchema - The Zod schema type used for validation.
 */
export type FormMutationOnSubmitParams<
    TData = unknown,
    TError = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /**
     * Optional Zod schema to validate form data before submission.
     */
    validationSchema?: TSchema;

    /**
     * Optional success message displayed after a successful submission.
     */
    successMessage?: string;

    /**
     * Callback invoked when form submission succeeds.
     * @param data - The optional data returned on success.
     */
    onSubmitSuccess?: (data?: TData) => void;

    /**
     * Optional error message displayed after a failed submission.
     */
    errorMessage?: string;

    /**
     * Callback invoked when form submission fails.
     * @param error - The optional error object returned on failure.
     */
    onSubmitError?: (error?: TError) => void;
};

/**
 * Parameters indicating whether the form is in editing mode.
 *
 * When `isEditing` is true, an `_id` must be provided representing
 * the entity being edited.
 *
 * When `isEditing` is false or undefined, no `_id` should be present.
 */
export type FormMutationEditingParams =
    {
        /**
         * Flag indicating the form is in editing mode.
         */
        isEditing: true;

        /**
         * The unique identifier of the entity being edited.
         */
        _id: ObjectId;
    } | {
        /**
         * Flag indicating the form is not in editing mode (default).
         */
        isEditing?: false;

        /**
         * No `_id` should be present when not editing.
         */
        _id?: never;
};

/**
 * Complete parameters for a form mutation, combining submission
 * handling and editing mode parameters.
 *
 * @template TData - The type of data expected on successful submission.
 * @template TError - The type of error expected on submission failure.
 * @template TSchema - The Zod schema type used for validation.
 */
export type FormMutationResultParams<
    TData = unknown,
    TError = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
> = FormMutationOnSubmitParams<TData, TError, TSchema> & (| FormMutationEditingParams);