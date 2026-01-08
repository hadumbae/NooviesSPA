/**
 * @file Showing.schema.ts
 *
 * @summary
 * Zod schemas and inferred types for Showing entities.
 *
 * @description
 * Defines core, populated, detailed, array, and paginated schemas
 * for validating and typing movie showings.
 */

import {z} from "zod";
import {TheatreSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {MovieWithGenresSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ShowingStatusEnumSchema} from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {DateTimeInstanceSchema} from "@/common/schema/date-time/DateTimeInstanceSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Core Showing schema.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),
    endTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]).optional().nullable(),
    ticketPrice: CleanedPositiveNumberSchema,
    language: ISO6391LanguageCodeEnum,
    subtitleLanguages: z.array(ISO6391LanguageCodeEnum).nonempty({message: "Must not be empty."}),
    isSpecialEvent: CoercedBooleanValueSchema.optional(),
    isActive: CoercedBooleanValueSchema.optional(),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    status: ShowingStatusEnumSchema,
    slug: NonEmptyStringSchema,
});

/**
 * Showing schema with populated references.
 */
export const PopulatedShowingSchema = ShowingSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
    movie: z.lazy(() => MovieWithGenresSchema),
});

/**
 * Detailed Showing schema with seat statistics.
 */
export const ShowingDetailsSchema = PopulatedShowingSchema.extend({
    seatMapCount: NonNegativeNumberSchema,
    availableSeatsCount: NonNegativeNumberSchema,
    reservedSeatsCount: NonNegativeNumberSchema,
    unreservedSeatsCount: NonNegativeNumberSchema,
});

