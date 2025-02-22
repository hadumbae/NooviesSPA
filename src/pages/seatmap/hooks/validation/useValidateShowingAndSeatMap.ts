import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PopulatedShowing, ShowingPopulatedSchema} from "@/pages/showings/schema/ShowingPopulatedSchema.ts";
import {PopulatedSeatMap, SeatMapPopulatedSchema} from "@/pages/seatmap/schema/SeatMapPopulatedSchema.ts";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";

export default function useValidateShowingAndSeatMap(params: {showing: Showing, seatMap: SeatMap}) {
    const {showing, seatMap} = params;

    const populatedShowing = useValidateData<typeof ShowingPopulatedSchema, PopulatedShowing>({
        schema: ShowingPopulatedSchema,
        data: showing,
    });

    const populatedSeatMap = useValidateData<typeof SeatMapPopulatedSchema, PopulatedSeatMap>({
        schema: SeatMapPopulatedSchema,
        data: seatMap,
    });

    return {
        showing: populatedShowing!,
        seatMap: populatedSeatMap!,
    };
}