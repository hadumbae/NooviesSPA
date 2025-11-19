/**
 * @file HookFormInputTypes.ts
 * @description
 * Defines type-safe props for a generic `HookFormInput` component integrated with React Hook Form.
 * Supports multiple input types including:
 * - Textual inputs (`text`, `password`, `email`, `search`, `url`)
 * - Number inputs
 * - Date/time inputs
 * - Textarea inputs
 * - File inputs
 *
 * Uses generics (`TValues extends FieldValues`) to enforce type safety with `react-hook-form`.
 * Combines control binding, label, description, and type-specific attributes in a single type.
 *
 * @example
 * ```ts
 * const inputProps: HookFormInputProps<FormValues> = {
 *   name: "age",
 *   label: "Age",
 *   type: "number",
 *   control: form.control,
 *   min: 0,
 *   max: 120,
 *   step: 1,
 * };
 * ```
 */

import {Control, FieldValues, Path} from "react-hook-form";

/**
 * Base props shared by all HookForm input types.
 *
 * @template TValues - The type of form values from `react-hook-form`.
 */
export type HookFormInputControlProps<TValues extends FieldValues> = {
    /** Name of the field in the form schema. */
    name: Path<TValues>;

    /** Label displayed above the input. */
    label: string;

    /** Optional description displayed under the input. */
    description?: string;

    /** Placeholder text for the input (not used by all types). */
    placeholder?: string;

    /** React Hook Form control object for managing state. */
    control: Control<any>;

    /** Whether the input is disabled. */
    disabled?: boolean;

    /** Whether the label is rendered (default: true). */
    hasLabel?: boolean;

    /** Optional additional CSS class for styling. */
    className?: string;
};

/**
 * Props specific to textual inputs (text, password, email, search, url).
 */
export type HookFormTextInputProps = {
    type?: "text" | "password" | "email" | "search" | "url";
    min?: never;
    max?: never;
    step?: never;
};

/**
 * Props specific to number inputs.
 */
export type HookFormNumberInputProps = {
    type: "number";
    min?: number;
    max?: number;
    step?: number | string;
};

/**
 * Props specific to date/time inputs.
 */
export type HookFormDateInputProps = {
    type: "date" | "datetime-local" | "month" | "week" | "time";
    min?: string;
    max?: string;
    step?: string | number;
};

/**
 * Props specific to textarea inputs.
 */
export type HookFormTextareaInputProps = {
    type: "textarea";
    min?: never;
    max?: never;
    step?: never;
    /** Number of rows for the textarea */
    rows?: number;
    /** Maximum allowed characters */
    maxLength?: number;
};

/**
 * Props specific to file inputs.
 */
export type HookFormFileInputProps = {
    type: "file";
    min?: never;
    max?: never;
    step?: never;
    /** Placeholder is not applicable for file inputs */
    placeholder?: never;
    /** Allow multiple file selection */
    multiple?: boolean;
    /** Accepted file types (e.g., "image/*") */
    accept?: string;
};

/**
 * Combined props for `HookFormInput`, merging control props with type-specific props.
 *
 * Supports all input types defined above with full type safety.
 *
 * @template TValues - The type of form values from `react-hook-form`.
 */
export type HookFormInputProps<TValues extends FieldValues> =
    HookFormInputControlProps<TValues> & (
    | HookFormTextInputProps
    | HookFormNumberInputProps
    | HookFormDateInputProps
    | HookFormTextareaInputProps
    | HookFormFileInputProps
    );
