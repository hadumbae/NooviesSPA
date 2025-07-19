import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {LocationSchema} from "@/common/schema/location/Location.schema.ts";

/**
 * 🎭 Base schema for a theatre object.
 *
 * Represents a single theatre with its identifying and core data fields.
 * Typically used for detailed API responses or documents.
 */
export const TheatreSchema = z.object({
    /** Unique identifier of the theatre (MongoDB ObjectId as string). */
    _id: IDStringSchema.readonly(),

    /** Name of the theatre (max 255 characters). */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Location of the theatre (latitude/longitude, city, etc.). */
    location: LocationSchema,

    /** Total seating capacity of the theatre (must be ≥ 0). */
    seatCapacity: NonNegativeNumberSchema,
});

/**
 * 🪄 Extended schema for a theatre including aggregate summary fields.
 *
 * Adds computed fields like number of screens, total seats,
 * and count of upcoming showings. Useful for dashboards or list views
 * where full detailed child objects are unnecessary.
 */
export const TheatreDetailsSchema = TheatreSchema.extend({
    /** Total number of screens in the theatre. */
    screenCount: NonNegativeNumberSchema,

    /** Total number of seats in the theatre. */
    seatCount: NonNegativeNumberSchema,

    /** Number of scheduled future showings in the theatre. */
    futureShowingCount: NonNegativeNumberSchema,
});

/**
 * 🎬 Schema for validating an array of theatres.
 *
 * Typically used when the API returns a list of theatre objects
 * without pagination metadata.
 */
export const TheatreArraySchema = z.array(TheatreSchema);

/**
 * 📄 Schema for paginated theatre data.
 *
 * Represents a paginated response containing a list of base theatre entries
 * and pagination metadata like `totalCount`, `page`, and `pageSize`.
 *
 * Useful for endpoints returning a page of theatres.
 */
export const PaginatedTheatreSchema = generatePaginationSchema(TheatreSchema);

/**
 * 📊 Schema for paginated detailed theatre data.
 *
 * Similar to {@link PaginatedTheatreSchema} but includes
 * aggregated detail fields (screens, seats, future showings) per theatre.
 *
 * Useful for admin dashboards or detailed listings.
 */
export const PaginatedTheatreDetailsSchema = generatePaginationSchema(TheatreDetailsSchema);