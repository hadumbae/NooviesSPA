import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {LocationSchema} from "@/common/schema/models/location/Location.schema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * @file Theatre.schema.ts
 *
 * Zod schemas for validating **theatre** domain objects.
 *
 * Covers:
 * - Base theatre model
 * - Aggregated/detail theatre views
 * - Array and paginated API responses
 */
export const TheatreSchema = z.object({
    /** MongoDB ObjectId (readonly). */
    _id: IDStringSchema.readonly(),

    /** Theatre display name (≤ 255 characters). */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Physical location of the theatre. */
    location: LocationSchema,

    /** Total seating capacity (≥ 0). */
    seatCapacity: NonNegativeNumberSchema,

    /** URL-safe unique identifier (readonly). */
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Extended theatre schema with aggregated metrics.
 *
 * Intended for list views, dashboards, and admin summaries.
 */
export const TheatreDetailsSchema = TheatreSchema.extend({
    /** Number of screens in the theatre. */
    screenCount: NonNegativeNumberSchema,

    /** Total number of seats across all screens. */
    seatCount: NonNegativeNumberSchema,

    /** Count of upcoming scheduled showings. */
    futureShowingCount: NonNegativeNumberSchema,
});

/** Array response of base theatre objects. */
export const TheatreArraySchema = z.array(TheatreSchema);

/**
 * Paginated response of base theatres.
 *
 * Includes pagination metadata alongside theatre entries.
 */
export const PaginatedTheatreSchema =
    generatePaginationSchema(TheatreSchema);

/**
 * Paginated response of detailed theatre entries.
 *
 * Includes aggregated metrics per theatre.
 */
export const PaginatedTheatreDetailsSchema =
    generatePaginationSchema(TheatreDetailsSchema);
