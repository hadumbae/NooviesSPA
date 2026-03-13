import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * @summary
 * Grid-based seat positioning data.
 *
 * @remarks
 * Represents a seat’s identity, row label, and 2D coordinates
 * within a seating layout grid.
 */
export type GridPositionedSeat = {
    /** Unique identifier for the seat */
    _id: ObjectId;

    /** Row label (e.g. "A", "B", "AA") */
    row: string;

    /** Horizontal grid position (1-based) */
    x: number;

    /** Vertical grid position (1-based) */
    y: number;
};
