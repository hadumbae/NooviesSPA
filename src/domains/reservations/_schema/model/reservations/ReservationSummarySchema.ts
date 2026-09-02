/**
 * @fileoverview Zod schema and type definitions for reservation summary projections.
 */

import {z} from "zod";
import {ReservationBaseSchema} from "@/domains/reservations/_schema/model/reservations/ReservationBaseSchema.ts";

/** Zod schema for validating reservation summary attributes. */
export const ReservationSummarySchema = ReservationBaseSchema.pick({
    ticketCount: true,
    pricePaid: true,
    currency: true,
    isPaid: true,
    snapshot: true,
    _id: true,
    slug: true,
    uniqueCode: true,
    reservationType: true,
    status: true,
});

/** Inferred type for a validated reservation summary document. */
export type ReservationSummary = z.infer<typeof ReservationSummarySchema>;