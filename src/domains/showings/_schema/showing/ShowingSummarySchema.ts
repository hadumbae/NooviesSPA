/**
 * @fileoverview Zod schema and type definitions for showing summary projections.
 */

import {z} from "zod";
import {ShowingSchema} from "@/domains/showings/_schema/showing/ShowingSchema.ts";

/** Zod schema for validating showing summary attributes. */
export const ShowingSummarySchema = ShowingSchema.pick({
    _id: true,
    startTime: true,
    endTime: true,
    ticketPrice: true,
    movie: true,
    status: true,
    theatreSnapshot: true,
    config: true,
    slug: true,
});

/** Inferred type for a validated showing summary document. */
export type ShowingSummary = z.infer<typeof ShowingSummarySchema>;