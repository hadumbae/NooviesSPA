import {ParseError} from "@/common/errors/ParseError.ts";
import {SeatMap, SeatMapDetails, SeatMapSchema} from "@/domains/seatmaps/_schema";

export function simplifySeatMapDetails(seatMap: SeatMapDetails): SeatMap {
    const {
        seat: {_id: seat},
        showing: {_id: showing},
    } = seatMap;

    const raw = {...seatMap, seat, showing};
    const {data, success, error} = SeatMapSchema.safeParse(raw);

    if (!success) {
        const {errors} = error;
        throw new ParseError({
            raw,
            errors,
            message: "Failed to simplify seat map details.",
        });
    }

    return data;
}
