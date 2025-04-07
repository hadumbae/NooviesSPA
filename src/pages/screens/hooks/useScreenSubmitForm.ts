import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts"
import {ScreenSubmit, ScreenSubmitSchema} from "@/pages/screens/schema/ScreenSubmitSchema.ts";
import {ScreenType} from "@/pages/screens/schema/ScreenTypeEnum.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";

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

    let initialValues: ScreenSubmit = {
        ...{name: "", capacity: "", screenType: undefined, theatre: undefined},
        ...defaultValues,
    };

    if (screen) {
        const theatre = typeof screen.theatre === "string" ? screen.theatre : screen.theatre._id;
        initialValues = {...screen, theatre};
    }

    return useForm<ScreenSubmit>({
        resolver: zodResolver(ScreenSubmitSchema),
        defaultValues: initialValues,
    });
}