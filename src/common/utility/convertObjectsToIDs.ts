/**
 * Represents an object containing a unique identifier.
 *
 * This interface is commonly used to type objects that include an `_id` field,
 * such as Mongoose documents or references to database entities.
 */
interface HasID {
    /**
     * The unique identifier for the object.
     */
    _id: string;
}

/**
 * Extracts the `_id` string from a Mongoose document or returns the ObjectId string directly.
 *
 * @param obj - The input value, which can be:
 * - An object containing an `_id` field (e.g., a Mongoose document).
 * - A string representing an ObjectId.
 * - `undefined`.
 *
 * @returns The extracted ObjectId string if available; otherwise, returns `undefined`.
 */
export default (obj: HasID | string | undefined): string | undefined => {
    if (obj != null && typeof obj === "object" && "_id" in obj) {
        return (obj as {_id: string})._id;
    }

    return obj as string | undefined;
}