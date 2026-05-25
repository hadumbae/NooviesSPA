/**
 * @fileoverview Defines a generic option structure for select and autocomplete components.
 */

/**
 * Represents a generic option item for use with UI components like react-select.
 */
export type ReactSelectOption<TValue = any> = {
    label: string;
    value: TValue;
};
