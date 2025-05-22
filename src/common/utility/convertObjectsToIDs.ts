/**
 * Represents any object that contains an `_id` field.
 */
interface HasID {
    _id: string;
}

/**
 * Extracts the `_id` string from an object or returns the input directly if it's already a string.
 *
 * This utility is helpful in APIs or components that accept either a full object with an `_id` or just the `_id` itself.
 *
 * @param obj - An object with an `_id` property or a string representing the ID.
 * @returns The extracted ID as a string.
 *
 * @example
 * ```ts
 * getIdFromObject({ _id: "abc123" }); // returns "abc123"
 * getIdFromObject("xyz789");         // returns "xyz789"
 * ```
 */
export default (obj: HasID | string): string => {
    if (obj != null && typeof obj === "object" && "_id" in obj) {
        return (obj as {_id: string})._id;
    }

    return obj as string;
}