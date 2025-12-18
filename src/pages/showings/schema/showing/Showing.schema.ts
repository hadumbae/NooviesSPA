import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { ScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import { MovieWithGenresSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ISO6391LanguageCodeEnum } from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { ShowingStatusEnumSchema } from "@/pages/showings/schema/ShowingStatus.enum.ts";
import { UTCISO8601DateTimeSchema } from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import { DateTimeInstanceSchema } from "@/common/schema/date-time/DateTimeInstanceSchema.ts";

/**
 * @fileoverview
 * Zod schemas for movie showings.
 *
 * Includes:
 * - Base and core showing schemas
 * - Detailed schemas with populated relations
 * - Array and paginated variants for API responses
 *
 * These schemas provide runtime validation and type inference
 * for showing-related data throughout the application.
 *
 * @module ShowingSchema
 */

/**
 * Base schema for showing entities.
 *
 * @remarks
 * Currently empty and reserved for future shared fields.
 */
const ShowingBaseSchema = z.object({});

/**
 * Core schema describing a movie showing.
 *
 * Validates scheduling metadata, pricing, language configuration,
 * and foreign key references.
 *
 * @property _id - Unique identifier of the showing.
 * @property startTime - Scheduled start time (DateTime or ISO-8601 string).
 * @property endTime - Scheduled end time (DateTime or ISO-8601 string).
 * @property ticketPrice - Positive ticket price.
 * @property language - Primary spoken language (ISO 639-1).
 * @property subtitleLanguages - Non-empty list of subtitle languages.
 * @property isSpecialEvent - Indicates a special event showing.
 * @property isActive - Indicates whether the showing is active.
 * @property movie - Referenced movie ID.
 * @property theatre - Referenced theatre ID.
 * @property screen - Referenced screen ID.
 * @property status - Current showing status.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),
    endTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),
    ticketPrice: CleanedPositiveNumberSchema,
    language: ISO6391LanguageCodeEnum,
    subtitleLanguages: z
        .array(ISO6391LanguageCodeEnum)
        .nonempty({ message: "Must not be empty." }),
    isSpecialEvent: CoercedBooleanValueSchema.optional(),
    isActive: CoercedBooleanValueSchema.optional(),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    status: ShowingStatusEnumSchema,
});

/**
 * Schema for populated showing details.
 *
 * Extends {@link ShowingSchema} by replacing reference IDs
 * with their full relational documents and including seat statistics.
 *
 * @property movie - Populated movie document.
 * @property theatre - Populated theatre document.
 * @property screen - Populated screen document.
 * @property seatMapCount - Total number of seat entries.
 * @property availableSeatsCount - Available seat count.
 * @property reservedSeatsCount - Reserved seat count.
 * @property unreservedSeatsCount - Unreserved seat count.
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
 * Array schema for core showing documents.
 */
export const ShowingArraySchema = z.array(ShowingSchema);

/**
 * Array schema for populated showing documents.
 */
export const ShowingDetailsArraySchema = z.array(ShowingDetailsSchema);

/**
 * Paginated schema for core showings.
 */
export const PaginatedShowingSchema =
    generatePaginationSchema(ShowingSchema);

/**
 * Paginated schema for populated showings.
 */
export const PaginatedShowingDetailsSchema =
    generatePaginationSchema(ShowingDetailsSchema);

export default ShowingBaseSchema;
