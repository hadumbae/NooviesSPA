import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";

/**
 * Zod schema defining filter parameters for querying theatre data.
 *
 * Includes a mix of string, number, and enumerated fields, with optional
 * validation and empty-string preprocessing for form compatibility.
 *
 * @remarks
 * - Empty string values are converted to `undefined` to simplify backend filtering.
 * - Field-level constraints ensure inputs adhere to length and type requirements.
 *
 * @example
 * ```ts
 * const filters = TheatreQueryFilterSchema.parse({
 *   name: "Majestic Theatre",
 *   city: "New York",
 *   seatCapacity: "250",
 * });
 * // → { name: "Majestic Theatre", city: "New York", seatCapacity: 250 }
 * ```
 */
export const TheatreQueryFilterSchema = z.object({
    /** Unique theatre ID, if filtering by a specific theatre. */
    _id: IDStringSchema.optional(),

    /** Theatre name, must be non-empty if provided. */
    name: NonEmptyStringSchema.optional(),

    /** Theatre seating capacity; coerced number, or `undefined` if empty. */
    seatCapacity: preprocessEmptyStringToUndefined(
        CoercedNumberValueSchema.optional(),
    ),

    /** Street address (max 2000 characters). */
    street: NonEmptyStringSchema
        .max(2000, {message: "Must be 2000 characters or less."})
        .optional(),

    /** City name (max 500 characters). */
    city: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional(),

    /** State or province name (max 500 characters). */
    state: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional(),

    /** Two-letter ISO 3166-1 alpha-2 country code. */
    country: ISO3166Alpha2CountryCodeEnum.optional(),

    /** Postal or ZIP code (max 50 characters). */
    postalCode: NonEmptyStringSchema
        .max(50, {message: "Must be 50 characters or less."})
        .optional(),

    /** IANA timezone string (e.g., "America/New_York"). */
    timezone: IANATimezoneSchema.optional(),
});

/**
 * Zod schema defining sorting parameters for theatre queries.
 *
 * Each field corresponds to a sortable property on the theatre model,
 * with sort order values validated against {@link MongooseSortOrderSchema}.
 *
 * @remarks
 * - Supports MongoDB-compatible sort orders: `1` (ascending) or `-1` (descending).
 * - Empty strings are automatically converted to `undefined`.
 *
 * @example
 * ```ts
 * const sortOptions = TheatreQuerySortSchema.parse({
 *   sortByName: 1,
 *   sortBySeatCapacity: -1,
 * });
 * // → { sortByName: 1, sortBySeatCapacity: -1 }
 * ```
 */
export const TheatreQuerySortSchema = z.object({
    /** Sort by theatre name (ascending or descending). */
    sortByName: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),

    /** Sort by theatre seat capacity. */
    sortBySeatCapacity: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),

    /** Sort by city name. */
    sortByCity: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),

    /** Sort by state or province. */
    sortByState: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),

    /** Sort by country. */
    sortByCountry: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),

    /** Sort by postal code. */
    sortByPostCode: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),

    /** Sort by IANA timezone. */
    sortByTimezone: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
});

/**
 * Combined Zod schema for theatre query options.
 *
 * Merges both filtering and sorting capabilities into a single schema
 * for consistent validation of query parameters.
 *
 * @example
 * ```ts
 * const queryOptions = TheatreQueryOptionSchema.parse({
 *   name: "Apollo",
 *   sortByCity: 1,
 * });
 * // → { name: "Apollo", sortByCity: 1 }
 * ```
 */
export const TheatreQueryOptionSchema = TheatreQueryFilterSchema.merge(TheatreQuerySortSchema);
