import {SeatMapFormSchema} from "@/pages/seatmap/schema/form/SeatMapForm.schema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import convertObjectsToIDs from "@/common/utility/formatters/convertObjectsToIDs.ts";

import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {SeatMapForm} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";

export default function useShowingSeatMapSubmitForm(
    params: {showing: Showing, seatMap?: SeatMap}
): UseFormReturn<SeatMapForm> {
    const {showing, seatMap} = params;

    const defaultValues: SeatMapForm = {
        isAvailable: true,
        isReserved: false,
        price: "",
        seat: undefined,
        showing: undefined,
    };

    let seat = convertObjectsToIDs(seatMap?.seat);

    return useForm<SeatMapForm>({
        resolver: zodResolver(SeatMapFormSchema),
        defaultValues: {
            ...defaultValues,
            ...seatMap,
            showing: showing._id,
            seat,
        }
    })
}