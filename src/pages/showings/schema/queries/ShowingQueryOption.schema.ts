import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { DateStringSchema } from "@/common/schema/helpers/ZodDateHelpers.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Schema for filtering **movie showings** in queries.
 *
 * Each field is optional. Filters can be applied individually or in combination.
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
    startTime: DateStringSchema.optional(),
    /** Filter by end date (YYYY-MM-DD) */
    endTime: DateStringSchema.optional(),
    /** Filter by minimum ticket price */
    ticketPrice: PositiveNumberSchema.optional(),
    /** Filter by special event flag */
    isSpecialEvent: RequiredBoolean.optional(),
    /** Filter by active status */
    isActive: RequiredBoolean.optional(),
});

/**
 * Schema for sorting **movie showings** in queries.
 *
 * Each field is optional. Use `1` for ascending or `-1` for descending order.
 *
 * @example
 * ```ts
 * const sort = {
 *   startTime: 1,
 *   ticketPrice: -1,
 * };
 * ```
 */
export const ShowingQueryMatchSortSchema = z.object({
    /** Sort by start time */
    startTime: MongooseSortOrderSchema.optional(),
    /** Sort by end time */
    endTime: MongooseSortOrderSchema.optional(),
    /** Sort by ticket price */
    ticketPrice: MongooseSortOrderSchema.optional(),
});

/**
 * Combined schema for **showing query options** including filters and sort orders.
 *
 * @example
 * ```ts
 * const queryOptions = {
 *   movie: "movieId123",
 *   startTime: "2025-10-14",
 *   ticketPrice: 10,
 *   startTime: 1, // ascending
 * };
 * ```
 */
export const ShowingQueryOptionSchema = ShowingQueryMatchFilterSchema.merge(ShowingQueryMatchSortSchema);
