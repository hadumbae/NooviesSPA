/**
 * @file ShowingQueryOption.schema.ts
 *
 * Zod schemas for Showing query options.
 *
 * Defines validated API query parameters for:
 * - Native Showing field filters
 * - Reference-based (populated) filters
 * - MongoDB-compatible sort options
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import { DateOnlyStringSchema } from "@/common/schema/dates/DateOnlyStringSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { ShowingStatusEnumSchema } from "@/pages/showings/schema/ShowingStatus.enum.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";

/**
 * Match filters applied directly to Showing document fields.
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

    /** Active status flag */
    isActive: CoercedBooleanValueSchema.optional(),

    /** Showing lifecycle status */
    status: ShowingStatusEnumSchema.optional(),
});

/**
 * Sort options for native Showing fields.
 *
 * MongoDB semantics:
 * - `1` ascending
 * - `-1` descending
 */
export const ShowingQueryMatchSortSchema = z.object({
    /** Sort by start time */
    sortByStartTime: MongooseSortOrderSchema.optional(),

    /** Sort by end time */
    sortByEndTime: MongooseSortOrderSchema.optional(),
});

/**
 * Filters resolved via referenced documents.
 *
 * These fields are not stored directly on the Showing document.
 */
export const ShowingQueryReferenceFilterSchema = z.object({
    /** Movie slug */
    movieSlug: NonEmptyStringSchema.optional(),

    /** Theatre slug */
    theatreSlug: NonEmptyStringSchema.optional(),

    /** Screen slug */
    screenSlug: NonEmptyStringSchema.optional(),

    /** Theatre state / province */
    theatreState: NonEmptyStringSchema.optional(),

    /** Theatre city */
    theatreCity: NonEmptyStringSchema.optional(),

    /** Theatre country (ISO 3166-1 alpha-2) */
    theatreCountry: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * Unified query schema for Showing endpoints.
 */
export const ShowingQueryOptionSchema =
    ShowingQueryMatchFilterSchema
        .merge(ShowingQueryMatchSortSchema)
        .merge(ShowingQueryReferenceFilterSchema);
