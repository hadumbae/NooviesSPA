/**
 * @file Type definitions for a polymorphic, typed input component integrated with React Hook Form.
 * @filename HookFormInputTypes.ts
 */

import {Control, FieldValues, Path} from "react-hook-form";

/**
 * Base configuration for any form field managed by React Hook Form.
 * ---
 * @template TValues - The structure of the form state.
 */
export type HookFormInputControlProps<TValues extends FieldValues> = {
    /** The key in the form schema this input maps to. */
    name: Path<TValues>;

    /** Primary label text for the field. */
    label?: string;

    /** Supplementary text providing instructions or context. */
    description?: string;

    /** Text displayed inside the input when empty. */
    placeholder?: string;

    /** The RHF control object used to register the field. */
    control: Control<any>;

    /** If true, prevents user interaction. */
    disabled?: boolean;

    /** Visual toggle for the label element. @default true */
    hasLabel?: boolean;

    /** Tailwind classes for the outermost `FormItem` container. */
    className?: string;

    /** Tailwind classes applied directly to the `Input` or `Textarea` element. */
    inputClassName?: string;
};

/**
 * Props for standard text-based fields.
 */
export type HookFormTextInputProps = {
    type?: "text" | "password" | "email" | "search" | "url";
    min?: never;
    max?: never;
    step?: never;
};

/**
 * Props for numeric fields, including range constraints.
 */
export type HookFormNumberInputProps = {
    type: "number";
    min?: number;
    max?: number;
    /** The interval between valid numbers (e.g., "0.01" for currency). */
    step?: number | string;
};

/**
 * Props for temporal fields using native browser pickers.
 */
export type HookFormDateInputProps = {
    type: "date" | "datetime-local" | "month" | "week" | "time";
    /** ISO format string (YYYY-MM-DD) for minimum allowed date. */
    min?: string;
    /** ISO format string (YYYY-MM-DD) for maximum allowed date. */
    max?: string;
    step?: string | number;
};

/**
 * Props for multi-line text areas.
 */
export type HookFormTextareaInputProps = {
    type: "textarea";
    min?: never;
    max?: never;
    step?: never;
    /** The visible height of the text area in lines. */
    rows?: number;
    /** Character limit enforcement at the browser level. */
    maxLength?: number;
};

/**
 * Props for file uploads. Note: placeholders are restricted by browser security.
 */
export type HookFormFileInputProps = {
    type: "file";
    min?: never;
    max?: never;
    step?: never;
    placeholder?: never;
    /** Enable selection of multiple files. */
    multiple?: boolean;
    /** File type filter (e.g., "image/*" or ".pdf"). */
    accept?: string;
};

/**
 * Union type that discriminates based on the `type` property to provide accurate HTML attributes.
 * ---
 * ### Pattern
 * Uses TypeScript's Discriminated Unions to prevent logically impossible prop combinations
 * (e.g., preventing `rows` on a `number` input or `min` on a `file` input).
 * ---
 * @template TValues - The inferred form values from the parent schema.
 */
export type HookFormInputProps<TValues extends FieldValues> =
    HookFormInputControlProps<TValues> & (
    | HookFormTextInputProps
    | HookFormNumberInputProps
    | HookFormDateInputProps
    | HookFormTextareaInputProps
    | HookFormFileInputProps
    );