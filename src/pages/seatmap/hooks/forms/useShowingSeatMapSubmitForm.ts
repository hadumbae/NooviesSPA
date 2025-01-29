import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {SeatMapSubmit, SeatMapSubmitSchema} from "@/pages/seatmap/schema/SeatMapSubmitSchema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import convertObjectsToIDs from "@/common/utility/convertObjectsToIDs.ts";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";

export default function useShowingSeatMapSubmitForm(
    params: {showing: Showing, seatMap?: SeatMap}
): UseFormReturn<SeatMapSubmit> {
    const {showing, seatMap} = params;

    const defaultValues: SeatMapSubmit = {
        isAvailable: true,
        isReserved: false,
        price: "",
        seat: undefined,
        showing: undefined,
    };

    let seat = convertObjectsToIDs(seatMap?.seat);

    return useForm<SeatMapSubmit>({
        resolver: zodResolver(SeatMapSubmitSchema),
        defaultValues: {
            ...defaultValues,
            ...seatMap,
            showing: showing._id,
            seat,
        }
    })
}