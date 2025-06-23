import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ScreenFormSchema} from "@/pages/screens/schema/forms/ScreenForm.schema.ts";
import {ScreenType} from "@/pages/screens/schema/ScreenType.enum.ts";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm} from "@/pages/screens/schema/forms/ScreenForm.types.ts";

interface Params {
    screen?: Screen;
    defaultValues?: {
        name?: string,
        capacity?: number,
        screenType?: ScreenType,
        theatre?: ObjectId
    }
}

export default function useScreenSubmitForm(params: Params) {
    const {screen, defaultValues = {}} = params || {};

    let initialValues: ScreenForm = {
        ...{name: "", capacity: "", screenType: undefined, theatre: undefined},
        ...defaultValues,
    };

    if (screen) {
        const theatre = typeof screen.theatre === "string" ? screen.theatre : screen.theatre._id;
        initialValues = {...screen, theatre};
    }

    return useForm<ScreenForm>({
        resolver: zodResolver(ScreenFormSchema),
        defaultValues: initialValues,
    });
}