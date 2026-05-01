/**
 * @fileoverview Utility function for generating a human-readable identifier for a seat layout element.
 */

import {Seat} from "src/domains/seats/schema/model";
import {SeatDetails} from "src/domains/seats/schema/model";

/** Generates a human-readable identifier or coordinate string for a seat layout element. */
export function formatSeatLabel(seat: Seat | SeatDetails) {
    const {layoutType, row, x, y} = seat;

    if (layoutType !== "SEAT") {
        return `${row} • X${x}, Y${y}`;
    }

    const {seatNumber, seatLabel} = seat;

    return seatLabel ? seatLabel : `${row}${seatNumber}`;
}