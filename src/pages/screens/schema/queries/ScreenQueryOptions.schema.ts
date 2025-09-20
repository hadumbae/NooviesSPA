import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { ScreenTypeEnum } from "@/pages/screens/schema/ScreenType.enum.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Schema for filtering screens in queries.
 *
 * All fields are optional and can be used to filter the results of a screen query.
 */
export const ScreenQueryFiltersSchema = z.object({
    /** Optional filter by screen ID */
    _id: IDStringSchema.optional(),

    /** Optional filter by screen name (non-empty string) */
    name: NonEmptyStringSchema.optional(),

    /** Optional filter by associated theatre ID */
    theatre: IDStringSchema.optional(),

    /** Optional filter by screen capacity (non-negative number) */
    capacity: NonNegativeNumberSchema.optional(),

    /** Optional filter by screen type */
    screenType: ScreenTypeEnum.optional(),
});

/**
 * Schema for specifying sort order of screen query results.
 *
 * Each field is optional and accepts a MongoDB sort order (`1` for ascending, `-1` for descending).
 */
export const ScreenQuerySortsSchema = z.object({
    /** Sort by screen name */
    sortByName: MongooseSortOrderSchema.optional(),

    /** Sort by screen capacity */
    sortByCapacity: MongooseSortOrderSchema.optional(),

    /** Sort by screen type */
    sortByScreenType: MongooseSortOrderSchema.optional(),

    /** Sort by creation date */
    sortByCreatedAt: MongooseSortOrderSchema.optional(),
});

/**
 * Schema for additional query parameters when fetching screens.
 *
 * Currently supports:
 * - `showingsPerScreen`: number of showings to fetch per screen
 */
export const ScreenQueryParamsSchema = z.object({
    /** Optional number of showings per screen (non-negative number) */
    showingsPerScreen: NonNegativeNumberSchema.optional(),
});

/**
 * Combined schema for all screen query options.
 *
 * Merges filters, sorting, and additional parameters into a single schema for validating
 * incoming URL query parameters.
 */
export const ScreenQueryOptionsSchema = ScreenQueryParamsSchema.merge(
    ScreenQueryFiltersSchema.merge(ScreenQuerySortsSchema)
);
