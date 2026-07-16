/**
 * @fileoverview Defines the schema and type for seat map entries with populated seat and showing details.
 */

import {z} from "zod";
import {SeatDetailsSchema} from "@/domains/seats";
import {PopulatedShowingSchema} from "@/domains/showings";
import {SeatMapSchema} from "@/domains/seatmaps/_schema/model/SeatMapSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for a seat map entry including positional data and related entity details. */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatDetailsSchema),
    showing: z.lazy(() => PopulatedShowingSchema),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatLabel: NonEmptyStringSchema.optional(),
    finalPrice: PositiveNumberSchema,
});

/** Represents a seat map entry with populated seat and showing information. */
export type SeatMapDetails = z.infer<typeof SeatMapDetailsSchema>;