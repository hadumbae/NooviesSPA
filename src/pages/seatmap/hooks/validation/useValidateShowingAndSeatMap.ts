import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {ShowingPopulatedSchema} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";
import {SeatMapPopulatedSchema} from "@/pages/seatmap/schema/SeatMapPopulatedSchema.ts";
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";

export default function useValidateShowingAndSeatMap(params: {showing: Showing, seatMap: SeatMap}) {
    const {showing, seatMap} = params;

    const populatedShowing = useValidateData<typeof ShowingPopulatedSchema>({
        schema: ShowingPopulatedSchema,
        data: showing,
    });

    const populatedSeatMap = useValidateData<typeof SeatMapPopulatedSchema>({
        schema: SeatMapPopulatedSchema,
        data: seatMap,
    });

    const success = populatedShowing.success && populatedSeatMap.success;
    const error = populatedShowing.error || populatedSeatMap.error;

    return {
        data: {
            showing: populatedShowing.data,
            seatMap: populatedSeatMap.data,
        },
        success,
        error,
    };
}