import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreFormSchema} from "@/pages/theatres/schema/forms/TheatreForm.schema.ts";

import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

type FormParams = {
    theatre?: TheatreDetails;
    presetValues?: Partial<TheatreFormValues>;
}

export default function useTheatreSubmitForm(params?: FormParams): UseFormReturn<TheatreFormValues> {
    const {theatre, presetValues} = params || {};

    const defaultValues: TheatreFormValues = {
        name: getDefaultValue(presetValues?.name, theatre?.name, ""),
        location: getDefaultValue(presetValues?.location, theatre?.location, ""),
        seatCapacity: getDefaultValue(presetValues?.seatCapacity, theatre?.seatCapacity, ""),
    }

    return useForm<TheatreFormValues>({
        resolver: zodResolver(TheatreFormSchema),
        defaultValues,
    });
}