/**
 * @fileoverview Zod schema and type definitions for fully populated seat details.
 */

import {z} from "zod";
import {SeatBaseSchema} from "./SeatSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {SeatTypeSchema} from "../fields/SeatTypeSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {TheatreScreenSchema} from "@/domains/theatre-screens/_schema/model";
import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";

/** Schema for seating positions with full theatre and screen references. */
const SeatDetailsReferenceSchema = SeatBaseSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => TheatreScreenSchema),
});

/** Schema for seating positions with full theatre and screen references. */
const SeatingSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: SeatTypeSchema,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: CoercedNumberValueSchema.gte(0, "Must be 0 or greater."),
});

/** Schema for an aisle position within the layout. */
const AisleSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Schema for a stair position within the layout. */
const StairSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Discriminated union schema for fully populated seat details. */
export const SeatDetailsSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingSchema, AisleSchema, StairSchema],
);

/** TypeScript type representing a seat with fully populated theatre and screen objects. */
export type SeatDetails = z.infer<typeof SeatDetailsSchema>;