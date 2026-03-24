/**
 * @file Orchestration hook for managing Theatre Screen form state and validation.
 * @filename useTheatreScreenSubmitForm.ts
 */

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useTheatreScreenSubmitFormDefaultValues
    from "@/domains/theatre-screens/forms/hooks/useTheatreScreenSubmitFormDefaultValues.ts";
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";
import {TheatreScreenFormSchema} from "@/domains/theatre-screens/forms/schema/TheatreScreenFormSchema.ts";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/forms/schema/TheatreScreenFormValuesSchema.ts";

/**
 * Parameters for configuring the Theatre Screen form initialization.
 */
type FormParams = {
    /** Partial values used to pre-fill specific fields (e.g., hardcoding a Theatre ID from a parent view). */
    presetValues?: Partial<TheatreScreenFormValues>;

    /** An existing entity instance used to populate the form during "Edit" workflows. */
    screen?: TheatreScreen;
};

/**
 * A specialized hook that initializes `react-hook-form` for Theatre Screen operations.
 */
export default function useTheatreScreenSubmitForm({screen, presetValues}: FormParams = {}) {
    const defaultValues: TheatreScreenFormValues = useTheatreScreenSubmitFormDefaultValues({presetValues, screen});

    return useForm<TheatreScreenFormValues>({
        resolver: zodResolver(TheatreScreenFormSchema),
        defaultValues,
    });
}