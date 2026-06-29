/**
 * @fileoverview Schema for career statistics derived from a person's movie credits.
 */

import {z} from "zod";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Statistics representing a person's professional footprint in the MovieCredit collection.
 */
export const PersonCreditStatsSchema = z.object({
    movieCount: NonNegativeNumberSchema,
    creditCount: NonNegativeNumberSchema,
});

/**
 * Validated type for a person's movie credit statistics.
 */
export type PersonCreditStats = z.infer<typeof PersonCreditStatsSchema>;