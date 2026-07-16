/**
 * @fileoverview Zod schema and type definition for showing details including seat availability metrics.
 */

import {z} from "zod";
import {PopulatedShowingSchema} from "@/domains/showings/_schema/showing/PopulatedShowingSchema.ts";

import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/**
 * Extends {@link PopulatedShowingSchema} with seat availability metrics.
 */
export const ShowingDetailsSchema = PopulatedShowingSchema.extend({
    seatMapCount: NonNegativeNumberSchema,
    unavailableSeatsCount: NonNegativeNumberSchema,
    availableSeatsCount: NonNegativeNumberSchema,
    reservedSeatsCount: NonNegativeNumberSchema,
    soldSeatsCount: NonNegativeNumberSchema,
});

/**
 * Inferred showing details type.
 */
export type ShowingDetails = z.infer<typeof ShowingDetailsSchema>;