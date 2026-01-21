/**
 * @file ShowingQueryOption.schema.ts
 *
 * Zod schemas defining validated query options for Showing endpoints.
 *
 * Covers:
 * - Native Showing document filters
 * - Reference-based (populated) filters
 * - MongoDB-compatible sort options
 *
 * These schemas are intended for API query validation and
 * aggregate-capable query services.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {ShowingStatusEnumSchema} from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Match filters applied directly to Showing document fields.
 *
 * These filters translate to MongoDB `$match` conditions.
 */
export const ShowingQueryMatchFilterSchema = z.object({
    /** Movie ObjectId */
    movie: IDStringSchema.optional(),

    /** Theatre ObjectId */
    theatre: IDStringSchema.optional(),

    /** Screen ObjectId */
    screen: IDStringSchema.optional(),

    /** Start date (YYYY-MM-DD) */
    startTime: DateOnlyStringSchema.optional(),

    /** End date (YYYY-MM-DD) */
    endTime: DateOnlyStringSchema.optional(),

    /** Minimum ticket price */
    ticketPrice: PositiveNumberSchema.optional(),

    /** Special event flag */
    isSpecialEvent: CoercedBooleanValueSchema.optional(),

    /** Active state flag */
    isActive: CoercedBooleanValueSchema.optional(),

    /** Showing lifecycle status */
    status: ShowingStatusEnumSchema.optional(),
});

/**
 * Sort options for native Showing fields.
 *
 * Uses MongoDB semantics:
 * - `1`  → ascending
 * - `-1` → descending
 */
export const ShowingQueryMatchSortSchema = z.object({
    /** Sort by start time */
    sortByStartTime: MongooseSortOrderSchema.optional(),

    /** Sort by end time */
    sortByEndTime: MongooseSortOrderSchema.optional(),
});

/**
 * Filters resolved through referenced documents.
 *
 * These fields are not stored directly on the Showing document
 * and typically require aggregation pipelines.
 */
export const ShowingQueryReferenceFilterSchema = z.object({
    /** Movie slug */
    movieSlug: SlugStringSchema.optional(),

    /** Theatre slug */
    theatreSlug: SlugStringSchema.optional(),

    /** Screen slug */
    screenSlug: SlugStringSchema.optional(),

    /** Theatre state or province */
    theatreState: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional(),

    /** Theatre city */
    theatreCity: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional(),

    /** Theatre country (ISO 3166-1 alpha-2) */
    theatreCountry: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * Unified query option schema for Showing endpoints.
 *
 * Combines:
 * - Match filters
 * - Sort options
 * - Reference-level filters
 */
export const ShowingQueryOptionSchema =
    ShowingQueryMatchFilterSchema
        .merge(ShowingQueryMatchSortSchema)
        .merge(ShowingQueryReferenceFilterSchema);
