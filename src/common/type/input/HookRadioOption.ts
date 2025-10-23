/**
 * Represents an individual option within a radio group, typically used with form hooks and ShadCN UI components.
 *
 * Each option includes a display `label` and a corresponding internal `value`.
 *
 * Commonly used when mapping over options to render radio group items in controlled form components.
 *
 * @example
 * ```ts
 * const genderOptions: HookRadioOption[] = [
 *   { label: "Male", value: "male" },
 *   { label: "Female", value: "female" },
 *   { label: "Other", value: "other" }
 * ];
 * ```
 */
type HookRadioOption = {label: string, value: any};

export default HookRadioOption;