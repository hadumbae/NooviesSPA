import {z, ZodType} from "zod";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import ITheatreDetails from "@/pages/theatres/interfaces/ITheatreDetails.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Base schema for a theatre object, representing core properties
 * such as ID, name, location, and seat capacity.
 */
export const TheatreRawSchema = z.object({
    /** Unique identifier for the theatre (read-only string ID) */
    _id: IDStringSchema.readonly(),

    /** Name of the theatre; required and limited to 255 characters */
    name: NonEmptyStringSchema.min(1, "Required.").max(255, "Must be 255 characters or less."),

    /** Location of the theatre; required and limited to 255 characters */
    location: NonEmptyStringSchema.min(1, "Required.").max(255, "Must be 255 characters or less."),

    /** Total seating capacity of the theatre; must be 0 or greater */
    seatCapacity: RequiredNumberSchema.gte(0, "Must be equal or greater than 0."),
});

/**
 * Extended schema for a theatre that includes aggregated detail fields,
 * such as screen count, seat count, and number of upcoming showings.
 *
 * This version is typically used for list views or dashboards where
 * full screen/seat data isn't needed, just summarized numbers.
 */
export const TheatreDetailsRawSchema = TheatreRawSchema.extend({
    /** Total number of screens in the theatre. */
    screenCount: NonNegativeNumberSchema,

    /** Total number of seats in the theatre. */
    seatCount: NonNegativeNumberSchema,

    /** Number of showings scheduled in the future at this theatre. */
    futureShowingCount: NonNegativeNumberSchema,
});

/**
 * Zod schema for validating `ITheatre` objects, based on the base theatre structure.
 */
export const TheatreSchema = TheatreRawSchema as ZodType<ITheatre>;

/**
 * Zod schema for validating `ITheatreDetails` objects, including screens and seats.
 */
export const TheatreDetailsSchema = TheatreDetailsRawSchema as ZodType<ITheatreDetails>;

/**
 * Zod schema for validating an array of theatres.
 */
export const TheatreArraySchema = z.array(TheatreSchema);

/**
 * Zod schema for paginated theatre data, used for endpoints returning
 * a list of basic theatre entries along with pagination metadata
 * (e.g., total count, current page, total pages).
 */
export const PaginatedTheatreSchema = generatePaginationSchema(TheatreSchema);

/**
 * Zod schema for paginated detailed theatre data, used for endpoints returning
 * a list of theatres with full detail (including screens and seats),
 * along with pagination metadata.
 */
export const PaginatedTheatreDetailsSchema = generatePaginationSchema(TheatreDetailsSchema);