/**
 * @file ReservedSeatSnapshotSchema.ts
 *
 * @description
 * Zod schema defining an immutable reserved seat snapshot.
 *
 * Represents the finalized state of a seat at the time of reservation,
 * capturing pricing and classification details exactly as they were when
 * the reservation was made. This prevents historical reservations from being
 * affected by later seat map or pricing changes.
 *
 * Intended usage:
 * - Embedding within reservation snapshots
 * - Persisting historical seat pricing data
 * - Read-only validation for booked seats
 */

import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { z } from "zod";

/**
 * Reserved seat snapshot schema.
 */
export const ReservedSeatSnapshotSchema = z.object({
    /** Identifier of the seat map this seat belongs to. */
    seatMap: IDStringSchema,

    /** Unique identifier of the seat within the seat map (e.g. "A12"). */
    seatIdentifier: NonEmptyStringSchema.max(20, "Must be 20 characters or less."),

    /** Classification or type of the seat (e.g. standard, VIP). */
    seatType: SeatTypeEnum,

    /** Final price paid for this seat at time of reservation. */
    pricePaid: PositiveNumberSchema,

    /** Optional human-readable label for display purposes. */
    seatLabel: NonEmptyStringSchema
        .max(50, "Must be 50 characters or less.")
        .optional(),
});

/**
 * TypeScript type inferred from {@link ReservedSeatSnapshotSchema}.
 */
export type ReservedSeatSnapshot = z.infer<typeof ReservedSeatSnapshotSchema>;
