import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SeatsByRowFormSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";

type SubmitFormParams = {
    presetValues?: Partial<SeatsByRowFormValues>;
}

export default function useSeatsByRowSubmitForm(
    {presetValues}: SubmitFormParams = {}
): UseFormReturn<SeatsByRowFormValues> {
    const defaultValues: SeatsByRowFormValues = {
        row: getDefaultValue(presetValues?.row, undefined, ""),
        numberOfSeats: getDefaultValue(presetValues?.numberOfSeats, undefined, ""),
        y: getDefaultValue(presetValues?.y, undefined, ""),
        theatre: getDefaultValue(presetValues?.theatre, undefined, undefined),
        screen: getDefaultValue(presetValues?.screen, undefined, undefined),
        seatType: getDefaultValue(presetValues?.seatType, undefined, undefined),
        isAvailable: getDefaultValue(presetValues?.isAvailable, undefined, true),
        priceMultiplier: getDefaultValue(presetValues?.priceMultiplier, undefined, ""),
    };

    return useForm<SeatsByRowFormValues>({
        resolver: zodResolver(SeatsByRowFormSchema),
        defaultValues,
    });
};
