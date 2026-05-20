/**
 * @fileoverview Hook for managing theatre showing query options and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {
    useTheatreScheduleQueryFormDefaultValues
} from "@/domains/showings/_feat/submit-theatre-schedule-query/useTheatreScheduleQueryFormDefaultValues.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    ShowingsPageQueryFormStarterValues,
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data";

/** Configuration parameters for the theatre schedule query form hook. */
export type FormParams = {
    presetValues?: Partial<ShowingsPageQueryStrings>;
};

/** Initializes a React Hook Form instance for theatre showings with Zod validation. */
export function useTheatreScheduleQueryForm(
    {presetValues}: FormParams
): UseFormReturn<ShowingsPageQueryFormStarterValues, unknown, ShowingsPageQueryStrings> {
    const defaultValues = useTheatreScheduleQueryFormDefaultValues({presetValues});

    return useForm<ShowingsPageQueryFormStarterValues, unknown, ShowingsPageQueryStrings>({
        resolver: zodResolver(ShowingsPageQueryStringSchema),
        defaultValues,
    });
}
