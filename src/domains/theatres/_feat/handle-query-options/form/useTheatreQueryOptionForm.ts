/**
 * @fileoverview Hook for initializing the theatre query options form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreQueryOptions, TheatreQueryOptionSchema,} from "@/domains/theatres/_feat/handle-query-options/options";
import {
    TheatreQueryOptionFormStarterValues,
} from "@/domains/theatres/_feat/handle-query-options/form/TheatreQueryOptionFormStarterValues.ts";

type FormProps = {
    presetValues?: Partial<TheatreQueryOptionFormStarterValues>;
}

export function useTheatreQueryOptionForm(
    {presetValues}: FormProps = {}
): UseFormReturn<TheatreQueryOptionFormStarterValues, unknown, TheatreQueryOptions> {
    const defaultValues = {
        _id: "",
        name: "",
        seatCapacity: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        timezone: "",
        sortByName: "",
        sortBySeatCapacity: "",
        sortByCity: "",
        sortByState: "",
        sortByCountry: "",
        sortByPostCode: "",
        sortByTimezone: "",
        ...presetValues,
    };

    return useForm<TheatreQueryOptionFormStarterValues, unknown, TheatreQueryOptions>({
        resolver: zodResolver(TheatreQueryOptionSchema),
        defaultValues,
    });
}