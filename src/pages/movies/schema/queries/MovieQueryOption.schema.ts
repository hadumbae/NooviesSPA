import { z } from 'zod';
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import { DateOnlyStringSchema } from "@/common/schema/dates/DateOnlyStringSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * **MovieQueryFilterSchema**
 *
 * Zod schema defining all **filter parameters** available when querying `Movie` documents.
 *
 * ### Fields
 * - `_id` — MongoDB ObjectID string (optional).
 * - `title` — Movie title.
 * - `originalTitle` — Movie’s original title.
 * - `releaseDate` — Release date in `yyyy-MM-dd` format.
 * - `genres` — Array of genre ObjectIDs.
 * - `isReleased` — Boolean indicating whether the movie has been released.
 * - `isAvailable` — Boolean indicating whether the movie is currently available.
 * - `country` — ISO 3166-1 alpha-2 country code of origin.
 *
 * ### Behavior
 * - Boolean values are coerced using {@link CoercedBooleanValueSchema} to allow string-based query inputs.
 * - Optional fields support partial filtering in queries.
 *
 * ### Example
 * ```ts
 * {
 *   title: "Inception",
 *   isReleased: true,
 *   country: "US",
 *   genres: ["653fa8d7c4e63b1a87e77e45"]
 * }
 * ```
 */
export const MovieQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    title: NonEmptyStringSchema.optional(),
    originalTitle: NonEmptyStringSchema.optional(),
    releaseDate: DateOnlyStringSchema.optional(),
    genres: z.array(IDStringSchema).optional(),
    isReleased: CoercedBooleanValueSchema.optional(),
    isAvailable: CoercedBooleanValueSchema.optional(),
    country: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * **MovieQuerySortSchema**
 *
 * Zod schema defining all **sorting parameters** available when fetching `Movie` documents.
 *
 * ### Fields
 * - `sortByReleaseDate` — Sort order by release date (`asc` or `desc`).
 * - `sortByTitle` — Sort order by localized title (`asc` or `desc`).
 * - `sortByOriginalTitle` — Sort order by original title (`asc` or `desc`).
 * - `sortByIsReleased` — Sort order by release status (`asc` or `desc`).
 * - `sortByIsAvailable` — Sort order by availability (`asc` or `desc`).
 * - `sortByCountry` — Sort order by country of origin (`asc` or `desc`).
 *
 * ### Behavior
 * - Uses {@link preprocessEmptyStringToUndefined} to safely handle empty form inputs.
 * - Each sort field is optional, allowing flexible multi-sort configurations.
 *
 * ### Example
 * ```ts
 * {
 *   sortByReleaseDate: "desc",
 *   sortByTitle: "asc"
 * }
 * ```
 */
export const MovieQuerySortSchema = z.object({
    sortByReleaseDate: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByTitle: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByOriginalTitle: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByIsReleased: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByIsAvailable: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
    sortByCountry: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
});

/**
 * **MovieQueryOptionSchema**
 *
 * Combined Zod schema merging both:
 * - {@link MovieQueryFilterSchema} — Filter parameters.
 * - {@link MovieQuerySortSchema} — Sort parameters.
 *
 * Used to validate complete query options when retrieving `Movie` documents.
 *
 * ### Example
 * ```ts
 * {
 *   title: "Spirited Away",
 *   isAvailable: true,
 *   sortByReleaseDate: "desc"
 * }
 * ```
 */
export const MovieQueryOptionSchema =
    MovieQuerySortSchema.merge(MovieQueryFilterSchema);
