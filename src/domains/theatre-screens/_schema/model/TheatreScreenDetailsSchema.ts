/**
 * @fileoverview Zod validation schema and type definitions for a Theatre Screen with analytics and relational data.
 */

import {z} from "zod";
import {PopulatedTheatreScreenSchema} from "@/domains/theatre-screens/_schema/model/PopulatedTheatreScreenSchema.ts";

import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/**
 * Schema for a theatre screen including populated relational data and computed metrics.
 */
export const TheatreScreenDetailsSchema = PopulatedTheatreScreenSchema.extend({
    seatCount: NonNegativeNumberSchema,
    futureShowingCount: NonNegativeNumberSchema,
});

/** Theatre screen enriched with populated theatre data and operational metrics. */
export type TheatreScreenDetails = z.infer<typeof TheatreScreenDetailsSchema>;