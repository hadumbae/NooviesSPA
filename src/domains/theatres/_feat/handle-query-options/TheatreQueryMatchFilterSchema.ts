import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";

/**
 * Zod schema defining filter parameters for querying theatre data.
 */
export const TheatreQueryMatchFilterSchema = z.object({
    /** Unique theatre ID, if filtering by a specific theatre. */
    _id: preprocessEmptyStringToUndefined(
        IDStringSchema.optional()
    ),

    /** Theatre name, must be non-empty if provided. */
    name: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.optional()
    ),

    /** Theatre seating capacity; coerced number, or `undefined` if empty. */
    seatCapacity: preprocessEmptyStringToUndefined(
        CoercedNumberValueSchema.optional(),
    ),

    /** Street address (max 2000 characters). */
    street: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema
            .max(2000, {message: "Must be 2000 characters or less."})
            .optional()
    ),

    /** City name (max 500 characters). */
    city: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema
            .max(500, {message: "Must be 500 characters or less."})
            .optional()
    ),

    /** State or province name (max 500 characters). */
    state: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema
            .max(500, {message: "Must be 500 characters or less."})
            .optional()
    ),

    /** Two-letter ISO 3166-1 alpha-2 country code. */
    country: preprocessEmptyStringToUndefined(
        ISO3166Alpha2CountryCodeEnum.optional()
    ),

    /** Postal or ZIP code (max 50 characters). */
    postalCode: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema
            .max(50, {message: "Must be 50 characters or less."})
            .optional()
    ),

    /** IANA timezone string (e.g., "America/New_York"). */
    timezone: preprocessEmptyStringToUndefined(
        IANATimezoneSchema.optional()
    ),
});

/**
 * Inferred type for validated theatre match filters.
 */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;