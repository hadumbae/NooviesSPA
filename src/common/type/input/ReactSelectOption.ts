/**
 * Represents a generic option item for use with UI components like `react-select`.
 *
 * @template TLabel - The type of the label displayed to the user (commonly `string`).
 * @template TValue - The type of the internal value (e.g., string, number, ID, etc.).
 *
 * This structure is widely used in dropdowns, select menus, and autocomplete components.
 *
 * @example
 * ```ts
 * const option: ReactSelectOption<string, number> = {
 *   label: "Option A",
 *   value: 1
 * };
 * ```
 */
type ReactSelectOption<TLabel = string, TValue = any> = {
    /** The display label shown in the UI. */
    label: TLabel;

    /** The underlying value used for logic, form submission, etc. */
    value: TValue;
};

export default ReactSelectOption;