/**
 * @fileoverview Hook for initializing the theatre submission form with validated default values.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreFormData, TheatreFormSchema, TheatreFormValues} from "@/domains/theatres/_feat/submit-data/schema.ts";
import {Theatre} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {
    useTheatreSubmitFormDefaultValues
} from "@/domains/theatres/_feat/submit-data/useTheatreSubmitFormDefaultValues.ts";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/**
 * Initializes and returns the theatre submission form controller with Zod validation.
 */
export function useTheatreSubmitForm(
    {presetValues, editEntity}: FormValuesConfig<TheatreFormValues, Theatre> = {}
): UseFormReturn<TheatreFormValues, unknown, TheatreFormData> {
    const defaultValues = useTheatreSubmitFormDefaultValues({
        theatre: editEntity,
        presetValues,
    });

    return useForm<TheatreFormValues, unknown, TheatreFormData>({
        resolver: zodResolver(TheatreFormSchema),
        defaultValues,
    });
}