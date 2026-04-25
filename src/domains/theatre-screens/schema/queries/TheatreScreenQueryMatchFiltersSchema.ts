/**
 * @fileoverview Zod schema and type definitions for filtering Theatre Screen queries.
 * Provides a standardized way to define search criteria for fetching screens.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ScreenTypeSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Zod schema for validating screen query filters.
 */
export const TheatreScreenQueryMatchFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    name: NonEmptyStringSchema.optional(),
    theatre: IDStringSchema.optional(),
    capacity: NonNegativeNumberSchema.optional(),
    screenType: ScreenTypeSchema.optional(),
});

/**
 * TypeScript type for Theatre Screen query filters.
 */
export type TheatreScreenQueryFilters = z.infer<typeof TheatreScreenQueryMatchFiltersSchema>;