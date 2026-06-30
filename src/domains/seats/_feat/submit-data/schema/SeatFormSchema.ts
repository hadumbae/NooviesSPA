/**
 * @fileoverview Zod schemas and types for validating seat layout data in the seat submission form.
 */

import {z} from "zod";
import {SeatLayoutTypeSchema, SeatTypeSchema} from "@/domains/seats/_schema/fields";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CleanedPositiveNumberSchema,} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {AnyUnionValues} from "@/common/types";

/** Base Zod schema containing shared geometric and relational fields for all seat layout elements. */
export const SeatFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    x: CleanedPositiveNumberSchema,
    y: CleanedPositiveNumberSchema,
    layoutType: SeatLayoutTypeSchema,
});

const SeatingSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: CleanedPositiveNumberSchema,
    seatLabel: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(50, {message: "Must be 50 characters or less."}).optional(),
    ).optional(),
    seatType: SeatTypeSchema,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: CleanedPositiveNumberSchema,
});

const AisleSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("AISLE"),
});

const StairSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Discriminated union Zod schema for validating different types of seat layout elements. */
export const SeatFormSchema = z.discriminatedUnion("layoutType", [
    SeatingSchema,
    AisleSchema,
    StairSchema,
]);

/** Type representing the inferred data structure from the seat form schema. */
export type SeatFormData = z.infer<typeof SeatFormSchema>;

/** Type representing the raw form values for the seat submission form. */
export type SeatFormValues = AnyUnionValues<SeatFormData>;