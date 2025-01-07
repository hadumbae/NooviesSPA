import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts"
import {ScreenSubmit, ScreenSubmitSchema} from "@/pages/screens/schema/ScreenSubmitSchema.ts";

export default function useScreenSubmitForm(params?: { screen?: Screen }) {
    const {screen} = params || {};
    const defaultValues: ScreenSubmit = {
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
    }

    let theatre = undefined;
    if (screen) {
        theatre = typeof screen.theatre === "string"
            ? screen.theatre
            : screen.theatre._id;
    }

    return useForm<ScreenSubmit>({
        resolver: zodResolver(ScreenSubmitSchema),
        defaultValues: {...defaultValues, ...(screen || {}), theatre},
    });
}