/**
 * Checks if the given array is a valid array and contains at least one item.
 *
 * @typeParam T - The type of the array elements.
 * @param arr - The array to check.
 * @returns `true` if the array is an array and contains at least one element; otherwise, `false`.
 *
 * @example
 * hasItems([1, 2, 3]); // true
 * hasItems([]); // false
 * hasItems(null as any); // false
 */
export default function hasItems<T>(arr: T[]) {
    return Array.isArray(arr) && arr.length > 0;
}