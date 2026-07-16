/**
 * @fileoverview Zod schemas and types for validating seat layout data in the seat submission form.
 */

import {z} from "zod";
import {SeatLabelSchema, SeatLayoutTypeSchema, SeatRowSchema, SeatTypeSchema} from "@/domains/seats/_schema/fields";
import {IDStringSchema} from "@/common/_schemas";
import {CoercedBooleanValueSchema, NonNegativeNumberSchema, PositiveIntegerSchema,} from "@/common/_schemas";
import {preprocessOptionalField, preprocessToNumber} from "@/common/_feat/validation-preprocessors";
import {AnyUnionValues} from "@/common/types";

/** Base Zod schema containing shared geometric and relational fields for all seat layout elements. */
export const SeatFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: SeatRowSchema,
    x: preprocessToNumber(PositiveIntegerSchema),
    y: preprocessToNumber(PositiveIntegerSchema),
    layoutType: SeatLayoutTypeSchema,
});

const SeatingSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: preprocessToNumber(PositiveIntegerSchema),
    seatLabel: preprocessOptionalField(SeatLabelSchema),
    seatType: SeatTypeSchema,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: preprocessToNumber(NonNegativeNumberSchema),
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