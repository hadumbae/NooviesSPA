/**
 * @fileoverview Provides stable default values for Theatre Showing query forms to prevent unnecessary resets.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {ShowingsPageQueryFormStarterValues} from "@/domains/movies/_feat/client-view-data";

/** Parameters for the useTheatreScheduleQueryFormDefaultValues hook. */
type FormParams = {
    presetValues?: Partial<ShowingsPageQueryFormStarterValues>;
};

/** Returns stable default values for Theatre Showing query forms. */
export function useTheatreScheduleQueryFormDefaultValues(
    {presetValues}: FormParams
): ShowingsPageQueryFormStarterValues {
    const defaultValues: ShowingsPageQueryFormStarterValues = {
        page: 1,
        near: "",
        ...presetValues,
    };

    const heldValues = useRef<ShowingsPageQueryFormStarterValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}
