/**
 * @file Query filter schema for movie review matching.
 * MovieReviewMatchFiltersSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {BooleanValueSchema} from "@/common/_schemas/boolean/BooleanValueSchema.ts";

import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/**
 * Filter criteria for movie review queries.
 */
export const MovieReviewMatchQueryFiltersSchema = z.object({
    movieID: IDStringSchema.optional(),
    isRecommended: BooleanValueSchema.optional(),
    rating: PositiveNumberSchema
        .min(1, "Must be at least 1.")
        .max(5, "Must be no more than 5.")
        .optional(),
});

/**
 * Inferred type for movie review query filters.
 */
export type MovieReviewMatchQueryFilters = z.infer<typeof MovieReviewMatchQueryFiltersSchema>;