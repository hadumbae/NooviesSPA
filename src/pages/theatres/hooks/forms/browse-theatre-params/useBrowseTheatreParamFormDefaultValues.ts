/**
 * @file useBrowseTheatreParamFormDefaultValues.ts
 *
 * React hook for producing stable default form values for theatre browse parameters.
 *
 * Ensures:
 * - Deterministic initial form state
 * - Referential stability across renders
 * - Safe merging of preset values with empty defaults
 */

import {
    BrowseTheatreParamFormValues,
    BrowseTheatreParams,
} from "@/pages/movies/schema/params/BrowseTheatreParams.ts";
import {useRef} from "react";
import {isEqual} from "lodash";

/**
 * Input parameters for initializing browse theatre form defaults.
 */
type ValueParams = {
    /** Optional preset query values to prefill the form */
    presetValues?: Partial<BrowseTheatreParams>;
};

/**
 * Returns stable default values for the browse theatre parameter form.
 *
 * Uses a ref to prevent unnecessary form resets when values are deeply equal,
 * even if object identity changes between renders.
 *
 * @param presetValues - Partial preset browse parameters
 * @returns Form-safe default values for browse theatre parameters
 */
export function useBrowseTheatreParamFormDefaultValues(
    {presetValues}: ValueParams = {},
): BrowseTheatreParamFormValues {
    const initialValues = useRef<BrowseTheatreParamFormValues | null>(null);

    const defaultValues = {
        city: "",
        state: "",
        country: "",
        postalCode: "",
        ...presetValues,
    };

    if (!isEqual(defaultValues, initialValues.current)) {
        initialValues.current = defaultValues;
    }

    return initialValues.current ?? defaultValues;
}
