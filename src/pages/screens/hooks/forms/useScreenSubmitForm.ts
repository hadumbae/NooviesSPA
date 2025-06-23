import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ScreenFormSchema} from "@/pages/screens/schema/forms/ScreenForm.schema.ts";

import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

interface Params {
    screen?: Screen;
    presetValues?: Partial<ScreenFormValues>;
}

export default function useScreenSubmitForm(params: Params) {
    const {screen, presetValues = {}} = params || {};

    const theatre = typeof screen?.theatre === "string"
        ? screen.theatre
        : screen?.theatre?._id;

    let defaultValues: ScreenFormValues = {
        name: getDefaultValue(presetValues.name, screen?.name, ""),
        capacity: getDefaultValue(presetValues.capacity, screen?.capacity, undefined),
        screenType: getDefaultValue(presetValues.screenType, screen?.screenType, undefined),
        theatre: getDefaultValue(presetValues.theatre, theatre, undefined),
    };

    return useForm<ScreenFormValues>({
        resolver: zodResolver(ScreenFormSchema),
        defaultValues,
    });
}