import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {SeatMapPopulatedSchema} from "@/pages/seatmap/schema/SeatMapPopulatedSchema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

export default function useValidatePopulatedSeatMap(seatMap: SeatMap) {
    const result = SeatMapPopulatedSchema.safeParse(seatMap);

    if (!result.success) {
        throw new ParseError({
            message: "Invalid `Populated Seat Map` Data. ",
            errors: result.error.errors,
        });
    }

    return result.data;
}