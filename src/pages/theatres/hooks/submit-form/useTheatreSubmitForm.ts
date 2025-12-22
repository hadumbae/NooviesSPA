import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreFormSchema} from "@/pages/theatres/schema/forms/TheatreForm.schema.ts";

import {Theatre} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {LocationFormValues} from "@/common/schema/models/location-form/LocationForm.types.ts";

type FormParams = {
    theatre?: Theatre;
    presetValues?: Partial<TheatreFormValues>;
}

export default function useTheatreSubmitForm(params?: FormParams): UseFormReturn<TheatreFormValues> {
    const {theatre, presetValues} = params || {};

    const location: LocationFormValues = {
        street: getDefaultValue(presetValues?.location?.street, theatre?.location.street, ""),
        city: getDefaultValue(presetValues?.location?.city, theatre?.location.city, ""),
        state: getDefaultValue(presetValues?.location?.state, theatre?.location.state, ""),
        country: getDefaultValue(presetValues?.location?.country, theatre?.location.country, ""),
        postalCode: getDefaultValue(presetValues?.location?.postalCode, theatre?.location.postalCode, ""),
        timezone: getDefaultValue(presetValues?.location?.timezone, theatre?.location.timezone, ""),

        includeCoordinates:
            presetValues?.location?.includeCoordinates ??
            Boolean(theatre?.location.coordinates) ??
            false,

        coordinates: {
            type: "Point",
            coordinates:
                presetValues?.location?.coordinates.coordinates ??
                theatre?.location.coordinates?.coordinates ??
                ["", ""],
        },
    };

    const defaultValues: TheatreFormValues = {
        name: getDefaultValue(presetValues?.name, theatre?.name, ""),
        seatCapacity: getDefaultValue(presetValues?.seatCapacity, theatre?.seatCapacity, ""),
        location,
    }

    return useForm<TheatreFormValues>({
        resolver: zodResolver(TheatreFormSchema),
        defaultValues,
    });
}