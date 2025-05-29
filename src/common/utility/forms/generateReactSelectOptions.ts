import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";

/**
 * Parameters for generating options compatible with `react-select` from generic data.
 *
 * @template TData - The type of the input data objects.
 * @template KLabel - The key in `TData` to use as the `label` for the option.
 * @template KValue - The key in `TData` to use as the `value` for the option.
 */
type GenerationParams<TData, KLabel extends keyof TData, KValue extends keyof TData> = {
    /** The array of input data to transform into select options. */
    data: TData[];

    /** The key in each object to be used as the label for the select option. */
    labelKey: KLabel;

    /** The key in each object to be used as the value for the select option. */
    valueKey: KValue;
};

/**
 * Transforms an array of objects into an array of `{ label, value }` options
 * suitable for use in libraries like `react-select`.
 *
 * @template TData - The object type of each entry in the data array.
 * @template KLabel - The property key to use as the option label.
 * @template KValue - The property key to use as the option value.
 *
 * @param params - An object containing the input data array, and the keys to extract label and value.
 * @returns An array of objects with `label` and `value` properties derived from the given keys.
 *
 * @example
 * ```ts
 * const people = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ];
 *
 * const options = generateReactSelectOptions({
 *   data: people,
 *   labelKey: "name",
 *   valueKey: "id"
 * });
 * // [{ label: "Alice", value: 1 }, { label: "Bob", value: 2 }]
 * ```
 */
export default function generateReactSelectOptions<TData, KLabel extends keyof TData, KValue extends keyof TData>(
    {data, labelKey, valueKey}: GenerationParams<TData, KLabel, KValue>
): ReactSelectOption<TData[KLabel], TData[KValue]>[] {
    return data.map(item => ({label: item[labelKey], value: item[valueKey]}));
}