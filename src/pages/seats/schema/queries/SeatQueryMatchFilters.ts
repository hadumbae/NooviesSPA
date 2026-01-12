/**
 * @file SeatQueryFiltersSchema.ts
 *
 * Zod schema and derived type for validating Seat query filter parameters.
 *
 * Defines match-level filters that map directly to Seat document fields and
 * are typically translated into MongoDB/Mongoose query conditions.
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { SeatLayoutTypeEnumSchema } from "@/pages/seats/schema/SeatLayoutTypeEnumSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for match-level Seat query filters.
 *
 * All fields are optional and correspond to directly filterable Seat properties.
 *
 * @example
 * ```ts
 * SeatQueryFiltersSchema.parse({
 *   row: "A",
 *   seatType: "VIP",
 *   isAvailable: true,
 * });
 * ```
 */
export const SeatQueryFiltersSchema = z.object({
    /** Seat MongoDB ObjectId */
    _id: IDStringSchema.optional(),

    /** Row label (e.g. "A", "B") */
    row: NonEmptyStringSchema.optional(),

    /** Seat number within the row */
    seatNumber: NonEmptyStringSchema.optional(),

    /** Seat classification (REGULAR, VIP, etc.) */
    seatType: SeatTypeEnum.optional(),

    /** Layout classification (SEAT, NON_SEAT, etc.) */
    layoutType: SeatLayoutTypeEnumSchema.optional(),

    /** Availability status */
    isAvailable: CoercedBooleanValueSchema.optional(),

    /** Price multiplier relative to base ticket price */
    priceMultiplier: PositiveNumberSchema.optional(),

    /** Associated theatre */
    theatre: IDStringSchema.optional(),
    theatreSlug: NonEmptyStringSchema.optional(),

    /** Associated screen */
    screen: IDStringSchema.optional(),
    screenSlug: NonEmptyStringSchema.optional(),

    /** Associated showing */
    showing: IDStringSchema.optional(),
    showingSlug: NonEmptyStringSchema.optional(),
});

/**
 * Inferred TypeScript type for Seat query filters.
 *
 * @remarks
 * This type is derived from {@link SeatQueryFiltersSchema} and is intended for
 * use in repository, service, and controller query signatures.
 */
export type SeatQueryFilters = z.infer<typeof SeatQueryFiltersSchema>;
