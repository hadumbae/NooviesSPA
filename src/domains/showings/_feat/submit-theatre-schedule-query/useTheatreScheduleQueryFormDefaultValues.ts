/**
 * @fileoverview Provides stable default values for Theatre Showing query forms to prevent unnecessary resets.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {ShowingsPageQueryFormValues} from "@/domains/movies/_feat/manage-showing-page/ShowingsPageQueryFormValues.ts";

/** Parameters for the useTheatreScheduleQueryFormDefaultValues hook. */
type FormParams = {
    presetValues?: Partial<ShowingsPageQueryFormValues>;
};

/** Returns stable default values for Theatre Showing query forms. */
export function useTheatreScheduleQueryFormDefaultValues(
    {presetValues}: FormParams
): ShowingsPageQueryFormValues {
    const defaultValues: ShowingsPageQueryFormValues = {
        page: 1,
        near: "",
        ...presetValues,
    };

    const heldValues = useRef<ShowingsPageQueryFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}
