import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Configuration options that control how a form initializes and behaves at runtime.
 *
 * Enables fine-grained lifecycle and UI customization, including:
 * - disabling specific fields
 * - applying preset values before initialization
 * - auto-resetting after successful submission
 * - adapting form behavior based on the entity being edited
 *
 * @template TFormValues - Form value type managed by React Hook Form.
 * @template TForm - Payload type submitted to the server. Defaults to `TFormValues`.
 * @template TEntity - Entity type used for edit-mode behavior.
 *
 * @example
 * ```ts
 * const options: FormOptions<MyFormValues> = {
 *   disableFields: ["email", "createdAt"],
 *   presetValues: { username: "jane_doe" },
 *   resetOnSubmit: true,
 *   isPanel: false,
 *   editEntity: userEntity
 * };
 * ```
 */
export type FormOptions<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown
> = {
    /**
     * Form field keys that should be disabled in the UI.
     *
     * Common scenarios include:
     * - preventing edits to server-controlled attributes (e.g., `_id`, timestamps)
     * - enforcing permission-based read-only fields
     * - locking immutable values during edit operations
     */
    disableFields?: (keyof TFormValues)[];

    /**
     * Values applied during initial form hydration.
     *
     * Useful for:
     * - default values in creation flows
     * - preloading entity data in edit flows
     * - enforcing persistent presets regardless of external data
     */
    presetValues?: Partial<TForm>;

    /**
     * Whether to reset the form to its default state after a successful submit.
     *
     * Typically enabled when repeatedly creating entities or clearing inputs
     * after server mutations.
     */
    resetOnSubmit?: boolean;

    /**
     * Indicates that the form is rendered inside a panel-style container.
     *
     * May influence layout, spacing, or scrolling behavior.
     */
    isPanel?: boolean;

    /**
     * The entity currently being edited, if any.
     *
     * Enables edit-mode-aware functionality such as:
     * - conditional field rules based on entity state
     * - dynamic presets or validation
     * - contextual UI/logic depending on the resource being modified
     */
    editEntity?: TEntity;
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
    FormOptions<TFormValues, TForm, TEntity>;

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
