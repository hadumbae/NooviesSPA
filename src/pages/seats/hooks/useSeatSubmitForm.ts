import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SeatSubmit, SeatSubmitSchema} from "@/pages/seats/schema/SeatSubmitSchema.ts";
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";


export default function useSeatSubmitForm(params?: {seat?: Seat}) {
    const {seat} = params || {};
    const defaultValues: SeatSubmit = {
        row: "",
        seatNumber: "",
        seatType: undefined,
        isAvailable: false,
        priceMultiplier: "",
        screen: undefined,
        theatre: undefined,
    }

    let theatre = undefined;
    let screen = undefined;
    if (seat) {
        theatre = typeof seat.theatre === "string" ? seat.theatre : seat.theatre._id;
        screen = typeof seat.screen === "string" ? seat.screen : seat.screen._id;
    }

    return useForm<SeatSubmit>({
        resolver: zodResolver(SeatSubmitSchema),
        defaultValues: {
            ...defaultValues,
            ...(seat || {}),
            theatre,
            screen,
        },
    });
}