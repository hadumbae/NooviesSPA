import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { ScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import {MovieSchema, MovieWithGenresSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ISO6391CodeEnum } from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/dates/iso-8601/ISO8601DateString.schema.ts";
import {ShowingStatusEnumSchema} from "@/pages/showings/schema/ShowingStatus.enum.ts";

/**
 * @fileoverview
 * Defines comprehensive Zod schemas for **movie showings**, including:
 * - A base schema for shared fields
 * - A detailed schema with populated relations
 * - Array and paginated variants for collections
 *
 * These schemas ensure runtime validation and type inference for showing
 * entities used throughout the application.
 *
 * @module ShowingSchema
 *
 * @example
 * ```ts
 * import { ShowingSchema } from "@/pages/showings/schema/showing/ShowingSchema.ts";
 *
 * const data = ShowingSchema.parse({
 *   _id: "abc123",
 *   startTime: "2025-11-02T12:00:00Z",
 *   endTime: "2025-11-02T14:00:00Z",
 *   ticketPrice: 250,
 *   language: "en",
 *   subtitleLanguages: ["th"],
 *   movie: "movieId123",
 *   theatre: "theatreId456",
 *   screen: "screenId789"
 * });
 * ```
 */

/**
 * Base schema for a showing entity.
 *
 * @remarks
 * Currently empty — serves as a base for composition or future common fields.
 */
const ShowingBaseSchema = z.object({});

/**
 * Schema describing the fundamental structure of a showing.
 *
 * @remarks
 * Validates basic metadata and foreign key references used in showtime scheduling.
 *
 * @property _id - Unique string identifier for the showing.
 * @property startTime - Scheduled start time, coerced into a `Date`.
 * @property endTime - Scheduled end time, coerced into a `Date`.
 * @property ticketPrice - Ticket price; must be a positive number.
 * @property language - Spoken language of the showing, ISO-639-1 code.
 * @property subtitleLanguages - Array of subtitle language codes; must not be empty.
 * @property isSpecialEvent - Marks if this showing is a special event (optional).
 * @property isActive - Indicates whether the showing is currently active (optional).
 * @property movie - Reference ID of the associated movie.
 * @property theatre - Reference ID of the associated theatre.
 * @property screen - Reference ID of the associated screen.
 *
 * @returns `ZodObject` validating a showing record.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: UTCISO8601DateTimeSchema,
    endTime: UTCISO8601DateTimeSchema,
    ticketPrice: CleanedPositiveNumberSchema,
    language: ISO6391CodeEnum,
    subtitleLanguages: z
        .array(ISO6391CodeEnum)
        .nonempty({ message: "Must not be empty." }),
    isSpecialEvent: RequiredBoolean.optional(),
    isActive: RequiredBoolean.optional(),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    status: ShowingStatusEnumSchema,
});

/**
 * Extended schema including relational data for populated showings.
 *
 * @remarks
 * Replaces object ID references with their full relational schemas.
 * Also includes seat statistics from virtual population.
 *
 * @see MovieSchema
 * @see TheatreSchema
 * @see ScreenSchema
 *
 * @property movie - Full {@link MovieSchema} document.
 * @property theatre - Full {@link TheatreSchema} document.
 * @property screen - Full {@link ScreenSchema} document.
 * @property seatMapCount - Total number of seat map entries.
 * @property availableSeatsCount - Number of available seats.
 * @property reservedSeatsCount - Number of reserved seats.
 * @property unreservedSeatsCount - Number of unreserved seats.
 */
export const ShowingDetailsSchema = ShowingSchema.extend({
    seatMapCount: NonNegativeNumberSchema,
    availableSeatsCount: NonNegativeNumberSchema,
    reservedSeatsCount: NonNegativeNumberSchema,
    unreservedSeatsCount: NonNegativeNumberSchema,
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
    movie: z.lazy(() => MovieWithGenresSchema),
});

/**
 * Array schema for collections of basic showing documents.
 *
 * @returns `ZodArray` of {@link ShowingSchema}.
 */
export const ShowingArraySchema = z.array(ShowingSchema);

/**
 * Array schema for collections of detailed showing documents.
 *
 * @returns `ZodArray` of {@link ShowingDetailsSchema}.
 */
export const ShowingDetailsArraySchema = z.array(ShowingDetailsSchema);

/**
 * Paginated schema for basic showings.
 *
 * @remarks
 * Wraps {@link ShowingSchema} using {@link generatePaginationSchema}.
 */
export const PaginatedShowingSchema =
    generatePaginationSchema(ShowingSchema);

/**
 * Paginated schema for detailed showings (with populated relations).
 *
 * @remarks
 * Wraps {@link ShowingDetailsSchema} using {@link generatePaginationSchema}.
 */
export const PaginatedShowingDetailsSchema =
    generatePaginationSchema(ShowingDetailsSchema);

export default ShowingBaseSchema;
