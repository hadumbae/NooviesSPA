import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreFormData, TheatreFormSchema} from "@/domains/theatres/_feat/submit-data/TheatreForm.schema.ts";
import {Theatre} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {TheatreFormStarterValues} from "./TheatreFormStarterValues";
import {
    useTheatreSubmitFormDefaultValues
} from "@/domains/theatres/_feat/submit-data/useTheatreSubmitFormDefaultValues.ts";

type FormParams = {
    theatre?: Theatre;
    presetValues?: Partial<TheatreFormStarterValues>;
}

export function useTheatreSubmitForm(
    params: FormParams = {}
): UseFormReturn<TheatreFormStarterValues, unknown, TheatreFormData> {
    const defaultValues = useTheatreSubmitFormDefaultValues(params);

    return useForm<TheatreFormStarterValues, unknown, TheatreFormData>({
        resolver: zodResolver(TheatreFormSchema),
        defaultValues,
    });
}