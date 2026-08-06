/**
 * @fileoverview Type definitions for a polymorphic input component integrated with React Hook Form.
 */

import {Control, FieldValues, Path} from "react-hook-form";

/** Custom CSS class name overrides for sub-elements of the HookFormInput component. */
export type HookFormInputClassNames = {
    container?: string;
    input?: string;
    label?: string;
    text?: string;
};

/** Base control properties for form fields integrated with React Hook Form. */
export type HookFormInputControlProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label?: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    disabled?: boolean;
    hasLabel?: boolean;
    className?: string;
    classNames?: HookFormInputClassNames;
};

/** Props for text-based input types in the HookFormInput component. */
export type HookFormTextInputProps = {
    type?: "text" | "password" | "email" | "search" | "url";
    min?: never;
    max?: never;
    step?: never;
};

/** Props for number-based input types in the HookFormInput component. */
export type HookFormNumberInputProps = {
    type: "number";
    min?: number;
    max?: number;
    step?: number | string;
};

/** Props for date and time input types in the HookFormInput component. */
export type HookFormDateInputProps = {
    type: "date" | "datetime-local" | "month" | "week" | "time";
    min?: string;
    max?: string;
    step?: string | number;
};

/** Props for multi-line textarea inputs in the HookFormInput component. */
export type HookFormTextareaInputProps = {
    type: "textarea";
    min?: never;
    max?: never;
    step?: never;
    rows?: number;
    maxLength?: number;
};

/** Props for file input types in the HookFormInput component. */
export type HookFormFileInputProps = {
    type: "file";
    min?: never;
    max?: never;
    step?: never;
    placeholder?: never;
    multiple?: boolean;
    accept?: string;
};

/** Props for the polymorphic HookFormInput component. */
export type HookFormInputProps<TValues extends FieldValues> =
    HookFormInputControlProps<TValues> & (
    | HookFormTextInputProps
    | HookFormNumberInputProps
    | HookFormDateInputProps
    | HookFormTextareaInputProps
    | HookFormFileInputProps
    );