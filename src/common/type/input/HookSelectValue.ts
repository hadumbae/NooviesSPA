import { FieldValues, Path, PathValue } from "react-hook-form";
import { Key } from "react";

/**
 * Represents a single form field’s display and value metadata.
 *
 * This generic type is designed for use with `react-hook-form`, ensuring
 * that the `value` property is type-safe and corresponds to a valid field path
 * in the provided form data type.
 *
 * @template T - The form data type extending `FieldValues`.
 *
 * @property label - The human-readable label for the form field (e.g., "Email").
 * @property key - A unique React key for rendering field elements in lists.
 * @property value - The actual field value, inferred from the form data type via `PathValue<T, Path<T>>`.
 *
 * @example
 * ```ts
 * type LoginForm = { email: string; password: string };
 *
 * const emailField: FormFieldValue<LoginForm> = {
 *   label: "Email",
 *   key: "email",
 *   value: "user@example.com",
 * };
 * ```
 */
type FormFieldValue<T extends FieldValues> = {
    label: string;
    key: Key;
    value: PathValue<T, Path<T>>;
};

export default FormFieldValue;
