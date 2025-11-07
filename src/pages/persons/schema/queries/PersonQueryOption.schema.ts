import {z} from "zod";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";

/**
 * **PersonQueryFilterSchema**
 *
 * Zod schema defining all **filter parameters** available when querying `Person` documents.
 *
 * ### Fields
 * - `_id` — MongoDB ObjectID string (optional).
 * - `name` — Person’s name; empty strings are preprocessed to `undefined`.
 * - `dob` — Date of birth as a `yyyy-MM-dd` string.
 * - `nationality` — ISO 3166-1 alpha-2 country code.
 *
 * ### Behavior
 * - Empty strings are automatically converted to `undefined` for compatibility with form submissions.
 * - Ensures all provided filters conform to valid data formats.
 *
 * ### Example
 * ```ts
 * {
 *   name: "Alice",
 *   dob: "1992-04-12",
 *   nationality: "GB"
 * }
 * ```
 */
export const PersonQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyStringToUndefined(NonEmptyStringSchema.optional()),
    dob: DateOnlyStringSchema.optional(),
    nationality: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * **PersonQuerySortSchema**
 *
 * Zod schema defining all **sorting parameters** available when querying `Person` documents.
 *
 * ### Fields
 * - `sortByName` — Sort order for name (`asc` or `desc`).
 * - `sortByDOB` — Sort order for date of birth (`asc` or `desc`).
 * - `sortByNationality` — Sort order for nationality (`asc` or `desc`).
 *
 * ### Behavior
 * - Uses `preprocessEmptyStringToUndefined` to safely handle empty form inputs.
 * - Each field is optional, allowing partial sort configurations.
 * - Sort order values must comply with {@link MongooseSortOrderSchema}.
 *
 * ### Example
 * ```ts
 * {
 *   sortByName: "asc",
 *   sortByDOB: "desc"
 * }
 * ```
 */
export const PersonQuerySortSchema = z.object({
    sortByName: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByDOB: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByNationality: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
});

/**
 * **PersonQueryOptionsSchema**
 *
 * Combined Zod schema merging both:
 * - {@link PersonQueryFilterSchema} — Filter parameters.
 * - {@link PersonQuerySortSchema} — Sort options.
 *
 * Used to validate complete query parameters for retrieving `Person` documents.
 *
 * ### Example
 * ```ts
 * {
 *   name: "Bob",
 *   sortBy: "asc",
 *   nationality: "US"
 * }
 * ```
 */
export const PersonQueryOptionsSchema = PersonQuerySortSchema.merge(PersonQueryFilterSchema);
