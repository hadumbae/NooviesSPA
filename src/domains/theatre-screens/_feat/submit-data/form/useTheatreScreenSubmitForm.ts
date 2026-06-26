/**
 * @fileoverview Orchestration hook for managing Theatre Screen form state and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
    useTheatreScreenSubmitFormDefaultValues
} from "@/domains/theatre-screens/_feat/submit-data/form/useTheatreScreenSubmitFormDefaultValues.ts";
import {
    TheatreScreenFormData,
    TheatreScreenFormSchema,
    TheatreScreenFormValues,
} from "@/domains/theatre-screens/_feat/submit-data/schema";
import {FormValuesConfig} from "@/common/_feat/submit-data";
import {TheatreScreen} from "@/domains/theatre-screens";

/**
 * A specialized hook that initializes `react-hook-form` for Theatre Screen operations.
 */
export function useTheatreScreenSubmitForm(
    values: FormValuesConfig<TheatreScreenFormValues, TheatreScreen> = {}
): UseFormReturn<TheatreScreenFormValues, unknown, TheatreScreenFormData> {
    const defaultValues: TheatreScreenFormValues = useTheatreScreenSubmitFormDefaultValues(values);

    return useForm<TheatreScreenFormValues, unknown, TheatreScreenFormData>({
        resolver: zodResolver(TheatreScreenFormSchema),
        defaultValues,
    });
}