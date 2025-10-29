import {z} from "zod";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Schema for filtering queries against Person records.
 *
 * Used to specify criteria to narrow down the results of a query.
 * All fields are optional filters.
 *
 * ### Filterable Fields:
 * - `_id` — Person ID string, typically a MongoDB ObjectId in string form.
 * - `name` — Person's name, may be undefined or a string, used for filtering by name.
 * - `nationality` — ISO 3166-1 alpha-2 country code, filters by person's nationality.
 */
export const PersonQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyStringToUndefined(NonEmptyStringSchema.optional()),
    nationality: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * Schema for specifying sort order when querying Person records.
 *
 * Allows sorting by specified fields in ascending or descending order.
 *
 * ### Sortable Fields:
 * - `name` — Sort by name field.
 * - `nationality` — Sort by nationality field.
 *
 * The values must conform to {@link MongooseSortOrderSchema} which typically accepts `"asc"` or `"desc"`.
 */
export const PersonQuerySortSchema = z.object({
    name: MongooseSortOrderSchema.optional(),
    nationality: MongooseSortOrderSchema.optional(),
});

/**
 * Schema combining filter and sort options for Person queries.
 *
 * This schema merges {@link PersonQueryFilterSchema} and {@link PersonQuerySortSchema}
 * to allow simultaneous filtering and sorting of Person records in a single query options object.
 */
export const PersonQueryOptionsSchema = PersonQuerySortSchema.merge(PersonQueryFilterSchema);