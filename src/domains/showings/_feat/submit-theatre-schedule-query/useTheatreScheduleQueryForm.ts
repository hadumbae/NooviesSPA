/**
 * @fileoverview Hook for managing theatre showing query options and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {
    useTheatreScheduleQueryFormDefaultValues
} from "@/domains/showings/_feat/submit-theatre-schedule-query/useTheatreScheduleQueryFormDefaultValues.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data";
import {
    ShowingsPageQueryFormValues,
} from "@/domains/movies/_feat/manage-showing-page/ShowingsPageQueryFormValues.ts";

/** Configuration parameters for the theatre schedule query form hook. */
export type FormParams = {
    presetValues?: Partial<ShowingsPageQueryStrings>;
};

/** Initializes a React Hook Form instance for theatre showings with Zod validation. */
export function useTheatreScheduleQueryForm(
    {presetValues}: FormParams
): UseFormReturn<ShowingsPageQueryFormValues, unknown, ShowingsPageQueryStrings> {
    const defaultValues = useTheatreScheduleQueryFormDefaultValues({presetValues});

    return useForm<ShowingsPageQueryFormValues, unknown, ShowingsPageQueryStrings>({
        resolver: zodResolver(ShowingsPageQueryStringSchema),
        defaultValues,
    });
}
