import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * **GenreQueryFilterSchema**
 *
 * Zod schema that validates query parameters used for filtering genres.
 *
 * - `name` (optional):
 *   - Must be a non-empty string.
 *   - Minimum length: 3 characters.
 *   - Maximum length: 255 characters.
 *   - Used to match genre names in filter queries.
 *
 * @example
 * ```ts
 * GenreQueryFilterSchema.parse({ name: "Rock" });
 * // ✅ Passes validation
 *
 * GenreQueryFilterSchema.parse({ name: "Ro" });
 * // ❌ Throws ZodError: Must be 3 characters or longer.
 * ```
 */
export const GenreQueryFilterSchema = z.object({
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less.")
        .optional(),
});

/**
 * **GenreQuerySortSchema**
 *
 * Zod schema that validates query parameters used for sorting genre results.
 *
 * - `sortByName` (optional):
 *   - Must follow the `MongooseSortOrderSchema` (e.g., `1` for ascending, `-1` for descending).
 *   - Used to control the sort order of genres by their name.
 *
 * @example
 * ```ts
 * GenreQuerySortSchema.parse({ sortByName: 1 });
 * // ✅ Passes validation
 *
 * GenreQuerySortSchema.parse({ sortByName: -1 });
 * // ✅ Passes validation
 *
 * GenreQuerySortSchema.parse({ sortByName: 2 });
 * // ❌ Throws ZodError: Invalid enum value
 * ```
 */
export const GenreQuerySortSchema = z.object({
    sortByName: MongooseSortOrderSchema
        .optional(),
});

/**
 * **GenreQueryOptionSchema**
 *
 * Combined Zod schema that merges both {@link GenreQueryFilterSchema} and {@link GenreQuerySortSchema}.
 *
 * This schema allows validating query parameters that include both filtering
 * (e.g., `name`) and sorting options (e.g., `sortByName`) in a single object.
 *
 * - Inherits all rules from:
 *   - `GenreQueryFilterSchema`
 *   - `GenreQuerySortSchema`
 *
 * @example
 * ```ts
 * GenreQueryOptionSchema.parse({ name: "Rock", sortByName: 1 });
 * // ✅ Passes validation
 *
 * GenreQueryOptionSchema.parse({ name: "Ro", sortByName: 1 });
 * // ❌ Throws ZodError: "name" must be 3 characters or longer.
 *
 * GenreQueryOptionSchema.parse({ name: "Jazz", sortByName: 2 });
 * // ❌ Throws ZodError: Invalid enum value for sortByName
 * ```
 */
export const GenreQueryOptionSchema = GenreQueryFilterSchema.merge(GenreQuerySortSchema);