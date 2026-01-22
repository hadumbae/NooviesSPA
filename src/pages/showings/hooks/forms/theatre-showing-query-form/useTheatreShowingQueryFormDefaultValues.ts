/**
 * @file useTheatreShowingQueryFormDefaultValues.ts
 *
 * Provides stable default values for Theatre Showing query forms.
 *
 * Prevents unnecessary React Hook Form resets by memoizing
 * default values using deep equality checks.
 */

import {
    TheatreShowingQueryFormValues,
    TheatreShowingQueryOptions
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.types.ts";
import {useRef} from "react";
import {isEqual} from "lodash";

/**
 * Parameters for {@link useTheatreShowingQueryFormDefaultValues}.
 */
type FormParams = {
    /**
     * Optional preset query values to override defaults.
     */
    presetValues?: Partial<TheatreShowingQueryOptions>;
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
): TheatreShowingQueryFormValues {
    const initialValues = useRef<TheatreShowingQueryFormValues | null>(null);

    const defaultValues: TheatreShowingQueryFormValues = {
        movieSlug: "",
        theatreSlug: "",
        screenSlug: "",
        theatreState: "",
        theatreCity: "",
        theatreCountry: "",
        ...presetValues,
    };

    if (!isEqual(initialValues.current, defaultValues)) {
        initialValues.current = defaultValues;
    }

    return initialValues.current ?? defaultValues;
}
