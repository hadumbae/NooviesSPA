import {z, ZodType} from "zod";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import ITheatreDetails from "@/pages/theatres/interfaces/ITheatreDetails.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

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
 * Extended schema for a theatre that includes associated screen and seat data.
 * Screens and seats can be represented by either ID strings or full schema objects.
 */
export const TheatreDetailsRawSchema = TheatreRawSchema.extend({
    /** Array of screen references or full screen objects for the theatre */
    screens: z.array(z.union([IDStringSchema, z.lazy(() => ScreenSchema)])),

    /** Array of seat references or full seat objects for the theatre */
    seats: z.array(z.union([IDStringSchema, z.lazy(() => SeatSchema)])),
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
 * results with pagination metadata (e.g., total count, pages).
 */
export const PaginatedTheatreSchema = generatePaginationSchema(TheatreSchema);
