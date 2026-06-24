/**
 * @fileoverview Orchestration hook for managing Theatre Screen form state and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {TheatreScreen} from "@/domains/theatre-screens/_schema";
import {
    useTheatreScreenSubmitFormDefaultValues
} from "@/domains/theatre-screens/_feat/submit-data/form/useTheatreScreenSubmitFormDefaultValues.ts";
import {
    TheatreScreenFormData,
    TheatreScreenFormSchema,
    TheatreScreenFormValues,
} from "@/domains/theatre-screens/_feat/submit-data/schema";

/**
 * Parameters for configuring the Theatre Screen form initialization.
 */
type FormParams = {
    presetValues?: Partial<TheatreScreenFormValues>;
    screen?: TheatreScreen;
};

/**
 * A specialized hook that initializes `react-hook-form` for Theatre Screen operations.
 */
export function useTheatreScreenSubmitForm(
    {screen, presetValues}: FormParams = {}
): UseFormReturn<TheatreScreenFormValues, unknown, TheatreScreenFormData> {
    const defaultValues: TheatreScreenFormValues = useTheatreScreenSubmitFormDefaultValues({presetValues, screen});

    return useForm<TheatreScreenFormValues, unknown, TheatreScreenFormData>({
        resolver: zodResolver(TheatreScreenFormSchema),
        defaultValues,
    });
}