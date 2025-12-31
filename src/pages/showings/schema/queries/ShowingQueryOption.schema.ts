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
 * Direct match filters for Showings.
 *
 * All fields are optional and map to concrete showing fields.
 */
export const ShowingQueryMatchFilterSchema = z.object({
    /** Movie identifier */
    movie: IDStringSchema.optional(),

    /** Theatre identifier */
    theatre: IDStringSchema.optional(),

    /** Screen identifier */
    screen: IDStringSchema.optional(),

    /** Start date (YYYY-MM-DD) */
    startTime: DateOnlyStringSchema.optional(),

    /** End date (YYYY-MM-DD) */
    endTime: DateOnlyStringSchema.optional(),

    /** Minimum ticket price */
    ticketPrice: PositiveNumberSchema.optional(),

    /** Special event flag */
    isSpecialEvent: CoercedBooleanValueSchema.optional(),

    /** Active / inactive flag */
    isActive: CoercedBooleanValueSchema.optional(),

    /** Showing lifecycle status */
    status: ShowingStatusEnumSchema.optional(),
});

/**
 * Sorting options for Showings.
 *
 * Uses MongoDB sort semantics:
 * - `1` ascending
 * - `-1` descending
 */
export const ShowingQueryMatchSortSchema = z.object({
    sortByStartTime: MongooseSortOrderSchema.optional(),
    sortByEndTime: MongooseSortOrderSchema.optional(),
});

/**
 * Reference-based filters resolved via populated relations.
 *
 * These fields do not exist directly on the Showing document.
 */
export const ShowingQueryReferenceFilterSchema = z.object({
    /** Movie title (partial or full match) */
    movieTitle: NonEmptyStringSchema.optional(),

    /** Movie slug */
    movieSlug: NonEmptyStringSchema.optional(),

    /** Theatre name */
    theatreName: NonEmptyStringSchema.optional(),

    /** Theatre state / province */
    theatreState: NonEmptyStringSchema.optional(),

    /** Theatre city */
    theatreCity: NonEmptyStringSchema.optional(),

    /** Theatre country (ISO 3166-1 alpha-2) */
    theatreCountry: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * Unified query schema for fetching Showings.
 *
 * Combines:
 * - Direct match filters
 * - Reference-based filters
 * - Sort options
 */
export const ShowingQueryOptionSchema =
    ShowingQueryMatchFilterSchema
        .merge(ShowingQueryMatchSortSchema)
        .merge(ShowingQueryReferenceFilterSchema);
