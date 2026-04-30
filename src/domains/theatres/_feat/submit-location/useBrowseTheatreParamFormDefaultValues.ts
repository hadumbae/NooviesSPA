/**
 * @file useBrowseTheatreParamFormDefaultValues.ts
 *
 * React hook for producing stable default values
 * for theatre browse parameter forms.
 *
 * Ensures:
 * - Deterministic initial form state
 * - Referential stability across renders
 * - Safe merging of preset values
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {
    BrowseTheatreParams
} from "@/domains/theatres/_feat/submit-location/BrowseTheatreParamSchema.ts";
import {BrowseTheatreParamFormStarterValues} from "./BrowseTheatreParamFormStarterValues";

/**
 * Options for generating browse theatre form defaults.
 */
type ValueParams = {
    /** Optional preset query values */
    presetValues?: Partial<BrowseTheatreParams>;
};

/**
 * Returns referentially stable default values
 * for the browse theatre parameter form.
 *
 * @param presetValues - Optional preset browse parameters
 */
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
