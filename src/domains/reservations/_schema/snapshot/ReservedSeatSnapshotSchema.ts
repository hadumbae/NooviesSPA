/**
 * @fileoverview Zod schema defining an immutable snapshot of a reserved seat.
 *
 */

import {IDStringSchema} from "@/common/_schemas";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {SeatTypeSchema} from "@/domains/seats/_schema/fields";
import {z} from "zod";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/**
 * Zod schema for the finalized state of a single seat at the moment of booking.
 */
export const ReservedSeatSnapshotSchema = z.object({
    seatMap: IDStringSchema,
    seatIdentifier: NonEmptyStringSchema.max(20, "Must be 20 characters or less."),
    seatType: SeatTypeSchema,
    pricePaid: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.max(50, "Must be 50 characters or less.").optional(),
});

/**
 * TypeScript type representing a finalized seat snapshot.
 */
export type ReservedSeatSnapshot = z.infer<typeof ReservedSeatSnapshotSchema>;