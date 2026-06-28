/**
 * @fileoverview Defines the schema and type for seat map records within a showing.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema";
import {SeatMapStatusSchema} from "@/domains/seatmap/_schema/fields";

/** Zod schema for the reservation and pricing state of a seat within a showing. */
export const SeatMapSchema = z.object({
    _id: IDStringSchema,
    seat: IDStringSchema,
    reservation: IDStringSchema.nullable().optional(),
    showing: IDStringSchema,
    basePrice: PositiveNumberSchema,
    priceMultiplier: PositiveNumberSchema,
    overridePrice: PositiveNumberSchema.optional(),
    status: SeatMapStatusSchema,
});

/** Type definition for a SeatMap record. */
export type SeatMap = z.infer<typeof SeatMapSchema>;