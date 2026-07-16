/**
 * @fileoverview Grid-based seat positioning data structure.
 */

import { ObjectId } from "@/common/_schemas";

/** Grid-based seat positioning data. */
export type GridPositionedSeat = {
    _id: ObjectId;
    row: string;
    x: number;
    y: number;
};