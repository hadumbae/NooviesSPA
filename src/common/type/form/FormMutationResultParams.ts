import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ZodTypeAny} from "zod";

/**
 * Parameters for form mutation submission handling.
 *
 * @template TData - Type of data returned on successful submission.
 * @template TError - Type of error passed to `onSubmitError`.
 * @template TSchema - Zod schema type used to validate input.
 */
export type FormMutationOnSubmitParams<
    TData = unknown,
    TError = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /**
     * Optional Zod schema used to validate form values at runtime.
     */
    validationSchema?: TSchema;

    /**
     * Optional message to display when the form submission succeeds.
     */
    successMessage?: string;

    /**
     * Callback invoked when submission succeeds.
     *
     * @param data - The submitted data returned by the operation.
     */
    onSubmitSuccess?: (data: TData) => void;

    /**
     * Optional message to display when the form submission fails.
     */
    errorMessage?: string;

    /**
     * Callback invoked when submission fails.
     *
     * @param error - The error object passed from the failure.
     */
    onSubmitError?: (error: TError) => void;
};

/**
 * Extended form mutation parameters including editing mode controls.
 *
 * Extends {@link FormMutationOnSubmitParams} with properties to handle
 * edit mode. Enforces that `_id` is present when `isEditing` is true,
 * and omitted otherwise.
 *
 * @template TData - Type returned on successful submission.
 * @template TError - Type of error passed to `onSubmitError`.
 * @template TSchema - Zod schema type for runtime input validation.
 */
export type FormMutationResultParams<
    TData = unknown,
    TError = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
> = FormMutationOnSubmitParams<TData, TError, TSchema> & (
    | {
    /** Indicates the form is in “edit existing item” mode. */
    isEditing: true;
    /** Identifier of the item being edited. Required when `isEditing` is true. */
    _id: ObjectId;
} | {
    /** Indicates the form is *not* in edit mode (new item). */
    isEditing?: false;
    /** `_id` must not be provided when not editing. */
    _id?: never;
});