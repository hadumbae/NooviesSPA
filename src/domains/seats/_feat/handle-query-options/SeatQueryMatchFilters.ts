/**
 * @fileoverview Zod schema and type definitions for validating Seat query filter parameters.
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/domains/seats/schema/SeatTypeEnumSchema.ts";
import { SeatLayoutTypeEnumSchema } from "@/domains/seats/schema/SeatLayoutTypeEnumSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for Seat-specific query filters used to build database match conditions.
 */
export const SeatQueryFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    row: NonEmptyStringSchema.optional(),
    seatNumber: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum.optional(),
    layoutType: SeatLayoutTypeEnumSchema.optional(),
    isAvailable: CoercedBooleanValueSchema.optional(),
    priceMultiplier: PositiveNumberSchema.optional(),
    theatre: IDStringSchema.optional(),
    theatreSlug: NonEmptyStringSchema.optional(),
    screen: IDStringSchema.optional(),
    screenSlug: NonEmptyStringSchema.optional(),
    showing: IDStringSchema.optional(),
    showingSlug: NonEmptyStringSchema.optional(),
});

/**
 * TypeScript type inferred from {@link SeatQueryFiltersSchema}.
 */
export type SeatQueryFilters = z.infer<typeof SeatQueryFiltersSchema>;