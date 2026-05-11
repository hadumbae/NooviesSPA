/**
 * @fileoverview Hook for producing referentially stable default values for theatre browse parameter forms.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {BrowseTheatreParamFormStarterValues} from "./BrowseTheatreParamFormStarterValues";

/** Options for generating browse theatre form default values. */
type ValueParams = {
    presetValues?: Partial<BrowseTheatreParamFormStarterValues>;
};

/** Generates and memoizes default values for the theatre browse parameter form. */
export function useBrowseTheatreParamFormDefaultValues(
    {presetValues}: ValueParams = {},
): BrowseTheatreParamFormStarterValues {
    const initialValues = useRef<BrowseTheatreParamFormStarterValues | null>(null);

    const defaultValues: BrowseTheatreParamFormStarterValues = {
        target: "",
        ...presetValues,
    };

    if (!isEqual(defaultValues, initialValues.current)) {
        initialValues.current = defaultValues;
    }

    return initialValues.current ?? defaultValues;
}
