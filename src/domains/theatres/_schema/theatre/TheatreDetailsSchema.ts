/**
 * @fileoverview Zod schema and TypeScript type for detailed theatre objects containing aggregated metrics.
 */

import {TheatreSchema} from "@/domains/theatres/_schema/theatre/TheatreSchema.ts";
import {z} from "zod";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/**
 * Validates a theatre object extended with calculated counts for screens, total seats, and upcoming showings.
 */
export const TheatreDetailsSchema = TheatreSchema.extend({
    screenCount: NonNegativeNumberSchema,
    seatCount: NonNegativeNumberSchema,
    futureShowingCount: NonNegativeNumberSchema,
});

/**
 * Type representing the detailed theatre entity, inclusive of base data and aggregated counts.
 */
export type TheatreDetails = z.infer<typeof TheatreDetailsSchema>;
