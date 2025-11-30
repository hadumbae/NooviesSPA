import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Configuration options for a form's UI behavior and default values.
 *
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 * @template TForm - Type of the complete form data model. Defaults to `TFormValues`.
 *
 * @example
 * ```ts
 * const formOptions: FormOptions<MyFormValues> = {
 *   disableFields: ['email', 'createdAt'],
 *   presetValues: { username: 'jane_doe' },
 *   resetOnSubmit: true
 * };
 * ```
 */
export type FormOptions<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
> = {
    /**
     * Array of form field keys to disable in the UI.
     *
     * Useful for preventing editing of certain fields in update forms
     * or in restricted contexts.
     *
     * @example
     * ```ts
     * disableFields: ['email', 'createdAt']
     * ```
     */
    disableFields?: (keyof TFormValues)[];

    /**
     * Initial values used to prefill the form.
     *
     * Only the provided keys are applied. Commonly used for
     * edit forms or restoring saved drafts.
     *
     * @example
     * ```ts
     * presetValues: { username: 'jane_doe' }
     * ```
     */
    presetValues?: Partial<TForm>;

    /**
     * Whether to reset the form to its initial values after successful submission.
     *
     * Defaults to `false` if not specified.
     *
     * @example
     * ```ts
     * resetOnSubmit: true
     * ```
     */
    resetOnSubmit?: boolean;
};


/**
 * Indicates whether a form is in create or edit mode, and if editing,
 * includes the entity being modified.
 *
 * @template TEntity - Type of the entity being edited.
 */
export type FormEditByEntityParams<TEntity = any> =
    | {
    /** Indicates the form is in editing mode. */
    isEditing: true;

    /** The entity currently being edited. */
    entity: TEntity;
} | {
    /** Indicates the form is in create mode (default). */
    isEditing?: false;

    /** No entity is provided in create mode. */
    entity?: never;
};

/**
 * Props for a generic form container component that orchestrates:
 *
 * - Form state and validation (React Hook Form)
 * - Create vs. Edit mode behavior
 * - Submission callbacks and messages
 * - Optional UI-level configuration (disable/preset fields)
 *
 * @template TModel - Type of data returned by the submission mutation (e.g., created/updated entity).
 * @template TEntity - Entity type to edit (used when `isEditing` is `true`).
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 * @template TForm - Type of the data payload submitted to the mutation. Defaults to `TFormValues`.
 *
 * @remarks
 * Combines:
 * - {@link MutationOnSubmitParams} for mutation handlers and messages.
 * - {@link FormEditByEntityParams} to manage create/edit mode.
 * - {@link FormOptions} for UI customization and prefill support.
 */
export type FormContainerProps<
    TModel,
    TEntity,
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
> = MutationOnSubmitParams<TModel> &
    FormEditByEntityParams<TEntity> &
    FormOptions<TFormValues, TForm>;

/**
 * Props for a form view component that integrates:
 *
 * - React Hook Form (state & validation)
 * - React Query (mutation handling)
 * - Optional UI configuration (disabled fields, submit button text)
 *
 * @template TModel - Type of data returned by the mutation (e.g., API response or entity).
 * @template TForm - Type of the payload submitted to the mutation.
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 */
export type FormViewProps<
    TModel,
    TForm extends FieldValues,
    TFormValues extends FieldValues,
> = Omit<FormOptions<TFormValues>, "presetValues"> & {
    /**
     * The React Hook Form instance.
     *
     * Provides access to form state, validation, and helper
     * methods such as `register`, `handleSubmit`, and `watch`.
     */
    form: UseFormReturn<TFormValues>;

    /**
     * Function to handle form submission.
     *
     * Typically wrapped with `form.handleSubmit` from React Hook Form.
     *
     * @see {@link SubmitHandler}
     */
    submitHandler: SubmitHandler<TFormValues>;

    /**
     * React Query mutation object responsible for executing
     * the asynchronous submit action (e.g., API request).
     *
     * Provides methods (`mutate`, `reset`) and state
     * (`isLoading`, `isError`, etc.).
     *
     * @see {@link UseMutationResult}
     */
    mutation: UseMutationResult<TModel, unknown, TForm>;

    /**
     * Text displayed on the submit button.
     *
     * Defaults to an empty string if not provided.
     */
    submitButtonText?: string;
};
