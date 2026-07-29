/**
 * @fileoverview Defines the schema and type for seat map entries with populated seat and showing details.
 */

import {z} from "zod";
import {SeatDetailsSchema} from "@/domains/seats/_schema/model";
import {PopulatedShowingSchema} from "@/domains/showings/_schema/showing";
import {SeatMapSchema} from "@/domains/seatmaps/_schema/model/SeatMapSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas/strings";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for a seat map entry including positional data and related entity details. */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: SeatDetailsSchema,
    showing: PopulatedShowingSchema,
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatLabel: NonEmptyStringSchema.optional(),
    finalPrice: PositiveNumberSchema,
});

/** Represents a seat map entry with populated seat and showing information. */
export type SeatMapDetails = z.infer<typeof SeatMapDetailsSchema>;