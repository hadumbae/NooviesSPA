/**
 * @file Seat.schema.ts
 * Validation schemas for theatre seat layout structures.
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { SeatLayoutTypeEnumSchema } from "@/pages/seats/schema/SeatLayoutTypeEnumSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Base layout entry shared across all structure types.
 */
export const SeatBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    layoutType: SeatLayoutTypeEnumSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Theatre and screen ownership reference.
 */
const SeatReferenceSchema = SeatBaseSchema.extend({
    theatre: IDStringSchema,
    screen: IDStringSchema,
});

/**
 * Bookable seating structure.
 */
export const SeatingStructureSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: preprocessEmptyStringToUndefined(NonNegativeNumberSchema),
});

/** Aisle layout structure. */
export const AisleStructureSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Stair layout structure. */
export const StairStructureSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/**
 * Layout entry discriminated by `layoutType`.
 */
export const SeatSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingStructureSchema, AisleStructureSchema, StairStructureSchema],
);