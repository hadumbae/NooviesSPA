/**
 * @fileoverview Zod validation schema and type definitions for a Theatre Screen with analytics and relational data.
 */

import {PopulatedTheatreScreenSchema} from "@/domains/theatre-screens/schema/model/PopulatedTheatreScreenSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {z} from "zod";

/**
 * Schema for a theatre screen including populated relational data and computed metrics.
 */
export const TheatreScreenDetailsSchema = PopulatedTheatreScreenSchema.extend({
    seatCount: NonNegativeNumberSchema,
    futureShowingCount: NonNegativeNumberSchema,
});

/** Theatre screen enriched with populated theatre data and operational metrics. */
export type TheatreScreenDetails = z.infer<typeof TheatreScreenDetailsSchema>;