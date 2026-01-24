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
    BrowseTheatreParamFormValues,
    BrowseTheatreParams,
} from "@/pages/theatres/schema/params/client/browse-theatre-list/BrowseTheatreParamSchema.ts";

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
): BrowseTheatreParamFormValues {
    const initialValues = useRef<BrowseTheatreParamFormValues | null>(null);

    const defaultValues: BrowseTheatreParamFormValues = {
        target: "",
        ...presetValues,
    };

    if (!isEqual(defaultValues, initialValues.current)) {
        initialValues.current = defaultValues;
    }

    return initialValues.current ?? defaultValues;
}
