/**
 * @fileoverview Hook for producing referentially stable default values for theatre browse parameter forms.
 */

import {useRef} from "react";
import {isEqual} from "lodash";

import {BrowseTheatreParamFormStarterValues} from "@/domains/theatres";

/** Options for generating browse theatre form default values. */
type ValueParams = {
    presetValues?: Partial<BrowseTheatreParamFormStarterValues>;
};

/** Generates and memoizes default values for the theatre browse parameter form. */
export function useBrowseTheatreParamFormDefaultValues(
    {presetValues}: ValueParams = {},
): BrowseTheatreParamFormStarterValues {
    const defaultValues: BrowseTheatreParamFormStarterValues = {
        target: "",
        ...presetValues,
    };

    const heldValues = useRef<BrowseTheatreParamFormStarterValues>(defaultValues);

    if (!isEqual(defaultValues, heldValues.current)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}
