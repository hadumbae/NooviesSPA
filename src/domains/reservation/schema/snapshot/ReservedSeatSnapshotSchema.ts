/**
 * @fileoverview Zod schema defining an immutable snapshot of a reserved seat.
 *
 */

import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {SeatTypeSchema} from "@/domains/seats/_schema/fields";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {z} from "zod";

/**
 * Zod schema for the finalized state of a single seat at the moment of booking.
 */
export const ReservedSeatSnapshotSchema = z.object({
    seatMap: IDStringSchema,
    seatIdentifier: NonEmptyStringSchema.max(20, "Must be 20 characters or less."),
    seatType: SeatTypeSchema,
    pricePaid: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema
        .max(50, "Must be 50 characters or less.")
        .optional(),
});

/**
 * TypeScript type representing a finalized seat snapshot.
 */
export type ReservedSeatSnapshot = z.infer<typeof ReservedSeatSnapshotSchema>;