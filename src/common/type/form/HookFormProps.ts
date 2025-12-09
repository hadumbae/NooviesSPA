import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Configuration options for form initialization and runtime behavior.
 *
 * @template TFormValues - Form values type used by React Hook Form. Must extend `FieldValues`.
 * @template TForm - Payload type submitted on mutation. Defaults to `TFormValues`.
 *
 * @example
 * const options: FormOptions<MyFormValues> = {
 *   disableFields: ["email", "createdAt"],
 *   presetValues: { username: "jane_doe" },
 *   resetOnSubmit: true,
 *   isPanel: false
 * };
 */
export type FormOptions<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues> = {
    /**
     * Form field keys to disable within the UI.
     * Useful for preventing edits to server-controlled or immutable values.
     */
    disableFields?: (keyof TFormValues)[];

    /**
     * Optional initial values used to prefill the form.
     * Allows for controlled population of existing entities or defaults.
     */
    presetValues?: Partial<TForm>;

    /**
     * If true, the form will reset to its default state
     * after a successful submission.
     */
    resetOnSubmit?: boolean;

    /**
     * Whether the form is rendered inside a panel-style UI container.
     * Can influence layout, scroll, or padding behavior.
     */
    isPanel?: boolean;
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
