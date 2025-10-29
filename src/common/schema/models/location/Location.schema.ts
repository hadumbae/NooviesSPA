import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {CoordinateSchema} from "@/common/schema/models/coordinate/Coordinate.schema.ts";

/**
 * A schema for validating a physical location.
 * - street: Optional street address (max 2000 chars).
 * - city: Required city name (max 500 chars).
 * - state: Optional state or region (max 500 chars).
 * - country: ISO 3166-1 alpha-2 country code.
 * - postalCode: Optional postal or ZIP code.
 * - timezone: Valid IANA timezone string.
 * - coordinates: Optional GeoJSON Point for geospatial queries.
 */
export const LocationSchema = z.object({
    /**
     * Street address (e.g., "123 Main St").
     */
    street: NonEmptyStringSchema
        .max(2000, { message: "Must be 2000 characters or less." })
        .optional(),

    /**
     * City name (e.g., "Bangkok").
     */
    city: NonEmptyStringSchema
        .max(500, { message: "Must be 500 characters or less." }),

    /**
     * State or region (e.g., "California").
     */
    state: NonEmptyStringSchema
        .max(500, { message: "Must be 500 characters or less." })
        .optional(),

    /**
     * Country code in ISO 3166-1 alpha-2 format (e.g., "US", "TH").
     */
    country: ISO3166Alpha2CountryCodeEnum,

    /**
     * Postal or ZIP code.
     */
    postalCode: NonEmptyStringSchema.optional(),

    /**
     * IANA timezone name (e.g., "Asia/Bangkok").
     */
    timezone: IANATimezoneSchema,

    /**
     * Optional GeoJSON Point for precise geolocation.
     */
    coordinates: CoordinateSchema.optional(),
});

export type Location = z.infer<typeof LocationSchema>;
