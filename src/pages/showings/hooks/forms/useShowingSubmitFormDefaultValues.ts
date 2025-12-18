import {UseShowingFormParams} from "@/pages/showings/hooks/forms/useShowingSubmitForm.types.ts";
import {useMemo, useRef} from "react";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import getShowingDateAndTime from "@/common/utility/date-and-time/getShowingDateAndTime.ts";
import {isEqual} from "lodash";

/**
 * Computes and returns the default values for the showing submit form.
 *
 * The resulting values are derived from:
 * - An existing showing (edit mode)
 * - Timezone-aware date and time formatting
 * - Optional preset value overrides
 *
 * To avoid unnecessary form resets, the hook preserves referential
 * equality by caching the previously resolved values and only updating
 * them when a deep comparison detects a change.
 *
 * @param params - Parameters used to resolve the form's default values
 * @returns Default values for the showing submit form
 */
export default function useShowingSubmitFormDefaultValues(
    params: UseShowingFormParams
): ShowingFormValues {
    const {showing, theatreTimezone, presetValues} = params;
    const formValues = useRef<ShowingFormValues | null>(null);

    // --- Date And Time ---
    const formattedDateAndTime = useMemo(
        () =>
            showing
                ? getShowingDateAndTime({
                    startTime: showing.startTime,
                    endTime: showing.endTime,
                    theatreTimezone,
                })
                : null,
        [showing, theatreTimezone]
    );

    // --- Default Values ---
    const defaultValues: ShowingFormValues = useMemo(
        () => ({
            startAtTime: "",
            startAtDate: "",
            endAtTime: "",
            endAtDate: "",
            ticketPrice: "",
            language: "",
            subtitleLanguages: [],
            isSpecialEvent: "",
            isActive: "",
            movie: "",
            theatre: "",
            screen: "",
            status: "SCHEDULED",
            theatreCity: "",
            theatreState: "",
            theatreCountry: undefined,
            ...showing,
            ...formattedDateAndTime,
            ...presetValues,
        }),
        [showing, presetValues, formattedDateAndTime]
    );

    if (!isEqual(formValues.current, defaultValues)) {
        formValues.current = defaultValues;
    }

    return formValues.current ?? defaultValues;
}
