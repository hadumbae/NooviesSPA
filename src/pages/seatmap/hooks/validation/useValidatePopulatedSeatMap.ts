import {ParseError} from "@/common/errors/ParseError.ts";
import {SeatMapDetailsSchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

export default function useValidatePopulatedSeatMap(seatMap: SeatMap) {
    const result = SeatMapDetailsSchema.safeParse(seatMap);

    if (!result.success) {
        throw new ParseError({
            message: "Invalid `Populated Seat Map` Data. ",
            errors: result.error.errors,
        });
    }

    return result.data;
}