/**
 * @fileoverview Zod schema and TypeScript type for detailed theatre objects containing aggregated metrics.
 */

import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {z} from "zod";

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
