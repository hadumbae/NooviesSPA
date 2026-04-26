/**
 * @fileoverview Zod schemas and type definitions for validating seat form submissions.
 */

import {z} from "zod";
import {SeatTypeEnum} from "@/domains/seats/schema/SeatTypeEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CleanedPositiveNumberSchema,} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {SeatLayoutTypeEnumSchema} from "@/domains/seats/schema/SeatLayoutTypeEnumSchema.ts";

/**
 * Base schema containing shared geometric and relational data for all layout elements.
 */
export const SeatFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    x: CleanedPositiveNumberSchema,
    y: CleanedPositiveNumberSchema,
    layoutType: SeatLayoutTypeEnumSchema,
});

/**
 * Schema for physical seats requiring identifying numbers, types, and pricing metadata.
 */
const SeatingSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: CleanedPositiveNumberSchema,
    seatLabel: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(50, {message: "Must be 50 characters or less."}).optional(),
    ).optional(),
    seatType: SeatTypeEnum,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: CleanedPositiveNumberSchema,
});

/**
 * Schema for aisle blocks representing non-seatable floor space.
 */
const AisleSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("AISLE"),
});

/**
 * Schema for stair blocks representing elevation changes in the layout.
 */
const StairSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("STAIR"),
});

/**
 * Discriminated union schema for validating any layout element based on its layoutType.
 */
export const SeatFormSchema = z.discriminatedUnion("layoutType", [
    SeatingSchema,
    AisleSchema,
    StairSchema,
]);

/**
 * TypeScript type inferred from {@link SeatFormSchema}.
 */
export type SeatFormData = z.infer<typeof SeatFormSchema>;