import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";

type SortParams = {
    seats: SeatDetails[];
};

type SortReturns = {
    sortedSeats: Map<number, (SeatDetails | number | null)[]>;
    maxX: number;
    maxY: number;
}

export default function organiseScreenSeatMap({seats}: SortParams): SortReturns {
    if (!seats.length) {
        return {
            sortedSeats: new Map<number, SeatDetails[]>(),
            maxX: 0,
            maxY: 0,
        };
    }

    // ⚡ Ger Max Values ⚡

    let maxX = 0;
    let maxY = 0;

    for (const seat of seats) {
        if (seat.x > maxX) maxX = seat.x;
        if (seat.y > maxY) maxY = seat.y;
    }

    // ⚡ Push Rows Into Map ⚡

    const rows = new Map<number, SeatDetails[]>();

    for (let y = 1; y <= maxY; y++) {
        rows.set(y, []);
    }

    // ⚡ Push Seats To Map ⚡

    for (const seat of seats) {
        rows.get(seat.y)!.push(seat);
    }

    // ⚡ Convert Rows Into Full-Length Arrays ⚡

    const sortedSeats = new Map<number, (SeatDetails | number | null)[]>();
    const reversedY = Array.from(rows.keys()).sort((a, b) => b - a);

    for (const y of reversedY) {
        const row = rows.get(y);
        const seatRow: (SeatDetails | null)[] = Array.from({length: maxX}, () => null);

        for (const seat of row!) {
            seatRow[seat.x - 1] = seat;
        }

        sortedSeats.set(y, seatRow);
    }

    // ⚡ Add Label Row ⚡

    sortedSeats.set(0, Array.from({length: maxX}, (_, i) => i + 1));

    return {
        sortedSeats,
        maxX,
        maxY,
    };

}
