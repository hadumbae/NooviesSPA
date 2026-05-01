/**
 * @fileoverview Zod schema and type definition for showing details including seat availability metrics.
 */

import {PopulatedShowingSchema} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {z} from "zod";

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