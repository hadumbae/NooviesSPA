/**
 * @file Showing.schema.ts
 *
 * Zod schemas for `Showing` entities.
 *
 * Defines core, populated, and detailed schemas used to validate and type
 * movie showings across client and server boundaries.
 */

import {z} from "zod";
import {TheatreSchema}
    from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {ScreenSchema}
    from "@/pages/screens/schema/screen/Screen.schema.ts";
import {MovieWithGenresSchema}
    from "@/pages/movies/schema/movie/Movie.schema.ts";
import {IDStringSchema}
    from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CleanedPositiveNumberSchema}
    from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum}
    from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {NonNegativeNumberSchema}
    from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ShowingStatusEnumSchema}
    from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {UTCISO8601DateTimeSchema}
    from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {CoercedBooleanValueSchema}
    from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {DateTimeInstanceSchema}
    from "@/common/schema/date-time/DateTimeInstanceSchema.ts";
import {NonEmptyStringSchema}
    from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {BooleanValueSchema}
    from "@/common/schema/boolean/BooleanValueSchema.ts";

/**
 * Showing-level configuration schema.
 *
 * Represents optional feature flags that affect runtime behaviour.
 */
export const ShowingConfigSchema = z.object({
    /** Whether seat reservations are allowed for the showing */
    canReserveSeats: BooleanValueSchema.optional(),
});

/**
 * Core showing schema.
 *
 * Uses reference IDs for related entities and supports both
 * ISO strings and `DateTime` instances for date fields.
 */
export const ShowingSchema = z.object({
    /** Unique identifier */
    _id: IDStringSchema.readonly(),

    /** Scheduled start time */
    startTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),

    /** Optional scheduled end time */
    endTime: z
        .union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema])
        .optional()
        .nullable(),

    /** Ticket price */
    ticketPrice: CleanedPositiveNumberSchema,

    /** Primary spoken language (ISO-639-1) */
    language: ISO6391LanguageCodeEnum,

    /** Available subtitle languages (ISO-639-1) */
    subtitleLanguages: z
        .array(ISO6391LanguageCodeEnum)
        .nonempty({message: "Must not be empty."}),

    /** Marks special screenings (e.g. premieres) */
    isSpecialEvent: CoercedBooleanValueSchema.optional(),

    /** Whether the showing is active and bookable */
    isActive: CoercedBooleanValueSchema.optional(),

    /** Referenced movie ID */
    movie: IDStringSchema,

    /** Referenced theatre ID */
    theatre: IDStringSchema,

    /** Referenced screen ID */
    screen: IDStringSchema,

    /** Lifecycle status */
    status: ShowingStatusEnumSchema,

    /** Optional configuration overrides */
    config: ShowingConfigSchema.nullable().optional(),

    /** Normalized slug identifier */
    slug: NonEmptyStringSchema,
});

/**
 * Showing schema with populated relations.
 */
export const PopulatedShowingSchema = ShowingSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
    movie: z.lazy(() => MovieWithGenresSchema),
});

/**
 * Detailed showing schema with seat statistics.
 */
export const ShowingDetailsSchema = PopulatedShowingSchema.extend({
    seatMapCount: NonNegativeNumberSchema,
    unavailableSeatsCount: NonNegativeNumberSchema,
    availableSeatsCount: NonNegativeNumberSchema,
    reservedSeatsCount: NonNegativeNumberSchema,
    soldSeatsCount: NonNegativeNumberSchema,
});
