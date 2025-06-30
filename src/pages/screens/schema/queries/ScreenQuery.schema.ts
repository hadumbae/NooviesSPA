import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenType.enum.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Query options for additional screen query configurations.
 */
export const ScreenQueryOptionsSchema = z.object({
    /**
     * Number of showings to include per screen.
     * Optional; must be a non-negative number.
     */
    showingsPerScreen: NonNegativeNumberSchema.optional(),
});

/**
 * Match filters for querying screens.
 */
export const ScreenQueryMatchFiltersSchema = z.object({
    /**
     * Filter by screen name (optional).
     */
    name: NonEmptyStringSchema.optional(),

    /**
     * Filter by screen capacity (optional, non-negative).
     */
    capacity: NonNegativeNumberSchema.optional(),

    /**
     * Filter by screen type (e.g., IMAX, 3D) — optional.
     */
    screenType: ScreenTypeEnum.optional(),

    /**
     * Filter by theatre ID (must be a valid ID string).
     */
    theatre: IDStringSchema.optional(),
});

/**
 * Combined screen query filters and options schema.
 */
export const ScreenQueryFilterSchema = ScreenQueryMatchFiltersSchema.merge(ScreenQueryOptionsSchema);

/**
 * Sort options for screen queries.
 */
export const ScreenQuerySortsSchema = z.object({
    /**
     * Sort by screen name (optional).
     */
    name: MongooseSortOrderSchema.optional(),

    /**
     * Sort by screen capacity (optional).
     */
    capacity: MongooseSortOrderSchema.optional(),

    /**
     * Sort by screen type (optional).
     */
    screenType: MongooseSortOrderSchema.optional(),

    /**
     * Sort by theatre name (optional).
     */
    theatreName: MongooseSortOrderSchema.optional(),
});