import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SeatFormSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";

import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";

type SeatFormParams = {
    presetValues?: Partial<SeatFormValues>;
    seat?: Seat
}

export default function useSeatSubmitForm(params?: SeatFormParams): UseFormReturn<SeatFormValues> {
    const {presetValues, seat} = params || {};

    const theatre = typeof seat?.theatre === "string" ? seat.theatre : seat?.theatre?._id;
    const screen = typeof seat?.screen === "string" ? seat.screen : seat?.screen?._id;

    const defaultValues: SeatFormValues = {
        row: getDefaultValue(presetValues?.row, seat?.row, ""),
        seatNumber: getDefaultValue(presetValues?.seatNumber, seat?.seatNumber, ""),
        seatType: getDefaultValue(presetValues?.seatType, seat?.seatType, undefined),
        isAvailable: getDefaultValue(presetValues?.isAvailable, seat?.isAvailable, false),
        priceMultiplier: getDefaultValue(presetValues?.priceMultiplier, seat?.priceMultiplier, undefined),
        screen: getDefaultValue(presetValues?.screen, screen, undefined),
        theatre: getDefaultValue(presetValues?.theatre, theatre, undefined),
    }

    return useForm<SeatFormValues>({
        resolver: zodResolver(SeatFormSchema),
        defaultValues,
    });
}