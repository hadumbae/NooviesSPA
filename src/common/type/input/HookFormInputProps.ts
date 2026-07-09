/**
 * @fileoverview Type definitions for a polymorphic input component integrated with React Hook Form.
 *
 */

import {Control, FieldValues, Path} from "react-hook-form";

/** Base configuration for form fields managed by React Hook Form. */
export type HookFormInputControlProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label?: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    disabled?: boolean;
    hasLabel?: boolean;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    classNames?: {
        container?: string;
        input?: string;
        label?: string;
    };
};

/** Props for standard text-based input fields. */
export type HookFormTextInputProps = {
    type?: "text" | "password" | "email" | "search" | "url";
    min?: never;
    max?: never;
    step?: never;
};

/** Props for numeric input fields. */
export type HookFormNumberInputProps = {
    type: "number";
    min?: number;
    max?: number;
    step?: number | string;
};

/** Props for date and time input fields. */
export type HookFormDateInputProps = {
    type: "date" | "datetime-local" | "month" | "week" | "time";
    min?: string;
    max?: string;
    step?: string | number;
};

/** Props for multi-line textarea fields. */
export type HookFormTextareaInputProps = {
    type: "textarea";
    min?: never;
    max?: never;
    step?: never;
    rows?: number;
    maxLength?: number;
};

/** Props for file upload fields. */
export type HookFormFileInputProps = {
    type: "file";
    min?: never;
    max?: never;
    step?: never;
    placeholder?: never;
    multiple?: boolean;
    accept?: string;
};

/** Discriminated union of props for the HookFormInput component. */
export type HookFormInputProps<TValues extends FieldValues> =
    HookFormInputControlProps<TValues> & (
    | HookFormTextInputProps
    | HookFormNumberInputProps
    | HookFormDateInputProps
    | HookFormTextareaInputProps
    | HookFormFileInputProps
    );