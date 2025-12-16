import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * ⚡ Returns a human-readable identifier for a seat or seat-like layout element.
 *
 * Seats resolve to their label (if present) or a row+number fallback,
 * while non-seat elements fall back to grid coordinates.
 *
 * @param seat
 * Seat or seat detail object from the seating schema.
 *
 * @returns
 * Display-ready identifier string.
 */
export default function getSeatIdentifier(seat: Seat | SeatDetails) {
    const {layoutType, row, x, y} = seat;

    if (layoutType !== "SEAT") {
        return `${row} • X${x}, Y${y}`;
    }

    const {seatNumber, seatLabel} = seat;

    return seatLabel ? seatLabel : `${row}${seatNumber}`;
}
