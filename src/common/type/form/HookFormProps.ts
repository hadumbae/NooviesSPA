import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

/**
 * Props describing the editing state of a form container.
 *
 * Used to differentiate between create and edit modes.
 *
 * @template TEntity - The type of the entity being edited.
 *
 * @remarks
 * - When `isEditing` is `true`, an `entity` must be provided.
 * - When `isEditing` is `false` or omitted, `entity` must not be set.
 */
export type FormContainerEditingProps<TEntity> =
    | {
    /** Indicates that the form is in editing mode. */
    isEditing: true;

    /** The entity to edit, used to populate the form. */
    entity: TEntity;
} | {
    /** Indicates that the form is in create mode (default). */
    isEditing?: false;

    /** Entity cannot be provided in create mode. */
    entity?: never;
};

/**
 * Props for a generic form container component that orchestrates form state,
 * optional preset values, field disabling, and submission mutation.
 *
 * @template TModel - Type of data returned by the submission mutation (e.g., created/updated entity).
 * @template TEntity - Optional entity type to edit (used when `isEditing` is `true`).
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 *
 * @remarks
 * Combines:
 * - `FormMutationOnSubmitParams<TModel>` for mutation callbacks.
 * - `FormContainerEditingProps<TEntity>` to indicate editing or creation mode.
 * - Optional UI/form props:
 *   - `disableFields`: array of keys from `TFormValues` to disable in the UI.
 *   - `presetValues`: object to prefill the form fields.
 */
export type FormContainerProps<
    TModel,
    TEntity,
    TFormValues extends FieldValues,
> = FormMutationOnSubmitParams<TModel> &
    FormContainerEditingProps<TEntity> &
    {
        /**
         * Optional array of form field keys to disable in the UI.
         *
         * Example: `['roleName', 'description']`
         */
        disableFields?: (keyof TFormValues)[];

        /**
         * Optional object of form field values to prefill the form.
         *
         * Only the fields specified will be set initially.
         */
        presetValues?: Partial<TFormValues>;
    };

/**
 * Props for a generic form view component that integrates React Hook Form with React Query mutations.
 *
 * @template TModel - The type of the data returned by the mutation.
 * @template TForm - The type of the form data sent to the mutation.
 * @template TFormValues - The type of the form values managed by React Hook Form. Must extend `FieldValues`.
 */
export type FormViewProps<TModel, TForm, TFormValues extends FieldValues> = {
    /**
     * The `useForm` hook return object from React Hook Form.
     * Provides methods and state for managing the form.
     */
    form: UseFormReturn<TFormValues>;

    /**
     * Function to handle form submission.
     * @see {@link SubmitHandler} from React Hook Form.
     */
    submitHandler: SubmitHandler<TFormValues>;

    /**
     * Mutation object from React Query used to perform async operations
     * (e.g., sending form data to a server).
     * @see {@link UseMutationResult} from React Query.
     */
    mutation: UseMutationResult<TModel, unknown, TForm>;

    /**
     * Optional array of field names (keys of `TFormValues`) that should be disabled in the form.
     */
    disableFields?: (keyof TFormValues)[];

    /**
     * Optional text to display on the form submit button.
     * Defaults to an empty string if not provided.
     */
    submitButtonText?: string;
}