/**
 * @fileoverview Utility function for generating a human-readable identifier for a seat layout element.
 */

import {Seat} from "@/domains/seats/_schema/model";
import {SeatDetails} from "@/domains/seats/_schema/model";

/** Generates a human-readable identifier or coordinate string for a seat layout element. */
export function formatSeatLabel(seat: Seat | SeatDetails) {
    const {layoutType, row, x, y} = seat;

    if (layoutType !== "SEAT") {
        return `${row} • X${x}, Y${y}`;
    }

    const {seatNumber, seatLabel} = seat;

    return seatLabel ? seatLabel : `${row}${seatNumber}`;
}