/**
 * @file useTheatreShowingQueryFormDefaultValues.ts
 *
 * Provides stable default values for Theatre Showing query forms.
 *
 * Prevents unnecessary React Hook Form resets by memoizing
 * default values using deep equality checks.
 */

import {
    ShowingsPageQueryFormValues,
    ShowingsPageQueryStrings
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.types.ts";
import {useRef} from "react";
import {isEqual} from "lodash";

/**
 * Parameters for {@link useTheatreShowingQueryFormDefaultValues}.
 */
type FormParams = {
    /**
     * Optional preset query values to override defaults.
     */
    presetValues?: Partial<ShowingsPageQueryStrings>;
};

/**
 * Returns stable default values for Theatre Showing query forms.
 *
 * - Initializes empty-string defaults for all supported fields
 * - Merges optional preset values
 * - Preserves object identity unless values actually change
 *
 * This is critical for preventing uncontrolled form resets
 * when default values are recomputed.
 *
 * @param params - Default value configuration
 * @returns Stable default form values
 */
export function useTheatreShowingQueryFormDefaultValues(
    {presetValues}: FormParams
): ShowingsPageQueryFormValues {
    const initialValues = useRef<ShowingsPageQueryFormValues | null>(null);

    const defaultValues: ShowingsPageQueryFormValues = {
        page: 1,
        perPage: 10,
        near: "",
        ...presetValues,
    };

    if (!isEqual(initialValues.current, defaultValues)) {
        initialValues.current = defaultValues;
    }

    return initialValues.current ?? defaultValues;
}
