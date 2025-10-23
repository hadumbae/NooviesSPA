import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Optional configuration for a form’s UI behavior.
 *
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 */
export type FormOptions<TFormValues extends FieldValues> = {
    /**
     * Array of form field keys to disable in the UI.
     *
     * This is useful for preventing editing of specific fields
     * depending on context (e.g., when updating an entity).
     *
     * @example
     * ```ts
     * disableFields: ['roleName', 'description']
     * ```
     */
    disableFields?: (keyof TFormValues)[];

    /**
     * Initial values used to prefill the form.
     *
     * Only the provided fields will be set. Useful for edit forms
     * where partial data should populate the inputs initially.
     */
    presetValues?: Partial<TFormValues>;
};

/**
 * Parameters that describe whether a form is in editing mode and,
 * if so, the entity being edited.
 *
 * @template TEntity - The shape of the entity being edited.
 */
export type FormEditByEntityParams<TEntity = any> =
    | {
    /** Indicates the form is in editing mode. */
    isEditing: true;

    /** The entity instance currently being edited. */
    entity: TEntity;
} | {
    /** Indicates the form is in create mode (default). */
    isEditing?: false;

    /** Entity is not provided in create mode. */
    entity?: never;
};

/**
 * Props for a generic form container component that orchestrates:
 *
 * - Form state and validation
 * - Handling create vs. edit mode
 * - Submission callbacks and messages
 * - Optional UI field configuration (disable/preset values)
 *
 * @template TModel - Type of data returned by the submission mutation (e.g., created/updated entity).
 * @template TEntity - Entity type to edit (required if `isEditing` is `true`).
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 *
 * @remarks
 * Combines:
 * - {@link MutationOnSubmitParams} for mutation callbacks and messages.
 * - {@link FormEditByEntityParams} to indicate create or edit mode.
 * - {@link FormOptions} for optional UI-level behavior.
 */
export type FormContainerProps<
    TModel,
    TEntity,
    TFormValues extends FieldValues,
> = MutationOnSubmitParams<TModel> &
    FormEditByEntityParams<TEntity> &
    FormOptions<TFormValues>;

/**
 * Props for a generic form view component that integrates:
 *
 * - React Hook Form (form state & validation)
 * - React Query (mutations)
 * - Optional UI controls (field disabling, submit button text)
 *
 * @template TModel - Type of the data returned by the mutation (e.g., entity or API response).
 * @template TForm - Type of the payload submitted to the mutation (often matches TFormValues).
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 */
export type FormViewProps<TModel, TForm, TFormValues extends FieldValues> =
    Omit<FormOptions<TFormValues>, "presetValues"> & {
    /**
     * The React Hook Form instance.
     *
     * Provides access to form state, validation, and utility methods
     * such as `register`, `handleSubmit`, and `watch`.
     */
    form: UseFormReturn<TFormValues>;

    /**
     * Function to handle form submission.
     *
     * Typically passed to `form.handleSubmit` from React Hook Form.
     *
     * @see {@link SubmitHandler}
     */
    submitHandler: SubmitHandler<TFormValues>;

    /**
     * React Query mutation object responsible for executing
     * the asynchronous submit action (e.g., API request).
     *
     * Provides state (`isLoading`, `isError`, etc.) and methods
     * (`mutate`, `reset`) to control the mutation.
     *
     * @see {@link UseMutationResult}
     */
    mutation: UseMutationResult<TModel, unknown, TForm>;

    /**
     * Text displayed on the form’s submit button.
     *
     * Defaults to an empty string if not provided.
     */
    submitButtonText?: string;
};
