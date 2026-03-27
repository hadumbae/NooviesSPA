/**
 * @file Zod schema defining an immutable snapshot of a reserved seat.
 * @filename ReservedSeatSnapshotSchema.ts
 */

import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/domains/seats/schema/SeatTypeEnumSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {z} from "zod";

/**
 * Represents the finalized state of a single seat at the moment of booking.
 */
export const ReservedSeatSnapshotSchema = z.object({
    /** The BSON ID of the seat map layout used during the selection. */
    seatMap: IDStringSchema,

    /** The logical identifier for the seat, typically a row-column coordinate. */
    seatIdentifier: NonEmptyStringSchema.max(20, "Must be 20 characters or less."),

    /** The tier or category of the seat at the time of reservation. */
    seatType: SeatTypeEnum,

    /** The validated cost attributed specifically to this seat. */
    pricePaid: PositiveNumberSchema,

    /** An optional display-friendly label (e.g., "Wheelchair Accessible"). */
    seatLabel: NonEmptyStringSchema
        .max(50, "Must be 50 characters or less.")
        .optional(),
});

/**
 * TypeScript type inferred from {@link ReservedSeatSnapshotSchema}.
 */
export type ReservedSeatSnapshot = z.infer<typeof ReservedSeatSnapshotSchema>;