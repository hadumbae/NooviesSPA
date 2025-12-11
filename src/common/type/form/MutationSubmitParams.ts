import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {FieldValues, UseFormReturn} from "react-hook-form";

/**
 * Base parameters for handling form-related mutations (create, update, etc.).
 *
 * Provides optional success/error messages and lifecycle callbacks.
 *
 * @template TReturn - Data type returned on successful mutation.
 */
export type MutationOnSubmitParams<TReturn = unknown> = {
    /** Message shown on successful mutation. */
    successMessage?: string;

    /**
     * Called when the mutation succeeds.
     *
     * @param data - The value returned by the mutation.
     */
    onSubmitSuccess?: (data: TReturn) => void;

    /** Message shown when the mutation fails. */
    errorMessage?: string;

    /**
     * Called when the mutation fails.
     *
     * @param error - The thrown error from the mutation.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Parameters describing whether the mutation is for creating or editing a record.
 *
 * - When `isEditing: true`, `_id` **must** be provided.
 * - When creating, omit `isEditing` or set it to `false`; `_id` must not be present.
 *
 * @example
 * ```ts
 * // Editing an existing entry
 * const editParams: MutationEditByIDParams = {
 *   isEditing: true,
 *   _id: "6540fa..." as ObjectId,
 * };
 *
 * // Creating a new entry
 * const createParams: MutationEditByIDParams = {
 *   isEditing: false,
 * };
 * ```
 */
export type MutationEditByIDParams =
    | {
    /** Marks the mutation as editing an existing record. */
    isEditing: true;
    /** ID of the record being edited. */
    _id: ObjectId;
}
    | {
    /** Marks the mutation as creating a new record (default). */
    isEditing?: false;
    /** ID must not be provided in create mode. */
    _id?: never;
};

/**
 * Combined parameters required for submitting a mutation from a form.
 *
 * Used by higher-level mutation hooks to unify form handling,
 * submission lifecycle behavior, and optional editing.
 *
 * @template TFormValues - React Hook Form value type.
 * @template TReturn - Mutation return type.
 */
export type SubmitMutationParams<
    TFormValues extends FieldValues,
    TReturn = unknown
> = MutationOnSubmitParams<TReturn> & {
    /** The React Hook Form instance controlling the form. */
    form: UseFormReturn<TFormValues>;

    /**
     * Optional ID of the record being edited.
     * If present, the hook should treat the operation as an update.
     */
    editID?: ObjectId;
};
