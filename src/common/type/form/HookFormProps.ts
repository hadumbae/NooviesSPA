import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { MutationOnSubmitParams } from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Configuration options for form behavior and initial values.
 *
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 * @template TForm - Type of the payload submitted to the mutation. Defaults to `TFormValues`.
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
    TForm extends FieldValues = TFormValues
> = {
    /** Keys of fields to disable in the form UI */
    disableFields?: (keyof TFormValues)[];

    /** Initial values to prefill the form */
    presetValues?: Partial<TForm>;

    /** Whether to reset the form after successful submission */
    resetOnSubmit?: boolean;
};

/**
 * Indicates whether a form is in "edit" or "create" mode.
 *
 * @template TEntity - Type of entity being edited.
 */
export type FormEditByEntityParams<TEntity = any> =
    | {
    /** Form is in edit mode */
    isEditing: true;

    /** Entity currently being edited */
    entity: TEntity;
}
    | {
    /** Form is in create mode (default) */
    isEditing?: false;

    /** Not used in create mode */
    entity?: never;
};

/**
 * Props for a generic form container that orchestrates:
 * - Form state & validation (React Hook Form)
 * - Create vs edit mode
 * - Submission callbacks & messages
 * - Optional UI customization
 *
 * @template TReturn - Type of data returned by the mutation (e.g., created/updated entity)
 * @template TEntity - Entity type being edited
 * @template TFormValues - Type of form values managed by React Hook Form
 * @template TForm - Payload type submitted to the mutation
 */
export type FormContainerProps<
    TReturn,
    TEntity,
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues
> = MutationOnSubmitParams<TReturn> &
    FormEditByEntityParams<TEntity> &
    FormOptions<TFormValues, TForm>;

/**
 * Props for a form view component that integrates:
 * - React Hook Form state & validation
 * - React Query mutation handling
 * - Optional UI configuration
 *
 * @template TReturn - Type of data returned by the mutation
 * @template TForm - Payload type submitted to the mutation
 * @template TFormValues - Type of form values managed by React Hook Form
 */
export type FormViewProps<
    TReturn,
    TForm extends FieldValues,
    TFormValues extends FieldValues
> = Omit<FormOptions<TFormValues>, "presetValues"> & {
    /** React Hook Form instance */
    form: UseFormReturn<TFormValues>;

    /** Form submission handler */
    submitHandler: SubmitHandler<TFormValues>;

    /** Mutation object from React Query */
    mutation: UseMutationResult<TReturn, unknown, TForm>;

    /** Submit button text */
    submitButtonText?: string;
};
