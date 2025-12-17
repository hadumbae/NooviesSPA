import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import { DateOnlyStringSchema } from "@/common/schema/dates/DateOnlyStringSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { ISO6391LanguageCodeEnum } from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { ShowingStatusEnumSchema } from "@/pages/showings/schema/ShowingStatus.enum.ts";

/**
 * Schema defining filters for querying movie showings.
 *
 * All fields are optional. Can filter by movie, theatre, screen, dates,
 * price, language, subtitle languages, active status, special event flag, and status.
 *
 * @example
 * ```ts
 * const filter = {
 *   movie: "movieId123",
 *   theatre: "theatreId456",
 *   startTime: "2025-10-14",
 *   isActive: true,
 * };
 * ```
 */
export const ShowingQueryMatchFilterSchema = z.object({
    /** Filter by movie ID */
    movie: IDStringSchema.optional(),
    /** Filter by theatre ID */
    theatre: IDStringSchema.optional(),
    /** Filter by screen ID */
    screen: IDStringSchema.optional(),
    /** Filter by start date (YYYY-MM-DD) */
    startTime: DateOnlyStringSchema.optional(),
    /** Filter by end date (YYYY-MM-DD) */
    endTime: DateOnlyStringSchema.optional(),
    /** Filter by minimum ticket price */
    ticketPrice: PositiveNumberSchema.optional(),
    /** Filter by special event flag */
    isSpecialEvent: CoercedBooleanValueSchema.optional(),
    /** Filter by active status */
    isActive: CoercedBooleanValueSchema.optional(),
    /** Filter by primary language */
    language: ISO6391LanguageCodeEnum.optional(),
    /** Filter by subtitle languages */
    subtitleLanguages: generateArraySchema(ISO6391LanguageCodeEnum).optional(),
    /** Filter by showing status */
    status: ShowingStatusEnumSchema.optional()
});

/**
 * Schema defining sorting options for querying movie showings.
 *
 * Each field is optional. Use `1` for ascending and `-1` for descending order.
 *
 * @example
 * ```ts
 * const sort = {
 *   sortByStartTime: 1,
 *   sortByTicketPrice: -1,
 * };
 * ```
 */
export const ShowingQueryMatchSortSchema = z.object({
    sortByStartTime: MongooseSortOrderSchema.optional(),
    sortByEndTime: MongooseSortOrderSchema.optional(),
    sortByTicketPrice: MongooseSortOrderSchema.optional(),
    sortByIsSpecialEvent: MongooseSortOrderSchema.optional(),
    sortByIsActive: MongooseSortOrderSchema.optional(),
    sortByStatus: MongooseSortOrderSchema.optional(),
});

/**
 * Combined schema for movie showing query options including filters and sorting.
 *
 * @remarks
 * Merges {@link ShowingQueryMatchFilterSchema} and {@link ShowingQueryMatchSortSchema}.
 *
 * @example
 * ```ts
 * const queryOptions = {
 *   movie: "movieId123",
 *   startTime: "2025-10-14",
 *   ticketPrice: 10,
 *   sortByStartTime: 1, // ascending
 * };
 * ```
 */
export const ShowingQueryOptionSchema = ShowingQueryMatchFilterSchema.merge(ShowingQueryMatchSortSchema);
