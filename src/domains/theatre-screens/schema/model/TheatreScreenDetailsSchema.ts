/**
 * @file Zod validation schema and type definitions for a Theatre Screen with analytics and relational data.
 * @filename TheatreScreenDetailsSchema.ts
 */

import {PopulatedTheatreScreenSchema} from "@/domains/theatre-screens/schema/model/PopulatedTheatreScreenSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {z} from "zod";

/**
 * Zod schema for a Theatre Screen that includes both populated relational data and computed server-side metrics.
 */
export const TheatreScreenDetailsSchema = PopulatedTheatreScreenSchema.extend({
    /** * The validated total capacity of the screen.
     * @note While similar to 'capacity' in the base schema, this serves as the confirmed seat count for analytics.
     */
    seatCount: NonNegativeNumberSchema,

    /** * The number of scheduled showings occurring after the current server timestamp.
     * Useful for determining screen utilization and upcoming schedule density.
     */
    futureShowingCount: NonNegativeNumberSchema,
});

/**
 * TypeScript type representing a Theatre Screen enriched with populated theatre data and operational metrics.
 * Inferred directly from {@link TheatreScreenDetailsSchema}.
 */
export type TheatreScreenDetails = z.infer<typeof TheatreScreenDetailsSchema>;