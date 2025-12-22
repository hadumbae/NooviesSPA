/**
 * @file Showing.schema.ts
 *
 * @summary
 * Zod schemas for validating and typing movie showings.
 *
 * @description
 * Provides runtime validation and TypeScript inference for showing-related
 * data, including:
 * - Core showing entities
 * - Populated variants with related documents
 * - Detailed variants with seat statistics
 * - Array and paginated response shapes
 *
 * These schemas are used across API boundaries, services, and UI layers to
 * ensure consistency and correctness of showing data.
 */

import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
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
 * Base showing schema.
 *
 * @remarks
 * Currently empty and reserved for future shared fields or composition.
 */
const ShowingBaseSchema = z.object({});

/**
 * Core showing schema.
 *
 * @description
 * Represents a scheduled movie showing with timing, pricing, language
 * configuration, lifecycle status, and foreign key references.
 */
export const ShowingSchema = z.object({
    /** Unique identifier of the showing. */
    _id: IDStringSchema.readonly(),

    /** Scheduled start time (DateTime instance or ISO 8601 string). */
    startTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),

    /** Scheduled end time (DateTime instance or ISO 8601 string). */
    endTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),

    /** Base ticket price for the showing. */
    ticketPrice: CleanedPositiveNumberSchema,

    /** Primary spoken language (ISO 639-1). */
    language: ISO6391LanguageCodeEnum,

    /** Available subtitle languages (non-empty). */
    subtitleLanguages: z
        .array(ISO6391LanguageCodeEnum)
        .nonempty({ message: "Must not be empty." }),

    /** Indicates whether this is a special event showing. */
    isSpecialEvent: CoercedBooleanValueSchema.optional(),

    /** Indicates whether the showing is currently active. */
    isActive: CoercedBooleanValueSchema.optional(),

    /** Referenced movie ID. */
    movie: IDStringSchema,

    /** Referenced theatre ID. */
    theatre: IDStringSchema,

    /** Referenced screen ID. */
    screen: IDStringSchema,

    /** Current lifecycle status of the showing. */
    status: ShowingStatusEnumSchema,
});

/**
 * Showing schema with populated relations.
 *
 * @remarks
 * Replaces foreign key IDs with fully populated documents.
 */
export const PopulatedShowingSchema = ShowingSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
    movie: z.lazy(() => MovieWithGenresSchema),
});

/**
 * Detailed showing schema.
 *
 * @description
 * Extends {@link PopulatedShowingSchema} with seat availability statistics,
 * typically used for admin views or booking workflows.
 */
export const ShowingDetailsSchema = PopulatedShowingSchema.extend({
    /** Total number of seats defined for the showing. */
    seatMapCount: NonNegativeNumberSchema,

    /** Number of seats currently available. */
    availableSeatsCount: NonNegativeNumberSchema,

    /** Number of seats already reserved. */
    reservedSeatsCount: NonNegativeNumberSchema,

    /** Number of seats not yet reserved. */
    unreservedSeatsCount: NonNegativeNumberSchema,
});

/** Array schema for core showing entities. */
export const ShowingArraySchema = z.array(ShowingSchema);

/** Array schema for detailed, populated showings. */
export const ShowingDetailsArraySchema = z.array(ShowingDetailsSchema);

/** Paginated schema for core showings. */
export const PaginatedShowingSchema =
    generatePaginationSchema(ShowingSchema);

/** Paginated schema for detailed, populated showings. */
export const PaginatedShowingDetailsSchema =
    generatePaginationSchema(ShowingDetailsSchema);

export default ShowingBaseSchema;
