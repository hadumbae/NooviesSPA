import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { ScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import { MovieSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import { SeatMapSchema } from "@/pages/seatmap/schema/SeatMapSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { CoercedDateSchema } from "@/common/schema/helpers/ZodDateHelpers.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ISO6391CodeEnum } from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * @file Defines Zod schemas for movie showings, including basic, detailed, array,
 * and paginated variants.
 *
 * @module ShowingSchema
 */

/**
 * Base schema for a showing.
 *
 * @remarks
 * Currently empty — provided as an extension point for shared or common showing properties.
 */
const ShowingBaseSchema = z.object({});

/**
 * Schema representing a basic movie showing document.
 *
 * @property _id - Unique string identifier for the showing.
 * @property startTime - Scheduled start time (coerced into a `Date`).
 * @property endTime - Scheduled end time (coerced into a `Date`).
 * @property ticketPrice - The ticket price, must be a positive number.
 * @property language - Spoken language of the showing, following ISO-639-1.
 * @property subtitleLanguages - One or more subtitle languages; cannot be empty.
 * @property isSpecialEvent - Indicates if this showing is a special event (optional).
 * @property isActive - Indicates if this showing is currently active (optional).
 * @property movie - ID reference to the associated movie.
 * @property theatre - ID reference to the associated theatre.
 * @property screen - ID reference to the screen being used.
 * @property seating - Array of seat map IDs associated with the showing.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: CoercedDateSchema,
    endTime: CoercedDateSchema,
    ticketPrice: CleanedPositiveNumberSchema,
    language: ISO6391CodeEnum,
    subtitleLanguages: z.array(ISO6391CodeEnum).nonempty({ message: "Must not be empty." }),
    isSpecialEvent: RequiredBoolean.optional(),
    isActive: RequiredBoolean.optional(),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    seating: z.array(IDStringSchema),
});

/**
 * Schema representing a showing document with expanded relational data.
 *
 * @remarks
 * Replaces reference IDs with their full related schemas:
 * - `movie` → {@link MovieSchema}
 * - `theatre` → {@link TheatreSchema}
 * - `screen` → {@link ScreenSchema}
 * - `seating` → array of {@link SeatMapSchema}
 */
export const ShowingDetailsSchema = ShowingSchema.extend({
    movie: z.lazy(() => MovieSchema),
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
    seating: z.array(z.lazy(() => SeatMapSchema)),
});

/**
 * Array schema of basic showing documents.
 */
export const ShowingArraySchema = z.array(ShowingSchema);

/**
 * Array schema of detailed showing documents (with expanded relations).
 */
export const ShowingDetailsArraySchema = z.array(ShowingDetailsSchema);

/**
 * Paginated response schema for basic showings.
 *
 * @remarks
 * Uses {@link generatePaginationSchema} to wrap {@link ShowingSchema}.
 */
export const PaginatedShowingSchema = generatePaginationSchema(ShowingSchema);

/**
 * Paginated response schema for detailed showings.
 *
 * @remarks
 * Uses {@link generatePaginationSchema} to wrap {@link ShowingDetailsSchema}.
 */
export const PaginatedShowingDetailsSchema = generatePaginationSchema(ShowingDetailsSchema);

export default ShowingBaseSchema;
